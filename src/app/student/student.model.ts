import { Person } from "../shared/models/person.model";

export class Student extends Person {
  // private _professors: number[];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    // professors: number[]
  ) {
    super(id, firstName, lastName);
    // this._professors = professors;
  }

  // get professors() {
  //   return this._professors;
  // }

  // set professors(professors: number[]) {
  //   this._professors = professors;
  // }

  clone(): Student {
    return new Student(this.id, this.firstName, this.lastName);
    //   [
    //   ...this.professors
    // ]);
  }
}
