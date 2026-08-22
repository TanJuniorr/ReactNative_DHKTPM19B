export class Animal {
    protected makeSound(): void {
      console.log("The animal is making a sound...");
    }
  }
  
  export class Dog extends Animal {
    public makeSound(): void {
      console.log("Dog barks: Woof woof!");
    }
  }
  
  export class Cat extends Animal {
    public makeSound(): void {
      console.log("Cat meows: Meow meow!");
    }
  }
  
  // --- Test ---
  const myDog = new Dog();
  myDog.makeSound();
  
  const myCat = new Cat();
  myCat.makeSound();