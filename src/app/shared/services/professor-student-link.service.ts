import { Injectable } from "@angular/core";

import { StudentService } from './student.service';
import { ProfessorService } from './professor.service';
import { Person } from '../models/person.model';

@Injectable()
export class ProfessorStudentLinkService {
  private _professorStudentMap: Map<number, Set<number>> = new Map<number, Set<number>>();
  private _studentProfessorMap: Map<number, Set<number>> = new Map<number, Set<number>>();

  constructor(private studentService: StudentService, private professorService: ProfessorService) {
    console.log('Professor Student Link service constructor');
    this.studentService.onPeopleLoadedEvent.subscribe(this.studentsLoaded);
    this.studentService.onPersonSavedEvent.subscribe(this.studentSaved);
    this.studentService.onPersonDeletedEvent.subscribe(this.studentDeleted);

    this.professorService.onPeopleLoadedEvent.subscribe(this.professorsLoaded);
    this.professorService.onPersonSavedEvent.subscribe(this.professorSaved);
    this.professorService.onPersonDeletedEvent.subscribe(this.professorDeleted);
  }

  // Map the professor ids linked to students
  studentsLoaded = (students: [{ id: number, peopleIds: number[] }]) => {
    console.log('Professor Student Link service mapStudentProfessors');
    this.mapPeople(students, this._studentProfessorMap);
    console.log('Student professors:', this._studentProfessorMap);
  }

  // Map the student ids linked to professors
  // This is needed in case a professor doesn't have any students
  professorsLoaded = (professors: [{ id: number, peopleIds: number[] }]) => {
    console.log('Professor Student Link service mapProfessorStudents');
    this.mapPeople(professors, this._professorStudentMap);
    console.log('Professor students:', this._professorStudentMap);
  }

  private mapPeople = (people: [{ id: number, peopleIds: number[] }], map: Map<number, Set<number>>) => {
    people.forEach(person => {
      if (!map.get(person.id)) {
        map.set(person.id, new Set<number>());
      }
      person.peopleIds.forEach((personId: number) => {
        map.get(person.id).add(personId);
      });
    });
  }

  // Fired when a student is saved (updated or inserted)
  studentSaved = (data: { person: Person, availablePeople: Set<Person>, assignedPeople: Set<Person> }) => {
    this.personSaved(data, this._studentProfessorMap, this._professorStudentMap);
  }

  // Fired when a professor is saved (updated or inserted)
  professorSaved = (data: { person: Person, availablePeople: Set<Person>, assignedPeople: Set<Person> }) => {
    this.personSaved(data, this._professorStudentMap, this._studentProfessorMap);
  }

  personSaved = (data: { person: Person, availablePeople: Set<Person>, assignedPeople: Set<Person> },
    map: Map<number, Set<number>>, inverseMap: Map<number, Set<number>>) => {
    if (!map.get(data.person.id)) {
      // Create a new mapping
      map.set(data.person.id, new Set<number>());
    }

    // Build up mapping for assigned people
    data.assignedPeople.forEach((person: Person) => {
      // This person wasn't previously assigned
      if (!map.get(data.person.id).has(person.id)) {
        // New person to assign
        map.get(data.person.id).add(person.id);
        inverseMap.get(person.id).add(data.person.id);
      }
    });

    // Build up mapping for available people
    data.availablePeople.forEach((person: Person) => {
      // Remove the person (there might not be an entry, but that's fine)
      map.get(data.person.id).delete(person.id);
      inverseMap.get(person.id).delete(data.person.id);
    });

    console.log('Person Saved:', data.person.id);
    console.log('Map:', map.get(data.person.id));
    console.log('Inverse Map:', inverseMap);
  }

  // Fired when a professor is deleted
  professorDeleted = (professorId: number) => {
    this.personDeleted(professorId, this._professorStudentMap, this._studentProfessorMap);
  }

  // Fired when a student is deleted
  studentDeleted = (studentId: number) => {
    this.personDeleted(studentId, this._studentProfessorMap, this._professorStudentMap);
  }

  personDeleted = (personId: number, map: Map<number, Set<number>>, inverseMap: Map<number, Set<number>>) => {
    const assignedPersonSet: Set<number> = map.get(personId);

    map.delete(personId);

    assignedPersonSet.forEach(linkedPersonId => {
      inverseMap.get(linkedPersonId).delete(personId);
    });
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
}
