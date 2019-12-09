import { Component, OnInit } from "@angular/core";
import { Student } from "../student.model";
import { StudentService } from "../../shared/services/student.service";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  updating: boolean = false;
  selectedStudent: Student = null;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.students = this.studentService.getStudents();

    this.studentService.onStudentsChangeEvent.subscribe(
      students => (this.students = students)
    );

    this.studentService.onStudentSavedEvent.subscribe(() =>
      this.onResetSelectedStudent()
    );
  }

  onUpdateClick(student: Student) {
    this.selectedStudent = student.clone();

    this.updating = true;
  }

  onResetSelectedStudent() {
    this.selectedStudent = null;
    this.updating = false;
  }

  onCancelClick() {
    this.onResetSelectedStudent();
  }
}
