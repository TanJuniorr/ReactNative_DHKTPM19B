export interface Product {
    name: string;
    price: number;
  }
  
  export class Order {
    private products: Product[] = [];
  
    addProduct(product: Product): void {
      this.products.push(product);
    }
  
    calculateTotal(): number {
      return this.products.reduce((total, currentProduct) => total + currentProduct.price, 0);
    }
  }

  const myOrder = new Order();
  myOrder.addProduct({ name: "Wireless Mouse", price: 25 });
  myOrder.addProduct({ name: "Mechanical Keyboard", price: 85 });
  
  console.log(`Total order price: $${myOrder.calculateTotal()}`);