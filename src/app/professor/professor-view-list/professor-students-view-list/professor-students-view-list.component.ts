import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router, Data } from "@angular/router";
import { Subscription } from "rxjs";

import { Student } from "../../../student/student.model";
import { StudentService } from "../../../shared/services/student.service";
import { ProfessorStudentLinkService } from "../../../shared/services/professor-student-link.service";
import { ProfessorService } from "../../../shared/services/professor.service";
import { Professor } from "../../professor.model";
import { UrlChangeService } from "../../../shared/services/url-change.service";
import { Person } from "../../../shared/models/person.model";

@Component({
  selector: "app-professor-students-view-list",
  templateUrl: "./professor-students-view-list.component.html",
  styleUrls: ["./professor-students-view-list.component.css"]
})
export class ProfessorStudentsViewListComponent implements OnInit, OnDestroy {
  studentsSet: Set<Student> = new Set<Student>();
  // selectedProfessor: Professor;
  urlParamChangeSubscription: Subscription;
  routeDataChangeSubscription: Subscription;

  constructor(
    private professorService: ProfessorService,
    private studentService: StudentService,
    private professorStudentLinkService: ProfessorStudentLinkService,
    private route: ActivatedRoute,
    private urlChangeService: UrlChangeService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("ProfessorStudentsViewListComponent onInit()");
    let professorId: number; // = +this.route.snapshot.params["id"];

    // (await this.studentService.get()).forEach((student: Student) => {
    //   if (
    //     this.professorStudentLinkService.professorHasStudent(
    //       professorId,
    //       student.id
    //     )
    //   ) {
    //     this.studentsSet.add(student);
    //   }
    // });

    // This 'url param change' subscription is necessary when the component is never recreated in order to display different data.
    this.urlParamChangeSubscription = this.route.params.subscribe(
      async (params: Params) => {
        this.urlChangeService.paramsChanged(params);

        professorId = +params["id"];
        this.studentsSet.clear();

        // this.selectedProfessor = ((await this.professorService.get()) as Professor[]).find(
        //   professor => (professor.id === professorId ? professor : null)
        // );
        // console.log("selectedProfessor:", this.selectedProfessor);

        // (await this.studentService.get()).forEach((student: Student) => {
        //   if (
        //     this.professorStudentLinkService.professorHasStudent(
        //       professorId,
        //       student.id
        //     )
        //   ) {
        //     this.studentsSet.add(student);
        //   }
        // });
      }
    );

    // The students are now retrieve by the ProfessStudentsResolver, which basically makes sure the data is retrieved before the component is shown
    // No jerkiness like you see in the StudentProfessorsViewList component
    this.routeDataChangeSubscription = this.route.data.subscribe(
      (data: Data) => {
        this.studentsSet = data["students"];
      }
    );
  }

  ngOnDestroy() {
    console.log("ProfessorStudentsViewListComponent onDestroy()");
    this.urlParamChangeSubscription.unsubscribe();
    this.routeDataChangeSubscription.unsubscribe();
  }

  onPersonClick(person: Person) {
    this.router.navigate(["students/view", person.id]);
  }
}
