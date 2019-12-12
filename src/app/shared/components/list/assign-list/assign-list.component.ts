import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Person } from "../../../models/person.model";
import { RandomNumberService } from "../../../services/random-number.service";

@Component({
  selector: "app-assign-list",
  templateUrl: "./assign-list.component.html",
  styleUrls: ["./assign-list.component.css"]
  // providers: [RandomNumberService] // Provides a new instance of the service for every instance of this component, overrides any instance given to it by its parent
})
export class AssignListComponent {
  @Input() heading: string;
  @Input() people: Set<Person>;
  @Input() readonly: boolean = false;
  @Input() activePersonId: number;

  @Output() onClick = new EventEmitter<Person>();

  constructor(private randomNumberService: RandomNumberService) {
    console.log(
      "AssignListComponent constructor:",
      this.randomNumberService.random
    );
  }

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
