import { Component, OnInit } from "@angular/core";

import { PersonListComponent } from "../../shared/components/person/person-list/person-list.component";
import { ProfessorService } from "../../shared/services/professor.service";
import { Professor } from "../professor.model";

@Component({
  selector: "app-professor-list",
  templateUrl: "./professor-list.component.html"
  // templateUrl: "../../shared/components/person/person-list/person-list.component.html",
  // styleUrls: ["../../shared/components/person/person-list/person-list.component.css"]
})
export class ProfessorListComponent extends PersonListComponent
  implements OnInit {
  mainTitle = "Professors";
  deleteModalTitle = "Delete Professor";
  btnAddNewCaption = "Add New Professor";

  constructor(professorService: ProfessorService) {
    super(professorService);
    console.log("ProfessorListComponent constructor");
  }

  // Lambda expression doesn't work here.
  // Unable to call super() ???
  onAddNewClick() {
    this.selectedPerson = new Professor(0, "", "");
    super.onAddNewClick();
  }

  // Lambda expression doesn't work here.
  // Unable to call super() ???
  // onUpdateClick(person: Professor) {
  //   // person.clone() instanceof Professor === false ???
  //   this.selectedPerson = person.clone();
  //   // new Professor(
  //   //   person.id,
  //   //   person.firstName,
  //   //   person.lastName
  //   // ); // person.clone();
  //   super.onUpdateClick(person);
  // }
}
