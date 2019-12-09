import { EventEmitter } from "@angular/core";

import * as professorData from "../../../professors.json";

import { Professor } from "../../professor/professor.model";
import { Student } from '../../student/student.model.js';
// import { Student } from "../../student/student.model";

// @Injectable({
//   providedIn: "root"
// })
export class ProfessorService {
  private professors: Professor[] = [];
  //   new Professor(1, "Michael", "Kallis"),
  //   new Professor(2, "Lesley", "Kallis"),
  //   new Professor(3, "Wendy", "Wrench")
  // ];

  public onProfessorsLoadedEvent = new EventEmitter<Professor[]>();
  public onProfessorsChangedEvent = new EventEmitter<Professor[]>();
  public onProfessorSavedEvent = new EventEmitter<{ professor: Professor, availableStudents: Set<Student>, assignedStudents: Set<Student> }>();
  public onProfessorDeletedEvent = new EventEmitter<number>();

  constructor() {
    console.log('Professor service constructor');
    setTimeout(this.load, 1);
  }

  private load = () => {
    let professorsJson = (professorData as any).default;

    for (let professorJson of professorsJson) {
      this.professors.push(
        new Professor(
          professorJson.id,
          professorJson.firstName,
          professorJson.lastName
        )
      );
    }

    console.log('Emit onProfessorsLoadedEvent');
    this.onProfessorsLoadedEvent.emit([...professorsJson]);
  }

  getProfessors() {
    return this.professors.slice();
  }

  save(professorToSave: Professor, availableStudents: Set<Student>, assignedStudents: Set<Student>) {
    // Does the professor exist
    let professors: Professor[] = this.professors.filter(
      professor => professor.id === professorToSave.id
    );

    if (professors.length > 0) {
      // Update
      this.professors = this.professors.map(professor => {
        if (professor.id === professorToSave.id) {
          return professorToSave;
        } else {
          return professor;
        }
      });
    } else {
      // Insert
      // Generate id
      professorToSave.id = Math.trunc(Math.random() * 100000);

      this.professors = this.professors.concat(professorToSave)
    }

    this.onProfessorSavedEvent.emit({ professor: professorToSave, availableStudents, assignedStudents });
    this.onProfessorsChangedEvent.emit(this.getProfessors());
  }

  delete = (professorId: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.professors = this.professors.filter(
          professor => professor.id !== professorId
        );

        this.onProfessorDeletedEvent.emit(professorId);
        this.onProfessorsChangedEvent.emit(this.getProfessors());

        resolve();
      }, 250);
    });
  }
}
