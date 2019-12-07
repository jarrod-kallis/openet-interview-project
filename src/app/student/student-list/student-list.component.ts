import { Component, OnInit } from "@angular/core";
import { Student } from "../student.model";
import { StudentService } from "src/app/shared/services/student.service";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  private students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.students = this.studentService.getStudents();
  }
}
