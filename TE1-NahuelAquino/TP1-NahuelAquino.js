class ProductManager{
    products;
    constructor (){
        this.products = [];
    }
    getProduct(){
        return this.products
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
    }
    getProductById(id){
        return this.products.find(prod => prod.id === id ) ?? 'Not found'
    }
}

const prodManger = new ProductManager;

// empty array
console.log(prodManger.getProduct());

// first product
prodManger.addProduct('producto prueba', 'Este es un producto de prueba', 200, 'Sin imagen','abc123',25);

// show array
console.log(prodManger.getProduct());

// second product
prodManger.addProduct('hola', ' asd', 12, 'no imagen','abc123',9);

// show error
console.log(prodManger.getProduct());

// error find product by id
console.log(prodManger.getProductById(3));

// successful search
console.log(prodManger.getProductById(1));


