import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { UrlChangeService } from "../../shared/services/url-change.service";
import { StudentService } from "../../shared/services/student.service";
import { PersonViewListComponent } from "../../shared/components/person/person-view-list/person-view-list.component";

@Component({
  selector: "app-student-view-list",
  templateUrl: "./student-view-list.component.html",
  styleUrls: ["./student-view-list.component.css"]
})
export class StudentViewListComponent extends PersonViewListComponent {
  constructor(
    studentService: StudentService,
    router: Router,
    route: ActivatedRoute,
    urlChangeService: UrlChangeService
  ) {
    super(studentService, router, route, urlChangeService);
  }
}
