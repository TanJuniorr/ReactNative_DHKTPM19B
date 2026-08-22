export interface Vehicle {
    drive(): void;
}

export class Car implements Vehicle {
    drive(): void {
        console.log("Driving a car");
    }
}

export class Bike implements Vehicle {
    drive(): void {
        console.log("Riding a bike");
    }
}

const myCar = new Car();
myCar.drive();

const myBike = new Bike();
myBike.drive();