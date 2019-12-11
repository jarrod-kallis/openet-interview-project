import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ProfessorService } from "../../shared/services/professor.service";
// import { Professor } from "../professor.model";
import { UrlChangeService } from "../../shared/services/url-change.service";
// import { Subscription } from "rxjs";
import { PersonViewListComponent } from "../../shared/components/person/person-view-list/person-view-list.component";

@Component({
  selector: "app-professor-view-list",
  templateUrl: "./professor-view-list.component.html",
  styleUrls: ["./professor-view-list.component.css"]
})
export class ProfessorViewListComponent extends PersonViewListComponent
  implements OnInit, OnDestroy {
  // professors: Professor[];
  // professorsSet: Set<Professor> = new Set<Professor>();
  // selectedProfessor: Professor;
  // professorParamId: number;

  // urlParamsChangedSubscription: Subscription;

  constructor(
    professorService: ProfessorService,
    router: Router,
    route: ActivatedRoute,
    urlChangeService: UrlChangeService
  ) {
    super(professorService, router, route, urlChangeService);
  }

  // async ngOnInit() {
  //   console.log("ProfessorViewListComponent onInit");

  //   this.urlParamsChangedSubscription = this.urlChangeService.onParamsChangedEvent.subscribe(
  //     (params: Params) => {
  //       this.professorParamId = +params["id"];
  //     }
  //   );

  //   this.professors = (await this.professorService.get()) as Professor[];
  //   this.professors.forEach((professor: Professor) => {
  //     this.professorsSet.add(professor);
  //   });

  //   this.selectedProfessor = this.professors.find(professor =>
  //     professor.id === this.professorParamId ? professor : null
  //   );
  // }

  // ngOnDestroy() {
  //   this.urlParamsChangedSubscription.unsubscribe();
  // }

  // showProfessor(): boolean {
  //   return this.selectedProfessor ? true : false;
  // }

  // onProfessorClick(professor: Professor) {
  //   this.selectedProfessor = professor;
  //   this.router.navigate([professor.id], {
  //     // }, "students"], {
  //     relativeTo: this.route
  //   });
  // }
}
