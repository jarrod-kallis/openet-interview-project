import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Professor } from "../professor.model";
import { ProfessorService } from "src/app/shared/services/professor.service";

@Component({
  selector: "app-professor-list",
  templateUrl: "./professor-list.component.html",
  styleUrls: ["./professor-list.component.css"],
  providers: [ProfessorService]
})
export class ProfessorListComponent implements OnInit {
  @Input() professors: Professor[] = [];
  @Input() updating: boolean = false;
  @Input() selectedProfessor: Professor = null;

  constructor(private professorService: ProfessorService) {}

  ngOnInit() {
    this.professors = this.professorService.getProfessors();

    this.professorService.onProfessorsChangeEvent.subscribe(
      professors => (this.professors = professors)
    );

    this.professorService.onProfessorsSavedEvent.subscribe(() =>
      this.onResetSelectedProfessor()
    );
  }

  onUpdateClick(professor: Professor) {
    this.selectedProfessor = professor;
    this.updating = true;
  }

  onResetSelectedProfessor() {
    this.selectedProfessor = null;
    this.updating = false;
  }

  onCancelClick() {
    this.onResetSelectedProfessor();
  }
}
