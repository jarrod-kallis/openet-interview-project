import { Entity } from "./entity.model";

export class Person extends Entity {
  private _firstName: string;
  private _lastName: string;

  constructor(id: number, firstName: string, lastName: string) {
    super(id);
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(lastName: string) {
    this._lastName = lastName;
  }
}
