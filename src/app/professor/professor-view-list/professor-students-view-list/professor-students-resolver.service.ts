import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

import { StudentService } from "../../../shared/services/student.service";
import { ProfessorStudentLinkService } from "../../../shared/services/professor-student-link.service";
import { Student } from "../../../student/student.model";

@Injectable({
  providedIn: "root"
})
export class ProfessorStudentsResolverService implements Resolve<Set<Student>> {
  constructor(
    private studentService: StudentService,
    private professorStudentLinkService: ProfessorStudentLinkService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Set<Student> | Observable<Set<Student>> | Promise<Set<Student>> {
    let professorId = +route.params["id"];

    console.log("ProfessorStudentsResolverService resolve: ", professorId);

    let studentsSet: Set<Student> = new Set<Student>();

    return new Promise<Set<Student>>(resolve => {
      this.studentService.get().then((students: Student[]) => {
        students.forEach((student: Student) => {
          if (
            this.professorStudentLinkService.professorHasStudent(
              professorId,
              student.id
            )
          ) {
            studentsSet.add(student);
          }
        });

        resolve(studentsSet);
      });
    });
  }
}
