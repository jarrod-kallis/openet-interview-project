import { EventEmitter } from '@angular/core';

import { Person } from '../../models/person.model.js';

export interface PersonService {
  load(): void;
  get(): Person[];
  save(personToSave: Person, availablePeople: Set<Person>, assignedPeople: Set<Person>): void;
  delete(personId: number): Promise<any>;
  getJsonData(): void;
  transformJsonData(jsonData: any[]): [{ id: number, peopleIds: number[] }];
  createPerson(data: any): Person;

  onPeopleLoadedEvent: EventEmitter<[{ id: number, peopleIds: number[] }]>;
  onPeopleChangedEvent: EventEmitter<Person[]>;
  onPersonSavedEvent: EventEmitter<{ person: Person, availablePeople: Set<Person>, assignedPeople: Set<Person> }>;
  onPersonDeletedEvent: EventEmitter<number>;
}
