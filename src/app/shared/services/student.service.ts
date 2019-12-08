import { Injectable, EventEmitter } from "@angular/core";

import * as studentData from "../../../students.json";

import { Student } from "../../student/student.model";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  private students: Student[] = [];
  //   new Student(1, "Jarrod", "Kallis", []),
  //   new Student(2, "Tessa", "Kallis", []),
  //   new Student(3, "Ben", "Kallis", [])
  // ];

  constructor() {
    for (let studentJson of (studentData as any).default) {
      this.students.push(
        new Student(
          studentJson.id,
          studentJson.firstName,
          studentJson.lastName,
          studentJson.students
        )
      );
    }
  }

  public onStudentsChangeEvent = new EventEmitter<Student[]>();
  public onStudentsSavedEvent = new EventEmitter<null>();

  getStudents() {
    return this.students.slice();
  }

  save(studentToUpdate: Student) {
    // Does the student exist
    let students: Student[] = this.students.filter(
      student => student.id === studentToUpdate.id
    );

    if (students.length > 0) {
      // Update
      this.students = this.students.map(professor => {
        if (professor.id === studentToUpdate.id) {
          return studentToUpdate;
        } else {
          return professor;
        }
      });
    } else {
      // Insert
      this.students = this.students.concat(studentToUpdate);
    }

    this.onStudentsChangeEvent.emit(this.getStudents());
    this.onStudentsSavedEvent.emit();
  }
}
