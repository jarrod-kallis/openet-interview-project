import { Component, Input } from "@angular/core";

import { Student } from "../../student.model";

@Component({
  selector: "app-student-detail-view",
  templateUrl: "./student-detail-view.component.html",
  styleUrls: ["./student-detail-view.component.css"]
})
export class StudentDetailViewComponent {
  @Input() selectedStudent: Student;

  constructor() {}
}
