import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Person } from "../../../models/person.model";

@Component({
  selector: "app-assign-list",
  templateUrl: "./assign-list.component.html",
  styleUrls: ["./assign-list.component.css"]
})
export class AssignListComponent {
  @Input() heading: string;
  @Input() people: Set<Person>;
  @Input() readonly: boolean = false;
  @Input() activePersonId: number;

  @Output() onClick = new EventEmitter<Person>();

  onPersonClick(person: Person) {
    this.onClick.emit(person);
  }

  getPersonName(person: Person) {
    return `${person.firstName} ${person.lastName}`;
  }

  getListClass(person: Person): string {
    let clazz: string = "list-group-item";

    clazz += this.readonly ? " no-click" : "";

    if (person.id === this.activePersonId) {
      clazz += " active-item";
    }

    return clazz;
  }
}
