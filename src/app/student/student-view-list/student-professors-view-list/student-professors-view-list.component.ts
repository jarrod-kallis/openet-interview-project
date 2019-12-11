import { Component, OnInit, OnDestroy } from "@angular/core";
import { Professor } from "../../../professor/professor.model";
import { Student } from "../../student.model";
import { Subscription } from "rxjs";
import { ProfessorService } from "../../../shared/services/professor.service";
import { StudentService } from "../../../shared/services/student.service";
import { ProfessorStudentLinkService } from "../../../shared/services/professor-student-link.service";
import { ActivatedRoute, Params } from "@angular/router";
import { UrlChangeService } from "../../../shared/services/url-change.service";

@Component({
  selector: "app-student-professors-view-list",
  templateUrl: "./student-professors-view-list.component.html",
  styleUrls: ["./student-professors-view-list.component.css"]
})
export class StudentProfessorsViewListComponent implements OnInit, OnDestroy {
  professorsSet: Set<Professor> = new Set<Professor>();
  selectedStudent: Student;
  urlParamChangeSubscription: Subscription;

  constructor(
    private professorService: ProfessorService,
    private studentService: StudentService,
    private professorStudentLinkService: ProfessorStudentLinkService,
    private route: ActivatedRoute,
    private urlChangeService: UrlChangeService
  ) {}

  ngOnInit() {
    console.log("StudentProfessorsViewListComponent onInit()");
    let studentId: number;

    // This 'url param change' subscription is necessary when the component is never recreated in order to display different data.
    this.urlParamChangeSubscription = this.route.params.subscribe(
      async (params: Params) => {
        this.urlChangeService.paramsChanged(params);

        studentId = +params["id"];
        this.professorsSet.clear();

        this.selectedStudent = ((await this.studentService.get()) as Student[]).find(
          student => (student.id === studentId ? student : null)
        );
        console.log("selectedStudent:", this.selectedStudent);

        (await this.professorService.get()).forEach((professor: Professor) => {
          if (
            this.professorStudentLinkService.studentHasProfessor(
              studentId,
              professor.id
            )
          ) {
            this.professorsSet.add(professor);
          }
        });
      }
    );
  }

  ngOnDestroy() {
    console.log("StudentProfessorsViewListComponent onDestroy()");
    this.urlParamChangeSubscription.unsubscribe();
  }
}
