import { Injectable } from "@angular/core";

import { StudentService } from './student.service';
import { ProfessorService } from './professor.service';
import { Student } from '../../student/student.model';
import { Professor } from '../../professor/professor.model';

@Injectable({
  providedIn: "root"
})
export class ProfessorStudentLinkService {
  private _professorStudentMap: Map<number, Set<number>> = new Map<number, Set<number>>();
  private _studentProfessorMap: Map<number, Set<number>> = new Map<number, Set<number>>();

  constructor(private studentService: StudentService, private professorService: ProfessorService) {
    console.log('Professor Student Link service constructor');
    this.studentService.onStudentsLoadedEvent.subscribe(this.mapStudentProfessors);
    this.studentService.onStudentSavedEvent.subscribe(this.studentSaved);

    this.professorService.onProfessorsLoadedEvent.subscribe(this.mapProfessorStudents);
    this.professorService.onProfessorSavedEvent.subscribe(this.professorSaved);
    this.professorService.onProfessorDeletedEvent.subscribe(this.professorDeleted);
  }

  // get professorStudentMap(): Map<number, Set<number>> {
  //   return this._professorStudentMap;
  // }

  // Map the professor ids linked to students
  mapStudentProfessors = (students: [{ id: number, professors: number[] }]) => {
    console.log('Professor Student Link service mapStudentProfessors');
    students.forEach(student => {
      if (!this._studentProfessorMap.get(student.id)) {
        this._studentProfessorMap.set(student.id, new Set<number>());
      }
      student.professors.forEach((professorId: number) => {
        this._studentProfessorMap.get(student.id).add(professorId);
      });
    });

    console.log('Student professors:', this._studentProfessorMap);
  }

  // Map the student ids linked to professors
  // This is needed incase a professor doesn't have any students
  mapProfessorStudents = (professors: [{ id: number, students: number[] }]) => {
    console.log('Professor Student Link service mapProfessorStudents');
    professors.forEach(professor => {
      if (!this._professorStudentMap.get(professor.id)) {
        this._professorStudentMap.set(professor.id, new Set<number>());
      }
      professor.students.forEach((studentId: number) => {
        this._professorStudentMap.get(professor.id).add(studentId);
      });
    });

    console.log('Professor students:', this._professorStudentMap);
  }

  // Helper method to determine if a student belongs to a professor
  professorHasStudent = (professorId: number, studentId: number): boolean => {
    let students: Set<number> = this._professorStudentMap.get(professorId);

    return students && students.has(studentId);
  }

  // Helper method to determine if a professor belongs to a student
  studentHasProfessor = (studentId: number, professorId: number): boolean => {
    let professors: Set<number> = this._studentProfessorMap.get(studentId);

    return professors && professors.has(professorId);
  }

  // Fired when a student is saved (updated or inserted)
  studentSaved = (data: { student: Student, professors: Set<Professor> }) => {
    console.log('This student was saved: ', data.student);
    if (this._studentProfessorMap.get(data.student.id)) {
      this._studentProfessorMap.get(data.student.id).clear();

      data.professors.forEach((professor: Professor) => {
        this._studentProfessorMap.get(data.student.id).add(professor.id);
      });
    } else {
      throw new Error(`Unable to find student in mapping: ${data.student.id}`);
    }
  }

  // Fired when a professor is saved (updated or inserted)
  professorSaved = (data: { professor: Professor, availableStudents: Set<Student>, assignedStudents: Set<Student> }) => {
    if (!this._professorStudentMap.get(data.professor.id)) {
      // Create a new mapping
      this._professorStudentMap.set(data.professor.id, new Set<number>());
    }

    // Build up mapping for assigned students
    data.assignedStudents.forEach((student: Student) => {
      // The student wasn't previous assigned to the professor?
      if (!this._professorStudentMap.get(data.professor.id).has(student.id)) {
        // New student to the professor
        this._professorStudentMap.get(data.professor.id).add(student.id);
        // Therefore also a new professor to the student
        this._studentProfessorMap.get(student.id).add(data.professor.id);
      }
    });

    // Build up mapping for available students
    data.availableStudents.forEach((student: Student) => {
      // Remove the student from the professor (there might not be an entry, but that's fine)
      this._professorStudentMap.get(data.professor.id).delete(student.id);

      // Remove the professor from the student (there might not be an entry, but that's fine)
      this._studentProfessorMap.get(student.id).delete(data.professor.id);
    });

    console.log('Professor Saved:', data.professor.id);
    console.log('Professor Students:', this._professorStudentMap.get(data.professor.id));
    console.log('Student Professors:', this._studentProfessorMap);
  }

  // Fired when a professor is deleted
  professorDeleted = (professorId: number) => {
    const assignedStudentSet: Set<number> = this._professorStudentMap.get(professorId);

    this._professorStudentMap.delete(professorId);

    assignedStudentSet.forEach(studentId => {
      this._studentProfessorMap.get(studentId).delete(professorId);
    });
  }
}
