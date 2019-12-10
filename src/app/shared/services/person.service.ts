import { EventEmitter } from '@angular/core';

import { Person } from '../models/person.model';
import { PersonService as PersonServiceInterface } from './interfaces/person.service.js';

export class PersonService implements PersonServiceInterface {
  onPeopleLoadedEvent: EventEmitter<[{ id: number, peopleIds: number[] }]> = new EventEmitter<[{ id: number, peopleIds: number[] }]>();
  onPeopleChangedEvent: EventEmitter<Person[]> = new EventEmitter<Person[]>();
  onPersonSavedEvent: EventEmitter<{ person: Person, availablePeople: Set<Person>, assignedPeople: Set<Person> }> = new EventEmitter<{ person: Person, availablePeople: Set<Person>, assignedPeople: Set<Person> }>();
  onPersonDeletedEvent: EventEmitter<number> = new EventEmitter<number>();

  protected jsonData: any;
  protected people: Person[] = [];

  constructor() {
    console.log('Person service constructor');
    setTimeout(this.load, 1);
  }

  getJsonData = (): void => {
    throw new Error('Please override PersonService.getJsonData()');
  }

  transformJsonData = (jsonData: any[]): [{ id: number, peopleIds: number[] }] => {
    throw new Error('Please override PersonService.transformJsonData()');
  }

  createPerson = (data: any): Person => {
    throw new Error('Please override PersonService.createPerson()');
  }

  load = (): void => {
    this.getJsonData();

    for (let data of this.jsonData) {
      this.people.push(
        this.createPerson(data)
      );
    }

    this.onPeopleLoadedEvent.emit(this.transformJsonData(this.jsonData));
  }

  get = (): Person[] => {
    return this.people.slice();
  }

  save = (personToSave: Person, availablePeople: Set<Person>, assignedPeople: Set<Person>): void => {
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

      this.people = this.people.concat(personToSave)
    }

    this.onPersonSavedEvent.emit({ person: personToSave, availablePeople, assignedPeople });
    this.onPeopleChangedEvent.emit(this.get());
  }

  delete = (personId: number): Promise<unknown> => {
    return new Promise(resolve => {
      setTimeout(() => {
        this.people = this.people.filter(
          person => person.id !== personId
        );

        this.onPersonDeletedEvent.emit(personId);
        this.onPeopleChangedEvent.emit(this.get());

        resolve();
      }, 250);
    });
  }
}
