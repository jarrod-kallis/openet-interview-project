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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfessorListComponent,
    StudentListComponent,
    ProfessorDetailComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule {}
