// cau3.ts
export class Car {
    brand: string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    showCarInfo(): void {
        console.log(`Car Info - Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`);
    }
}

// Chạy thử
const myCar = new Car("Toyota", "Camry", 2022);
myCar.showCarInfo();