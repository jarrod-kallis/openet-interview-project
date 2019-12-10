import { Component } from "@angular/core";

import { PersonDetailComponent } from '../../shared/components/person/person-detail/person-detail.component';
import { ProfessorService } from '../../shared/services/professor.service';
import { StudentService } from '../../shared/services/student.service';
import { ProfessorStudentLinkService } from '../../shared/services/professor-student-link.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-professor-detail",
  templateUrl: "../../shared/components/person/person-detail/person-detail.component.html",
  styleUrls: ["../../shared/components/person/person-detail/person-detail.component.css"]
})
export class ProfessorDetailComponent extends PersonDetailComponent {
  formHeading = "Professor";
  availableAssignedHeading = "Students";

  constructor(professorService: ProfessorService, studentService: StudentService, private professorStudentLinkService: ProfessorStudentLinkService, toastr: ToastrService) {
    super(professorService, studentService, toastr);
  }

  isPersonAssigned = (parentPersonId: number, personId: number): boolean => {
    return this.professorStudentLinkService.professorHasStudent(parentPersonId, personId);
  }
}
