import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  Params,
  RouterStateSnapshot,
  NavigationEnd
} from "@angular/router";

import { ProfessorService } from "../../shared/services/professor.service";
import { Professor } from "../professor.model";
import { UrlChangeService } from "../../shared/services/url-change.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-professor-view-list",
  templateUrl: "./professor-view-list.component.html",
  styleUrls: ["./professor-view-list.component.css"],
  providers: [UrlChangeService]
})
export class ProfessorViewListComponent implements OnInit, OnDestroy {
  professors: Professor[];
  professorsSet: Set<Professor> = new Set<Professor>();
  selectedProfessor: Professor;
  professorParamId: number;

  urlParamsChangedSubscription: Subscription;

  constructor(
    private professorService: ProfessorService,
    private router: Router,
    private route: ActivatedRoute,
    private urlChangeService: UrlChangeService
  ) {}

  async ngOnInit() {
    console.log("ProfessorViewListComponent onInit");

    this.urlParamsChangedSubscription = this.urlChangeService.onParamsChangedEvent.subscribe(
      (params: Params) => {
        this.professorParamId = +params["id"];
      }
    );

    this.professors = (await this.professorService.get()) as Professor[];
    this.professors.forEach((professor: Professor) => {
      this.professorsSet.add(professor);
    });

    this.selectedProfessor = this.professors.find(professor =>
      professor.id === this.professorParamId ? professor : null
    );
  }

  ngOnDestroy() {
    this.urlParamsChangedSubscription.unsubscribe();
  }

  showProfessor(): boolean {
    return this.selectedProfessor ? true : false;
  }

  onProfessorClick(professor: Professor) {
    this.selectedProfessor = professor;
    this.router.navigate([professor.id], {
      // }, "students"], {
      relativeTo: this.route
    });
  }
}
