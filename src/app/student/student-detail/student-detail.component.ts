import { Component, Input, OnChanges, Output, EventEmitter } from "@angular/core";

import { Student } from "../student.model";
import { StudentService } from "../../shared/services/student.service";
import { ProfessorService } from "../../shared/services/professor.service";
import { Professor } from "../../professor/professor.model";
import { Person } from "../../shared/models/person.model";
import { ProfessorStudentLinkService } from '../../shared/services/professor-student-link.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-student-detail",
  templateUrl: "./student-detail.component.html",
  styleUrls: ["./student-detail.component.css"]
})
export class StudentDetailComponent implements OnChanges {
  @Input() student: Student;
  allProfessors: Professor[] = [];
  assignedProfessorsSet: Set<Professor> = new Set<Professor>();
  availableProfessorsSet: Set<Professor> = new Set<Professor>();

  @Output() onCancelClicked: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private professorService: ProfessorService,
    private studentService: StudentService,
    private professorStudentLinkService: ProfessorStudentLinkService,
    private toastr: ToastrService
  ) { }

  ngOnChanges() {
    this.allProfessors = this.professorService.getProfessors();

    this.setupInitialProfessors();
  }

  isValid = (person: Person) => {
    let isValid: boolean = true;

    if (!person.firstName) {
      this.toastr.error("Please fill in a first name");
      isValid = false;
    }

    if (!person.lastName) {
      this.toastr.error("Please fill in a last name");
      isValid = false;
    }

    return isValid;
  }

  onSaveClick(person: Person) {
    if (this.isValid(person)) {
      this.studentService.save(person as Student, this.availableProfessorsSet, this.assignedProfessorsSet);
    }
  }

  onCancelClick() {
    this.onCancelClicked.emit();
  }

  onAvailableProfessorClick(professor: Professor) {
    this.assignedProfessorsSet.add(professor);
    this.availableProfessorsSet.delete(professor);
  }

  onAssignedProfessorClick(professor: Professor) {
    this.assignedProfessorsSet.delete(professor);
    this.availableProfessorsSet.add(professor);
  }

  setupInitialProfessors = () => {
    this.assignedProfessorsSet = new Set<Student>();
    this.availableProfessorsSet = new Set<Student>();

    this.allProfessors.forEach(professor => {
      this.professorStudentLinkService.studentHasProfessor(this.student.id, professor.id)
        ? this.assignedProfessorsSet.add(professor)
        : this.availableProfessorsSet.add(professor);
    });
  }
}
