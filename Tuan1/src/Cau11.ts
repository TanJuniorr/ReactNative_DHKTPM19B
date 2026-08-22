export class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class Dog extends Animal {
    bark(): void {
        console.log("Woof! Woof!");
    }
}

export class Cat extends Animal {
    meow(): void {
        console.log("Meow!");
    }
}

const dog = new Dog("Lu");
console.log(dog.name);
dog.bark();

const cat = new Cat("Mimi");
console.log(cat.name);
cat.meow();