import { Component, OnInit } from "@angular/core";

import { PersonListComponent } from "../../shared/components/person/person-list/person-list.component";
import { StudentService } from "../../shared/services/student.service";
import { Student } from "../student.model";
import { RandomNumberService } from "../../shared/services/random-number.service";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html"
  // providers: [RandomNumberService] // Child components get the same instance of the service, but this service instance is still destroyed when this component is destroyed
})
export class StudentListComponent extends PersonListComponent
  implements OnInit {
  mainTitle = "Students";
  deleteModalTitle = "Delete Student";
  btnAddNewCaption = "Add New Student";

  constructor(
    studentService: StudentService,
    private randomNumberService: RandomNumberService
  ) {
    super(studentService);
    console.log(
      "StudentListComponent constructor: ",
      this.randomNumberService.random
    );
  }

  onAddNewClick() {
    this.selectedPerson = new Student(0, "", "", "");
    super.onAddNewClick();
  }
}
