export class Employee {
    constructor(public name: string, public id: number) {}
}

export class Manager extends Employee {
    assignTask(): void {
        console.log("Assigning tasks");
    }
}

export class Developer extends Employee {
    writeCode(): void {
        console.log("Writing code");
    }
}

const manager = new Manager("Trần B", 101);
console.log(manager.name, manager.id);
manager.assignTask();

const developer = new Developer("Lê C", 102);
console.log(developer.name, developer.id);
developer.writeCode();