import { OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";

import { Person } from "../../../models/person.model";
import { PersonService } from "../../../services/person.service";
import { Professor } from "../../../../professor/professor.model";
import { Student } from "../../../../student/student.model";
import { CanLeaveRouteComponentInterface } from "../../../services/can-leave-route.service";

export class PersonListComponent
  implements OnInit, OnDestroy, CanLeaveRouteComponentInterface {
  mainTitle: string = "People";
  deleteModalTitle: string = "Delete Person";
  btnAddNewCaption: string = "Add New Person";

  personService: PersonService;

  people: Person[] = [];
  updating: boolean = false;
  deleting: boolean = false;
  changesMade: boolean = false;
  selectedPerson: Person = null;

  peopleChangedSubscription: Subscription;
  personSavedSubscription: Subscription;

  constructor(personService: PersonService) {
    console.log("PersonListComponent constructor");
    this.personService = personService;
  }

  async ngOnInit() {
    // console.log('PersonListComponent onInit');
    this.people = await this.personService.get();
    // console.log('PersonListComponent onInit people', this.people);

    this.peopleChangedSubscription = this.personService.onPeopleChangedEvent.subscribe(
      people => (this.people = people)
    );

    this.personSavedSubscription = this.personService.onPersonSavedEvent.subscribe(
      () => this.onResetSelectedPerson()
    );
  }

  ngOnDestroy() {
    console.log("PersonListComponent onDestroy");
    this.peopleChangedSubscription.unsubscribe();
    this.personSavedSubscription.unsubscribe();
  }

  onAddNewClick() {
    this.updating = true;
  }

  onUpdateClick(person: Person) {
    this.selectedPerson = person.clone();
    this.updating = true;
  }

  onDeleteClick = (person: Person) => {
    this.selectedPerson = person;
    this.deleting = true;
  };

  onDeleteConfirmed = async () => {
    await this.personService.delete(this.selectedPerson.id);
    this.deleting = false;
  };

  onDeleteCancelled = () => {
    this.deleting = false;
    this.onResetSelectedPerson();
  };

  onResetSelectedPerson = () => {
    this.selectedPerson = null;
    this.updating = false;
    this.changesMade = false;
  };

  onCancelClick = () => {
    this.onResetSelectedPerson();
  };

  showDetail = (): boolean => {
    return this.updating;
  };

  // showProfessorDetail = () => {
  //   return this.selectedPerson instanceof Professor && this.updating === true;
  // };

  // showStudentDetail = () => {
  //   return this.selectedPerson instanceof Student && this.updating === true;
  // };

  onChangeMade() {
    this.changesMade = true;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.updating && this.changesMade) {
      if (confirm("Are you sure you want to discard your changes?")) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
