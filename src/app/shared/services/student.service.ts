import { Injectable } from "@angular/core";
import { Student } from "src/app/student/student.model";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  private students: Student[] = [
    new Student(1, "Jarrod", "Kallis", []),
    new Student(2, "Tessa", "Kallis", []),
    new Student(3, "Ben", "Kallis", [])
  ];

  constructor() {}

  getStudents() {
    return this.students.slice();
  }
}
