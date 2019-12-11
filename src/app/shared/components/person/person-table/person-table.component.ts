import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Person } from "../../../models/person.model";

@Component({
  selector: "app-person-table",
  templateUrl: "./person-table.component.html",
  styleUrls: ["./person-table.component.css"]
})
export class PersonTableComponent implements OnInit {
  @Input() people: Person[] = [];
  @Output() onUpdateClicked = new EventEmitter<Person>();
  @Output() onDeleteClicked = new EventEmitter<Person>();

  constructor() {}

  ngOnInit() {}

  onUpdateClick(person: Person) {
    this.onUpdateClicked.emit(person);
  }

  onDeleteClick(person: Person) {
    this.onDeleteClicked.emit(person);
  }
}
