import { Person } from "../shared/models/person.model";

export class Professor extends Person {
  //private _students: number[];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    //students: number[]
  ) {
    super(id, firstName, lastName);
    //this._students = students;
  }

  // get students() {
  //   return this._students;
  // }

  // set students(students: number[]) {
  //   this._students = students;
  // }

  clone(): Professor {
    return new Professor(this.id, this.firstName, this.lastName);
    // , [
    //   ...this.students
    // ]);
  }
}
