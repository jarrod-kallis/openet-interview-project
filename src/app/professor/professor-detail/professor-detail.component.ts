import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";

import { Professor } from "../professor.model";
import { ProfessorService } from "../../shared/services/professor.service";
import { StudentService } from "../../shared/services/student.service";
import { Student } from "../../student/student.model";
import { Person } from "../../shared/models/person.model";

@Component({
  selector: "app-professor-detail",
  templateUrl: "./professor-detail.component.html",
  styleUrls: ["./professor-detail.component.css"]
})
export class ProfessorDetailComponent implements OnInit, OnChanges {
  @Input() professor: Professor;
  allStudents: Student[] = [];
  assignedStudents: Student[] = [];
  availableStudents: Student[] = [];

  @Output() onCancelClicked: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private professorService: ProfessorService,
    private studentService: StudentService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    this.allStudents = this.studentService.getStudents();

    this.handleStudents();
  }

  onSaveClick(person: Person) {
    this.professorService.save(
      new Professor(
        person.id,
        person.firstName,
        person.lastName,
        this.professor.students
      )
    );
  }

  onCancelClick() {
    this.onCancelClicked.emit();
  }

  onAvailableStudentClick(student: Student) {
    this.professor.students.push(student.id);
    this.handleStudents();
  }

  onAssignedStudentClick(student: Student) {
    this.professor.students = this.professor.students.filter(
      studentId => studentId !== student.id
    );
    this.handleStudents();
  }

  handleStudents() {
    this.assignedStudents = [];
    this.availableStudents = [];

    this.allStudents.filter(student => {
      if (this.professor.students.indexOf(student.id) > -1) {
        this.assignedStudents.push(student);
      } else {
        this.availableStudents.push(student);
      }
    });
  }
}
