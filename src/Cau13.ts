export abstract class Shape {
    abstract area(): number;
}

export class Square extends Shape {
    constructor(public side: number) {
        super();
    }

    area(): number {
        return this.side * this.side;
    }
}

export class Circle extends Shape {
    constructor(public radius: number) {
        super();
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

const square = new Square(5);
console.log(square.area());

const circle = new Circle(3);
console.log(circle.area());