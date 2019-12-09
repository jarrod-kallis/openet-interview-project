import { EventEmitter } from "@angular/core";

import * as studentData from "../../../students.json";

import { Student } from "../../student/student.model";
// import { ProfessorStudentLinkService } from './professor-student-link.service.js';

// @Injectable({
//   providedIn: "root"
// })
export class StudentService {
  private students: Student[] = [];
  //   new Student(1, "Jarrod", "Kallis", []),
  //   new Student(2, "Tessa", "Kallis", []),
  //   new Student(3, "Ben", "Kallis", [])
  // ];

  public onStudentsLoadedEvent = new EventEmitter<Student[]>();
  public onStudentsChangeEvent = new EventEmitter<Student[]>();
  public onStudentSavedEvent = new EventEmitter<Student>();

  constructor() {
    console.log('Student service constructor');
    // Allows the professor-student-service to get instantiated, before the students are loaded
    setTimeout(this.load, 1);
  }

  // Keep the 'this' context
  private load = () => {
    let studentsJson = (studentData as any).default;

    for (let studentJson of studentsJson) {
      this.students.push(
        new Student(
          studentJson.id,
          studentJson.firstName,
          studentJson.lastName, []
        )
      );
    }

    console.log('Emit onStudentsLoadedEvent');
    this.onStudentsLoadedEvent.emit([...studentsJson]);
  }

  getStudents() {
    return this.students.slice();
  }

  save(studentToSave: Student) {
    // Does the student exist
    let students: Student[] = this.students.filter(
      student => student.id === studentToSave.id
    );

    if (students.length > 0) {
      // Update
      this.students = this.students.map(student => {
        if (student.id === studentToSave.id) {
          return studentToSave;
        } else {
          return student;
        }
      });
    } else {
      // Insert
      this.students = this.students.concat(studentToSave);
    }

    this.onStudentsChangeEvent.emit(this.getStudents());
    this.onStudentSavedEvent.emit(studentToSave);
  }
}
