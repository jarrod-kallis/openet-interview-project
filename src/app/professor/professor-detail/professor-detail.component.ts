import {
  Component,
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
import { ProfessorStudentLinkService } from '../../shared/services/professor-student-link.service';

@Component({
  selector: "app-professor-detail",
  templateUrl: "./professor-detail.component.html",
  styleUrls: ["./professor-detail.component.css"]
})
export class ProfessorDetailComponent implements OnChanges {
  @Input() professor: Professor;
  allStudents: Student[] = [];
  assignedStudentsSet: Set<Student> = new Set<Student>();
  availableStudentsSet: Set<Student> = new Set<Student>();

  @Output() onCancelClicked: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private professorService: ProfessorService,
    private studentService: StudentService,
    private professorStudentLinkService: ProfessorStudentLinkService
  ) { }

  ngOnChanges() {
    this.allStudents = this.studentService.getStudents();

    this.setupInitialStudents();
  }

  onSaveClick = (person: Person) => {
    this.professorService.save(person as Professor, this.availableStudentsSet, this.assignedStudentsSet);
  }

  onCancelClick() {
    this.onCancelClicked.emit();
  }

  onAvailableStudentClick(student: Student) {
    this.assignedStudentsSet.add(student);
    this.availableStudentsSet.delete(student);
  }

  onAssignedStudentClick(student: Student) {
    this.assignedStudentsSet.delete(student);
    this.availableStudentsSet.add(student);
  }

  setupInitialStudents = () => {
    this.assignedStudentsSet = new Set<Student>();
    this.availableStudentsSet = new Set<Student>();

    this.allStudents.forEach(student => {
      this.professorStudentLinkService.professorHasStudent(this.professor.id, student.id)
        ? this.assignedStudentsSet.add(student)
        : this.availableStudentsSet.add(student);
    });
  }
}
