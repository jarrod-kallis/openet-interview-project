import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Params, ActivatedRoute } from "@angular/router";

import { Professor } from "../../professor.model";
import { ProfessorService } from "../../../shared/services/professor.service";
import { UrlChangeService } from "../../../shared/services/url-change.service";

@Component({
  selector: "app-professor-detail-view",
  templateUrl: "./professor-detail-view.component.html",
  styleUrls: ["./professor-detail-view.component.css"]
})
export class ProfessorDetailViewComponent {
  @Input() selectedProfessor: Professor;

  constructor(
    private route: ActivatedRoute,
    private urlChangeService: UrlChangeService
  ) {}
}
