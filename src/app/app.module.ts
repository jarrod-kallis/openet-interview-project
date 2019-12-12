import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ProfessorListComponent } from "./professor/professor-list/professor-list.component";
import { StudentListComponent } from "./student/student-list/student-list.component";
import { ProfessorDetailComponent } from "./professor/professor-detail/professor-detail.component";
import { StudentService } from "./shared/services/student.service";
import { ProfessorService } from "./shared/services/professor.service";
import { AddButtonComponent } from "./shared/components/buttons/add-button/add-button.component";
import { MenuDropDownDirective } from "./shared/directives/menu-drop-down.directive";
import { MenuCollapseDirective } from "./shared/directives/menu-collapse.directive";
import { HamburgerButtonComponent } from "./header/hamburger-button/hamburger-button.component";
import { AssignListComponent } from "./shared/components/list/assign-list/assign-list.component";
import { StudentDetailComponent } from "./student/student-detail/student-detail.component";
import { ProfessorStudentLinkService } from "./shared/services/professor-student-link.service";
import { ModalComponent } from "./shared/components/modal/modal.component";
import { BackdropComponent } from "./shared/components/backdrop/backdrop.component";
import { PersonFormComponent } from "./shared/components/person/person-form/person-form.component";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import { AppRoutingModule } from "./app-routing.module";
import { ProfessorViewListComponent } from "./professor/professor-view-list/professor-view-list.component";
import { ProfessorStudentsViewListComponent } from "./professor/professor-view-list/professor-students-view-list/professor-students-view-list.component";
import { ProfessorDetailViewComponent } from "./professor/professor-view-list/professor-detail-view/professor-detail-view.component";
import { PersonTableComponent } from "./shared/components/person/person-table/person-table.component";
import { StudentFormComponent } from "./student/student-form/student-form.component";
import { StudentViewListComponent } from "./student/student-view-list/student-view-list.component";
import { UrlChangeService } from "./shared/services/url-change.service";
import { StudentDetailViewComponent } from "./student/student-view-list/student-detail-view/student-detail-view.component";
import { StudentProfessorsViewListComponent } from "./student/student-view-list/student-professors-view-list/student-professors-view-list.component";
import { CanLeaveRouteService } from "./shared/services/can-leave-route.service";
import { ErrorComponent } from "./shared/components/error/error.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfessorListComponent,
    StudentListComponent,
    ProfessorDetailComponent,
    AddButtonComponent,
    MenuDropDownDirective,
    MenuCollapseDirective,
    HamburgerButtonComponent,
    AssignListComponent,
    StudentDetailComponent,
    ModalComponent,
    BackdropComponent,
    PersonFormComponent,
    PageNotFoundComponent,
    ProfessorViewListComponent,
    ProfessorStudentsViewListComponent,
    ProfessorDetailViewComponent,
    PersonTableComponent,
    StudentFormComponent,
    StudentViewListComponent,
    StudentDetailViewComponent,
    StudentProfessorsViewListComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ProfessorStudentLinkService,
    StudentService,
    ProfessorService,
    UrlChangeService,
    CanLeaveRouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(professorStudentService: ProfessorStudentLinkService) {}
}
