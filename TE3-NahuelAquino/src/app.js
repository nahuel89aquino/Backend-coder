import express from "express";
import ProductManager from "./asset/js/productManger.js";

//const prodMang = new ProductManager();
const app = express();
const PORT = 3000;
const prodManger = new ProductManager("./src/products.json");
app.use(express.urlencoded({extended: true}));

app.get("/products", async (req,res) =>{
    try {
        const limit = req.query.limit;
        const products = await prodManger.getProduct();
        if (!limit){
            return res.status(300).json(products);
        }
        if (limit <= products.length || limit === 0){
            return res.status(200).json( products.slice(null,limit));
            
        }else{
            return res.status(400).json({error: "Limit not found!"})
        }
        
    } catch (error) {
        return res.status(500).json({error: "Product not found!"})
    }
});

app.get("/products/:pid", async (req,res) =>{
    const pid = req.params.pid;
    try {
        const product = await prodManger.getProductById(pid);
        if (product){
            return res.status(200).json(product)
        }else{
            return res.status(400).json({error:"Product not found!"});
        } 
    } catch (error) {
        return res.status(500).json({error: "Product not found!"})
    }
});

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}/products`);
});

