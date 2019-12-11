import { Input, Output, EventEmitter, OnChanges } from "@angular/core";

import { Person } from "../../../models/person.model";
import { ToastrService } from "ngx-toastr";
import { PersonService } from "../../../services/person.service";

export class PersonDetailComponent implements OnChanges {
  formHeading: string = "Person";
  availableAssignedHeading: string = "People";

  // Current Person type that you're looking at eg. Professor
  personService: PersonService;
  // People that can be linked to this type eg. Students
  alternatePersonService: PersonService;

  @Input() person: Person;
  allPeople: Person[] = [];
  assignedPeopleSet: Set<Person> = new Set<Person>();
  availablePeopleSet: Set<Person> = new Set<Person>();

  @Output() onCancelClicked: EventEmitter<null> = new EventEmitter<null>();
  @Output() onChangesMade: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    personService: PersonService,
    alternatePersonService: PersonService,
    protected toastr: ToastrService
  ) {
    this.personService = personService;
    this.alternatePersonService = alternatePersonService;
  }

  async ngOnChanges() {
    this.allPeople = await this.alternatePersonService.get();

    this.setupInitialPeople();
  }

  isValid(person: Person) {
    let isValid: boolean = true;

    if (!person.firstName) {
      this.toastr.error("Please fill in a first name");
      isValid = false;
    }

    if (!person.lastName) {
      this.toastr.error("Please fill in a last name");
      isValid = false;
    }

    return isValid;
  }

  onSaveClick = (person: Person) => {
    if (this.isValid(person)) {
      this.personService.save(
        person,
        this.availablePeopleSet,
        this.assignedPeopleSet
      );
    }
  };

  onCancelClick() {
    this.onCancelClicked.emit();
  }

  onAvailablePersonClick(person: Person) {
    this.assignedPeopleSet.add(person);
    this.availablePeopleSet.delete(person);
  }

  onAssignedPersonClick(person: Person) {
    this.assignedPeopleSet.delete(person);
    this.availablePeopleSet.add(person);
  }

  isPersonAssigned = (parentPersonId: number, personId: number): boolean => {
    throw new Error("Please implement isPersonAssigned()");
  };

  setupInitialPeople = () => {
    this.assignedPeopleSet = new Set<Person>();
    this.availablePeopleSet = new Set<Person>();

    this.allPeople.forEach(person => {
      this.isPersonAssigned(this.person.id, person.id)
        ? this.assignedPeopleSet.add(person)
        : this.availablePeopleSet.add(person);
    });
  };

  onChangeMade() {
    this.onChangesMade.emit();
  }
}
