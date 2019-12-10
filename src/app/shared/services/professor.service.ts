import * as professorData from "../../../professors.json";

import { PersonService } from './person.service.js';
import { Professor } from '../../professor/professor.model.js';
import { Person } from '../models/person.model.js';
import { StudentService } from './student.service.js';

export class ProfessorService extends PersonService {
  constructor() {
    super();
    console.log('Professor service constructor');
  }

  getJsonData = (): void => {
    this.jsonData = (professorData as any).default;
  }

  createPerson = (data: any): Person => {
    return new Professor(
      data.id,
      data.firstName,
      data.lastName
    )
  }

  transformJsonData = (jsonData: any[]): [{ id: number, peopleIds: number[] }] => {
    let transformedProfessors = jsonData.reduce((accArray: any, professor) => {
      accArray.push({ id: professor.id, peopleIds: professor.students });
      return accArray;
    }, []);

    return transformedProfessors;
  }
}
