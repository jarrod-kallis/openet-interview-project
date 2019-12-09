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
  deleting: boolean = false;
  selectedStudent: Student = null;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.students = this.studentService.getStudents();

    this.studentService.onStudentsChangedEvent.subscribe(
      students => (this.students = students)
    );

    this.studentService.onStudentSavedEvent.subscribe(() =>
      this.onResetSelectedStudent()
    );
  }

  onAddNewClick = () => {
    this.selectedStudent = new Student(0, "", "");
    this.updating = true;
  }

  onUpdateClick(student: Student) {
    this.selectedStudent = student.clone();
    this.updating = true;
  }

  onDeleteClick = (student: Student) => {
    this.selectedStudent = student;
    this.deleting = true;
  }

  onDeleteConfirmed = async () => {
    await this.studentService.delete(this.selectedStudent.id);
    this.deleting = false;
  }

  onDeleteCancelled = () => {
    this.deleting = false;
    this.onResetSelectedStudent();
  }

  onResetSelectedStudent() {
    this.selectedStudent = null;
    this.updating = false;
  }

  onCancelClick() {
    this.onResetSelectedStudent();
  }
}
