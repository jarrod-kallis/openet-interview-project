import * as studentData from "../../../students.json";

import { PersonService } from "./person.service.js";
import { Student } from "../../student/student.model.js";
import { Person } from "../models/person.model.js";

export class StudentService extends PersonService {
  constructor() {
    super();
    console.log("Student service constructor");
  }

  getJsonData = (): void => {
    this.jsonData = (studentData as any).default;
  };

  createPerson = (data: any): Person => {
    return new Student(data.id, data.firstName, data.lastName, data.cardNumber);
  };

  transformJsonData = (
    jsonData: any[]
  ): [{ id: number; peopleIds: number[] }] => {
    let transformedJsonData = jsonData.reduce((accArray: any, student) => {
      accArray.push({ id: student.id, peopleIds: student.professors });
      return accArray;
    }, []);

    return transformedJsonData;
  };

  studentCardAlreadyInUse(
    studentId: number,
    studentCardNumber: string
  ): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const studentsFound: Person[] = this.people.filter(
          (person: Student) => {
            return person.studentCardNumber === studentCardNumber &&
              studentId !== person.id &&
              studentCardNumber !== ""
              ? person
              : null;
          }
        );
        resolve(studentsFound.length > 0 ? true : false);
      }, 1500);
    });
  }
}
