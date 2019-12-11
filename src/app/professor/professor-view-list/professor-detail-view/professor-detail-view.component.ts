import { Component, Input } from "@angular/core";

import { Professor } from "../../professor.model";

@Component({
  selector: "app-professor-detail-view",
  templateUrl: "./professor-detail-view.component.html",
  styleUrls: ["./professor-detail-view.component.css"]
})
export class ProfessorDetailViewComponent {
  @Input() selectedProfessor: Professor;

  constructor() {}
}
