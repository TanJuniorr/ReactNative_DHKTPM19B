export interface Flyable {
    fly(): void;
}

export interface Swimmable {
    swim(): void;
}

export class Bird implements Flyable {
    fly(): void {
        console.log("Flying");
    }
}

export class Fish implements Swimmable {
    swim(): void {
        console.log("Swimming");
    }
}

const bird = new Bird();
bird.fly();

const fish = new Fish();
fish.swim();