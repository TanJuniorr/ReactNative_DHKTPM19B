export class Student {
    constructor(public name: string, public grade: string) {}
  }
  
  export class Teacher {
    constructor(public name: string, public subject: string) {}
  }
  
  export class School {
    private students: Student[] = [];
    private teachers: Teacher[] = [];
  
    addStudent(student: Student): void {
      this.students.push(student);
    }
  
    addTeacher(teacher: Teacher): void {
      this.teachers.push(teacher);
    }
  
    displayInfo(): void {
      console.log("=== TEACHERS LIST ===");
      this.teachers.forEach((t, index) => {
        console.log(`${index + 1}. ${t.name} (Teaches: ${t.subject})`);
      });
  
      console.log("\n=== STUDENTS LIST ===");
      this.students.forEach((s, index) => {
        console.log(`${index + 1}. ${s.name} (Grade: ${s.grade})`);
      });
    }
  }
  
  // --- Test ---
  const mySchool = new School();
  
  mySchool.addTeacher(new Teacher("Ms. Sarah", "Math"));
  mySchool.addTeacher(new Teacher("Mr. Mike", "Physics"));
  
  mySchool.addStudent(new Student("John Doe", "10A1"));
  mySchool.addStudent(new Student("Jane Smith", "12A3"));
  
  mySchool.displayInfo();