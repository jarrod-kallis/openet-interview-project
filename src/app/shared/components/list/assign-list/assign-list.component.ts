import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Person } from "../../../models/person.model";

@Component({
  selector: "app-assign-list",
  templateUrl: "./assign-list.component.html",
  styleUrls: ["./assign-list.component.css"]
})
export class AssignListComponent implements OnInit {
  @Input() heading: string;
  @Input() people: Set<Person>;
  @Input() readonly: boolean = false;

  @Output() onClick = new EventEmitter<Person>();

  constructor() {}

  ngOnInit() {}

  onPersonClick(person: Person) {
    this.onClick.emit(person);
  }

  getListClass(): string {
    let clazz: string = "list-group-item";

    clazz += this.readonly ? " no-click" : "";

    return clazz;
  }
}
