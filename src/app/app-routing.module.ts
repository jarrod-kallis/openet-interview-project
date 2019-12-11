import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ProfessorListComponent } from "./professor/professor-list/professor-list.component";
import { StudentListComponent } from "./student/student-list/student-list.component";
import { ProfessorViewListComponent } from "./professor/professor-view-list/professor-view-list.component";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import { ProfessorStudentsViewListComponent } from "./professor/professor-view-list/professor-students-view-list/professor-students-view-list.component";
import { StudentViewListComponent } from "./student/student-view-list/student-view-list.component";
import { StudentProfessorsViewListComponent } from "./student/student-view-list/student-professors-view-list/student-professors-view-list.component";
import { CanLeaveRouteService } from "./shared/services/can-leave-route.service";
import { ErrorComponent } from "./shared/components/error/error.component";
import { ProfessorStudentsResolverService } from "./professor/professor-view-list/professor-students-view-list/professor-students-resolver.service";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "professors",
    component: ProfessorListComponent,
    canDeactivate: [CanLeaveRouteService]
  },
  {
    path: "students",
    component: StudentListComponent,
    canDeactivate: [CanLeaveRouteService]
  },
  {
    path: "professors/view",
    component: ProfessorViewListComponent,
    children: [
      {
        path: ":id",
        component: ProfessorStudentsViewListComponent,
        resolve: { students: ProfessorStudentsResolverService }
      }
    ]
  },
  {
    path: "students/view",
    component: StudentViewListComponent,
    children: [{ path: ":id", component: StudentProfessorsViewListComponent }]
  },
  // { path: "page-not-found", component: PageNotFoundComponent },
  {
    path: "page-not-found",
    component: ErrorComponent,
    data: { "error-message": "Page not found" }
  },
  { path: "**", redirectTo: "page-not-found", pathMatch: "full" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    // RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
