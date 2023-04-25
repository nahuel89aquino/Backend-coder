const fs = require("fs");

class ProductManager{
    products;
    path;
    constructor (path){
        this.path = path;
        let productsJSon;
        let products;
        if (fs.existsSync(this.path)) {
            productsJSon = fs.readFileSync(this.path, "utf-8");
            products = JSON.parse(productsJSon);
            
        } else {
            fs.writeFileSync(this.path, "[]");
            products = [];
        }
        this.products = products;
    }
    getProduct(){
        const productsJson = fs.readFileSync(this.path, "utf-8");
        return JSON.parse(productsJson);
    }
    addProduct(title,description,price,thumbnail,code,stock){
        if (!title && !description && !price && !thumbnail && !code && !stock) {
            console.error('There are unfilled fields');
            return 1;
        }
        if (this.products.find(prod => prod.code === code )){
            console.error('This product already exists');
            return 1;
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
        fs.writeFileSync(this.path,productsJSon);
    }
    getProductById(id){
        const productsJson = fs.readFileSync(this.path, "utf-8");
        const products = JSON.parse(productsJson);
        return products.find(prod => prod.id === id ) ?? 'Not found'
    }
    updateProduct(id,prod){
        if (!prod || !id) {
            console.log('Falta parametros');
            return 1;
        }
        const {title,
        description,
        price,
        thumbnail,
        code,
        stock} = prod;
        const productsJson = fs.readFileSync(this.path, "utf-8");
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
        fs.writeFileSync(this.path,JSON.stringify(products));
        //console.log(nombre);
    }
    deleteProduct(id){
        const productsJson = fs.readFileSync(this.path, "utf-8");
        const products = JSON.parse(productsJson);
        const productsResult = products.filter(prod => prod.id != id);
        fs.writeFileSync(this.path, JSON.stringify(productsResult));
    }
}

const prodManger = new ProductManager("products.json");
prodManger.getProduct();
prodManger.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
prodManger.addProduct("producto prueba 2","Este es un producto prueba 2 ",300,"Sin imagen","bca132",10)
console.log(prodManger.getProduct());

console.log("===============");
console.log(prodManger.getProductById(1));
console.log(prodManger.getProductById(3));

console.log("===============");
prodManger.updateProduct(1,{title:"nuevo producto", thumbnail: "imagen.png"});
console.log(prodManger.getProduct());

console.log("===============");
prodManger.deleteProduct(1);
console.log(prodManger.getProduct());



