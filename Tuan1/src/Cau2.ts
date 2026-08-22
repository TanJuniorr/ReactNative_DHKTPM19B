// cau2.ts
import { Person } from "./Cau1";

class Student extends Person {
    grade: string;

    constructor(name: string, age: number, grade: string) {
        super(name, age); // Gọi constructor của lớp cha (Person)
        this.grade = grade;
    }

    displayAllInfo(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
    }
}

// Chạy thử (test)
const student1 = new Student("Tran Thi B", 20, "A");
student1.displayAllInfo();