export class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    calculatePerimeter(): number {
        return (this.width + this.height) * 2;
    }
}

const rect = new Rectangle(5, 10);
console.log(`Width: ${rect.width}, Height: ${rect.height}`);
console.log(`Area: ${rect.calculateArea()}`);
console.log(`Perimeter: ${rect.calculatePerimeter()}`);