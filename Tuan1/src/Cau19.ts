export class Animal {
    makeSound(): void {
        console.log("Generic animal sound");
    }
}

export class Dog extends Animal {
    makeSound(): void {
        console.log("Bark");
    }
}

export class Cat extends Animal {
    makeSound(): void {
        console.log("Meow");
    }
}

const genericAnimal = new Animal();
genericAnimal.makeSound();

const myDog = new Dog();
myDog.makeSound();

const myCat = new Cat();
myCat.makeSound();