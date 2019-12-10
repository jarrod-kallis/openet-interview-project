import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Person } from '../../../models/person.model';
import { PersonService } from '../../../services/person.service';
import { Professor } from '../../../../professor/professor.model';
import { Student } from '../../../../student/student.model';

export class PersonListComponent implements OnInit, OnDestroy {
  mainTitle: string = "People";
  deleteModalTitle: string = "Delete Person";
  btnAddNewCaption: string = "Add New Person";

  personService: PersonService;

  people: Person[] = [];
  updating: boolean = false;
  deleting: boolean = false;
  selectedPerson: Person = null;

  peopleChangedSubscription: Subscription;
  personSavedSubscription: Subscription;

  constructor(personService: PersonService) {
    console.log('PersonListComponent constructor');
    this.personService = personService;
  }

  async ngOnInit() {
    // console.log('PersonListComponent onInit');
    this.people = await this.personService.get();
    // console.log('PersonListComponent onInit people', this.people);

    this.peopleChangedSubscription = this.personService.onPeopleChangedEvent.subscribe(
      people => (this.people = people)
    );

    this.personSavedSubscription = this.personService.onPersonSavedEvent.subscribe(() =>
      this.onResetSelectedPerson()
    );
  }

  ngOnDestroy() {
    console.log('PersonListComponent onDestroy');
    this.peopleChangedSubscription.unsubscribe();
    this.personSavedSubscription.unsubscribe();
  }

  onAddNewClick() {
    this.updating = true;
  }

  onUpdateClick(person: Person) {
    this.updating = true;
  }

  onDeleteClick = (person: Person) => {
    this.selectedPerson = person;
    this.deleting = true;
  }

  onDeleteConfirmed = async () => {
    await this.personService.delete(this.selectedPerson.id);
    this.deleting = false;
  }

  onDeleteCancelled = () => {
    this.deleting = false;
    this.onResetSelectedPerson();
  }

  onResetSelectedPerson = () => {
    this.selectedPerson = null;
    this.updating = false;
  }

  onCancelClick = () => {
    this.onResetSelectedPerson();
  }

  showProfessorDetail = () => {
    return (this.selectedPerson instanceof Professor) && (this.updating === true);
  }

  showStudentDetail = () => {
    return (this.selectedPerson instanceof Student) && (this.updating === true);
  }
}
