
export class Product {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

const products: Product[] = [
    new Product("Keyboard", 50),
    new Product("Monitor", 250),
    new Product("Mouse", 25),
    new Product("Mechanical Keyboard", 150),
    new Product("Desk", 300)
];

const expensiveProducts = products.filter(product => product.price > 100);

console.log("Products with price > 100:");
expensiveProducts.forEach(p => console.log(`${p.name}: $${p.price}`));