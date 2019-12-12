import { Component, OnInit } from "@angular/core";

import { PersonListComponent } from "../../shared/components/person/person-list/person-list.component";
import { ProfessorService } from "../../shared/services/professor.service";
import { Professor } from "../professor.model";
import { RandomNumberService } from "../../shared/services/random-number.service";

@Component({
  selector: "app-professor-list",
  templateUrl: "./professor-list.component.html"
  // providers: [RandomNumberService] // Child components get the same instance of the service, but this service instance is still destroyed when this component is destroyed
})
export class ProfessorListComponent extends PersonListComponent
  implements OnInit {
  mainTitle = "Professors";
  deleteModalTitle = "Delete Professor";
  btnAddNewCaption = "Add New Professor";

  constructor(
    professorService: ProfessorService,
    private randomNumberService: RandomNumberService
  ) {
    super(professorService);
    console.log(
      "ProfessorListComponent constructor:",
      this.randomNumberService.random
    );
  }

  // Lambda expression doesn't work here.
  // Unable to call super() ???
  onAddNewClick() {
    this.selectedPerson = new Professor(0, "", "");
    super.onAddNewClick();
  }
}
