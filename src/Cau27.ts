export class Person {
    constructor(public name: string, public age: number) {}
  }
  
  export class Teacher extends Person {
    subject: string;
  
    constructor(name: string, age: number, subject: string) {
      super(name, age); 
      this.subject = subject;
    }
  
    introduce(): void {
      console.log(`Hello, my name is ${this.name}, I am ${this.age} years old. I teach ${this.subject}.`);
    }
  }

  const teacher1 = new Teacher("Mr. John", 45, "Object-Oriented Programming");
  teacher1.introduce();