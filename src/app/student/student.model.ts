import { Person } from "../shared/models/person.model";

export class Student extends Person {
  // private _professors: number[];
  private _studentCardNumber: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    studentCardNumber: string
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

  get studentCardNumber(): string {
    return this._studentCardNumber;
  }

  set studentCardNumber(studentCardNumber: string) {
    this._studentCardNumber = studentCardNumber;
  }

  clone(): Student {
    return new Student(
      this.id,
      this.firstName,
      this.lastName,
      this.studentCardNumber
    );
    //   [
    //   ...this.professors
    // ]);
  }
}
