import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Professor } from "../professor.model";
import { ProfessorService } from "src/app/shared/services/professor.service";

@Component({
  selector: "app-professor-list",
  templateUrl: "./professor-list.component.html",
  styleUrls: ["./professor-list.component.css"]
})
export class ProfessorListComponent implements OnInit {
  professors: Professor[] = [];
  updating: boolean = false;
  deleting: boolean = false;
  selectedProfessor: Professor = null;

  constructor(private professorService: ProfessorService) { }

  ngOnInit() {
    this.professors = this.professorService.getProfessors();

    this.professorService.onProfessorsChangedEvent.subscribe(
      professors => (this.professors = professors)
    );

    this.professorService.onProfessorSavedEvent.subscribe(() =>
      this.onResetSelectedProfessor()
    );
  }

  onAddNewClick = () => {
    this.selectedProfessor = new Professor(0, "", "");
    this.updating = true;
  }

  onUpdateClick = (professor: Professor) => {
    this.selectedProfessor = professor.clone();
    this.updating = true;
  }

  onDeleteClick = (professor: Professor) => {
    this.selectedProfessor = professor;
    this.deleting = true;
  }

  onDeleteConfirmed = async () => {
    await this.professorService.delete(this.selectedProfessor.id);
    this.deleting = false;
  }

  onDeleteCancelled = () => {
    this.deleting = false;
    this.onResetSelectedProfessor();
  }

  onResetSelectedProfessor = () => {
    this.selectedProfessor = null;
    this.updating = false;
  }

  onCancelClick = () => {
    this.onResetSelectedProfessor();
  }
}
