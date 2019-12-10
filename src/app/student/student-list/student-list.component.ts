import { Component, OnInit } from "@angular/core";

import { PersonListComponent } from '../../shared/components/person/person-list/person-list.component';
import { StudentService } from "../../shared/services/student.service";
import { Student } from "../student.model";

@Component({
  selector: "app-student-list",
  templateUrl: "../../shared/components/person/person-list/person-list.component.html",
  styleUrls: ["../../shared/components/person/person-list/person-list.component.css"]
})
export class StudentListComponent extends PersonListComponent implements OnInit {
  mainTitle = "Students";
  deleteModalTitle = 'Delete Student';
  btnAddNewCaption = "Add New Student";

  constructor(studentService: StudentService) {
    super(studentService);
    console.log('StudentListComponent constructor');
  }

  onAddNewClick() {
    this.selectedPerson = new Student(0, "", "");
    super.onAddNewClick();
  }

  onUpdateClick(person: Student) {
    this.selectedPerson = new Student(person.id, person.firstName, person.lastName);// person.clone();
    this.updating = true;
  }
}
