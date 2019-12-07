import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";

import { Professor } from "../professor.model";
import { ProfessorService } from "../../shared/services/professor.service";
import { StudentService } from "../../shared/services/student.service";
import { Student } from "../../student/student.model";

@Component({
  selector: "app-professor-detail",
  templateUrl: "./professor-detail.component.html",
  styleUrls: ["./professor-detail.component.css"]
})
export class ProfessorDetailComponent implements OnInit, OnChanges {
  @Input() professor: Professor;
  @Input() assignedStudents: Student[];
  @Input() allStudents: Student[];
  @Input() availableStudents: Student[];

  @ViewChild("firstNameInput", { static: false }) firstNameInputRef: ElementRef;
  @ViewChild("lastNameInput", { static: false }) lastNameInputRef: ElementRef;

  @Output() onCancelClicked: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private professorService: ProfessorService,
    private studentService: StudentService
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    // console.log("onChanges()");
    this.allStudents = this.studentService.getStudents();

    this.handleStudents();

    // console.log(this.assignedStudents);
    // console.log(this.availableStudents);
  }

  onSaveClick() {
    this.professorService.save(
      new Professor(
        this.professor.id,
        this.firstNameInputRef.nativeElement.value,
        this.lastNameInputRef.nativeElement.value,
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
    this.assignedStudents = this.allStudents.filter(
      student => this.professor.students.indexOf(student.id) > -1
    );

    this.availableStudents = this.allStudents.filter(
      student => this.professor.students.indexOf(student.id) < 0
    );
  }
}
