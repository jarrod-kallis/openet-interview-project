import { Component, OnInit, Input } from '@angular/core';

import { Person } from '../../../models/person.model';
import { PersonService } from '../../../services/person.service';
import { Professor } from '../../../../professor/professor.model';
import { Student } from '../../../../student/student.model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  mainTitle: string = "People";
  deleteModalTitle: string = "Delete Person";
  btnAddNewCaption: string = "Add New Person";

  personService: PersonService;

  people: Person[] = [];
  updating: boolean = false;
  deleting: boolean = false;
  selectedPerson: Person = null;

  constructor(personService: PersonService) {
    console.log('PersonListComponent constructor');
    this.personService = personService;
  }

  ngOnInit() {
    this.people = this.personService.get();

    this.personService.onPeopleChangedEvent.subscribe(
      people => (this.people = people)
    );

    this.personService.onPersonSavedEvent.subscribe(() =>
      this.onResetSelectedPerson()
    );
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
