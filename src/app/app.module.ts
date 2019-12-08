import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

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
    HamburgerButtonComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [StudentService, ProfessorService],
  bootstrap: [AppComponent]
})
export class AppModule {}
