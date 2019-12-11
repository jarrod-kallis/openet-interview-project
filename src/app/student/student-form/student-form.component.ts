import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Person } from "../../shared/models/person.model";
import { Student } from "../student.model";

@Component({
  selector: "app-student-form",
  templateUrl: "./student-form.component.html",
  styleUrls: ["./student-form.component.css"]
})
export class StudentFormComponent implements OnInit {
  @Input() person: Person;
  @Output() onSaveClicked = new EventEmitter<Student>();
  @Output() onCancelClicked = new EventEmitter<null>();

  constructor() {}

  ngOnInit() {}

  onSaveClick(student: Student) {
    this.onSaveClicked.emit(student);
  }

  onCancelClick() {
    this.onCancelClicked.emit();
  }
}
