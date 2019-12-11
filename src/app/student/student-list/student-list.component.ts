import { Component, OnInit } from "@angular/core";

import { PersonListComponent } from "../../shared/components/person/person-list/person-list.component";
import { StudentService } from "../../shared/services/student.service";
import { Student } from "../student.model";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html"
})
export class StudentListComponent extends PersonListComponent
  implements OnInit {
  mainTitle = "Students";
  deleteModalTitle = "Delete Student";
  btnAddNewCaption = "Add New Student";

  constructor(studentService: StudentService) {
    super(studentService);
    console.log("StudentListComponent constructor");
  }

  onAddNewClick() {
    this.selectedPerson = new Student(0, "", "", "");
    super.onAddNewClick();
  }
}
