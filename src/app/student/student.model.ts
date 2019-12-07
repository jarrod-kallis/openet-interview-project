import { Professor } from "../professor/professor.model";
import { Person } from "../shared/models/person.model";

export class Student extends Person {
  public professors: Professor[];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    professors: Professor[]
  ) {
    super(id, firstName, lastName);
    this.professors = professors;
  }
}
