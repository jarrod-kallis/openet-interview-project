import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { ProfessorListComponent } from "./professor/professor-list/professor-list.component";
import { StudentListComponent } from "./student/student-list/student-list.component";
import { ProfessorDetailComponent } from "./professor/professor-detail/professor-detail.component";
import { StudentService } from "./shared/services/student.service";
import { ProfessorService } from "./shared/services/professor.service";
import { AddButtonComponent } from './shared/components/buttons/add-button/add-button.component';
import { MenuDropDownDirective } from './shared/directives/menu-drop-down.directive';
import { MenuCollapseDirective } from './shared/directives/menu-collapse.directive';
import { HamburgerButtonComponent } from './header/hamburger-button/hamburger-button.component';
import { AssignListComponent } from './shared/components/list/assign-list/assign-list.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { ProfessorStudentLinkService } from './shared/services/professor-student-link.service';
import { ModalComponent } from './shared/components/modal/modal.component';
import { BackdropComponent } from './shared/components/backdrop/backdrop.component';
import { PersonFormComponent } from './shared/components/person/person-form/person-form.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'professors', component: ProfessorListComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' }
]

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
    PageNotFoundComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule,
    ToastrModule.forRoot(), RouterModule.forRoot(appRoutes)],
  providers: [ProfessorStudentLinkService, StudentService, ProfessorService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(professorStudentService: ProfessorStudentLinkService) { }
}
