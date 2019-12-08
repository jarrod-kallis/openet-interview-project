import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Student } from "../student.model";
import { Professor } from "../../professor/professor.model";
import { ProfessorService } from "../../shared/services/professor.service";
import { StudentService } from "../../shared/services/student.service";
import { Person } from "../../shared/models/person.model";

@Component({
  selector: "app-student-detail",
  templateUrl: "./student-detail.component.html",
  styleUrls: ["./student-detail.component.css"]
})
export class StudentDetailComponent implements OnInit {
  @Input() student: Student;
  allProfessors: Professor[] = [];
  assignedProfessors: Professor[] = [];
  availableProfessors: Professor[] = [];

  @Output() onCancelClicked: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private professorService: ProfessorService,
    private studentService: StudentService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    this.allProfessors = this.professorService.getProfessors();

    this.handleProfessors();
  }

  onSaveClick(person: Person) {
    this.studentService.save(
      new Student(
        person.id,
        person.firstName,
        person.lastName,
        this.student.professors
      )
    );
  }

  onCancelClick() {
    this.onCancelClicked.emit();
  }

  onAvailableProfessorClick(professor: Professor) {
    this.student.professors.push(professor.id);
    this.handleProfessors();
  }

  onAssignedProfessorClick(professor: Professor) {
    this.student.professors = this.student.professors.filter(
      professorId => professorId !== professor.id
    );
    this.handleProfessors();
  }

  handleProfessors() {
    this.assignedProfessors = [];
    this.availableProfessors = [];

    this.allProfessors.filter(professor => {
      if (this.student.professors.indexOf(professor.id) > -1) {
        this.assignedProfessors.push(professor);
      } else {
        this.availableProfessors.push(professor);
      }
    });
  }
}
