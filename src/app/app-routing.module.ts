import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ProfessorListComponent } from "./professor/professor-list/professor-list.component";
import { StudentListComponent } from "./student/student-list/student-list.component";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "professors", component: ProfessorListComponent },
  { path: "students", component: StudentListComponent },
  { path: "page-not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "page-not-found", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
