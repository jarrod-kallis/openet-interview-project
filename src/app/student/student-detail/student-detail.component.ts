import { Component } from "@angular/core";

import { PersonDetailComponent } from "../../shared/components/person/person-detail/person-detail.component";
import { StudentService } from "../../shared/services/student.service";
import { ProfessorService } from "../../shared/services/professor.service";
import { ProfessorStudentLinkService } from "../../shared/services/professor-student-link.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-student-detail",
  templateUrl: "./student-detail.component.html"
  // templateUrl: "../../shared/components/person/person-detail/person-detail.component.html",
  // styleUrls: ["../../shared/components/person/person-detail/person-detail.component.css"]
})
export class StudentDetailComponent extends PersonDetailComponent {
  formHeading = "Student";
  availableAssignedHeading = "Professors";

  constructor(
    studentService: StudentService,
    professorService: ProfessorService,
    private professorStudentLinkService: ProfessorStudentLinkService,
    toastr: ToastrService
  ) {
    super(studentService, professorService, toastr);
  }

  isPersonAssigned = (parentPersonId: number, personId: number): boolean => {
    return this.professorStudentLinkService.studentHasProfessor(
      parentPersonId,
      personId
    );
  };
}
