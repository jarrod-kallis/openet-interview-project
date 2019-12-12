import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

import { Person } from "../models/person.model";
// import { PersonService as PersonServiceInterface } from './interfaces/person.service.js';

export class PersonService {
  onPeopleLoadedEvent = new EventEmitter<
    [{ id: number; peopleIds: number[] }]
  >();
  // onPeopleChangedEvent: EventEmitter<Person[]> = new EventEmitter<Person[]>();
  onPeopleChangedEvent = new Subject<Person[]>();
  onPersonSavedEvent = new EventEmitter<{
    person: Person;
    availablePeople: Set<Person>;
    assignedPeople: Set<Person>;
  }>();
  onPersonDeletedEvent: EventEmitter<number> = new EventEmitter<number>();

  protected jsonData: any;
  protected people: Person[] = [];

  constructor() {
    console.log("Person service constructor");
    setTimeout(this.load, 1);
  }

  getJsonData = (): void => {
    throw new Error("Please override PersonService.getJsonData()");
  };

  transformJsonData = (
    jsonData: any[]
  ): [{ id: number; peopleIds: number[] }] => {
    throw new Error("Please override PersonService.transformJsonData()");
  };

  createPerson = (data: any): Person => {
    throw new Error("Please override PersonService.createPerson()");
  };

  load = (): void => {
    this.getJsonData();

    for (let data of this.jsonData) {
      this.people.push(this.createPerson(data));
    }

    this.onPeopleLoadedEvent.emit(this.transformJsonData(this.jsonData));
  };

  get = (): Promise<Person[]> => {
    // return this.people.slice();
    return new Promise(resolve => {
      setTimeout(() => resolve(this.people.slice()), 1);
    });
  };

  save = async (
    personToSave: Person,
    availablePeople: Set<Person>,
    assignedPeople: Set<Person>
  ) => {
    // Does the person exist
    let people: Person[] = this.people.filter(
      person => person.id === personToSave.id
    );

    if (people.length > 0) {
      // Update
      this.people = this.people.map(person => {
        if (person.id === personToSave.id) {
          return personToSave;
        } else {
          return person;
        }
      });
    } else {
      // Insert
      // Generate id
      personToSave.id = Math.trunc(Math.random() * 100000);

      this.people = this.people.concat(personToSave);
    }

    this.onPersonSavedEvent.emit({
      person: personToSave,
      availablePeople,
      assignedPeople
    });
    // this.onPeopleChangedEvent.emit(await this.get());
    this.onPeopleChangedEvent.next(await this.get());
  };

  delete = (personId: number): Promise<unknown> => {
    return new Promise(resolve => {
      setTimeout(async () => {
        this.people = this.people.filter(person => person.id !== personId);

        this.onPersonDeletedEvent.emit(personId);
        // this.onPeopleChangedEvent.emit(await this.get());
        this.onPeopleChangedEvent.next(await this.get());

        resolve(this.people);
      }, 250);
    });
  };
}
