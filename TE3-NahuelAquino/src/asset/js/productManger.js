import fs from "fs";

class ProductManager{
    path;
    constructor (path){
        this.path = path;
        if (!fs.existsSync(this.path)) {
            (async () => {
                try {
                    await fs.promises.writeFile(this.path, "[]");
                } catch (error) {
                    throw new Error(error.message);
                }

            })();
        }
    }
    async getProduct(){
        try {
            const productsJson = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(productsJson);
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async addProduct(title,description,price,thumbnail,code,stock){
        if (!title && !description && !price && !thumbnail && !code && !stock) {
            throw new Error('There are unfilled fields');
        }
        if (this.products.find(prod => prod.code === code )){
            throw new Error('This product already exists');
        }
        let id = this.products.length + 1;
        this.products.push({
            id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            });
        const productsJSon = JSON.stringify(this.products);
        try {
            await fs.promises.writeFile(this.path,productsJSon);
            
        } catch (error) {
            throw new Error(error.message); 
        }
    }
    async getProductById(id){
        try {
            const productsJson = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(productsJson);   
            return products.find(prod => prod.id === id ) ?? undefined
        } catch (error) {
            throw new Error(error.message); 
        }
    }
    async updateProduct(id,prod){
        if (!prod || !id) {
            throw new Error('missing parameters'); 
        }
        const {title,
        description,
        price,
        thumbnail,
        code,
        stock} = prod;
        try {
            const productsJson = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(productsJson);
            products.forEach(product => {
                if (id === product.id){
                    product.title = title ?? product.title;
                    product.description = description ?? product.description;
                    product.price = price ?? product.price;
                    product.thumbnail = thumbnail ?? product.thumbnail;
                    product.code = code ?? product.code;
                    product.stock = stock ?? product.stock;
                }
            });
            try {
                await fs.promises.writeFile(this.path,JSON.stringify(products));
            } catch (error) {
                throw new Error(error.message); 
            }
        } catch (error) {
            throw new Error(error.message); 
            
        }
        //console.log(nombre);
    }
    async deleteProduct(id){
        try {
            const productsJson = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(productsJson);
            const productsResult = products.filter(prod => prod.id != id);
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(productsResult));
            } catch (error) {
                throw new Error(error.message); 
            }
        } catch (error) {
            throw new Error(error.message); 
        }
    }
}

export default ProductManager;



