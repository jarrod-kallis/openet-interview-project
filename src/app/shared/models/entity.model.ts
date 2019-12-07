export class Entity {
  private _id: number;

  constructor(id: number) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }
}
