import { Injectable, EventEmitter } from "@angular/core";

import * as professorData from "../../../professors.json";

import { Professor } from "../../professor/professor.model";
// import { Student } from "src/app/student/student.model";

@Injectable({
  providedIn: "root"
})
export class ProfessorService {
  private professors: Professor[] = [];
  //   new Professor(1, "Michael", "Kallis", []),
  //   new Professor(2, "Lesley", "Kallis", []),
  //   new Professor(3, "Wendy", "Wrench", [3])
  // ];

  constructor() {
    for (let professorJson of (professorData as any).default) {
      this.professors.push(
        new Professor(
          professorJson.id,
          professorJson.firstName,
          professorJson.lastName,
          professorJson.students
        )
      );
    }
  }

  public onProfessorsChangeEvent = new EventEmitter<Professor[]>();
  public onProfessorsSavedEvent = new EventEmitter<null>();

  getProfessors() {
    return this.professors.slice();
  }

  save(professorToUpdate: Professor) {
    // Does the professor exist
    let professors: Professor[] = this.professors.filter(
      professor => professor.id === professorToUpdate.id
    );

    if (professors.length > 0) {
      // Update
      this.professors = this.professors.map(professor => {
        if (professor.id === professorToUpdate.id) {
          return professorToUpdate;
        } else {
          return professor;
        }
      });
    } else {
      // Insert
      this.professors = this.professors.concat(professorToUpdate);
    }

    this.onProfessorsChangeEvent.emit(this.getProfessors());
    this.onProfessorsSavedEvent.emit();
  }
}
