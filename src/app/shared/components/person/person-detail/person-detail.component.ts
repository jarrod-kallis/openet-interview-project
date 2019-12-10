import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges
} from "@angular/core";

import { Person } from "../../../models/person.model";
import { Professor } from '../../../../professor/professor.model';
import { Student } from '../../../../student/student.model';
import { ProfessorService } from '../../../services/professor.service';
import { StudentService } from '../../../services/student.service';
import { ProfessorStudentLinkService } from '../../../services/professor-student-link.service';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from '../../../services/person.service';

// @Component({
//   selector: "app-person-detail",
//   templateUrl: "./person-detail.component.html",
//   styleUrls: ["./person-detail.component.css"]
// })
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

  constructor(personService: PersonService,
    alternatePersonService: PersonService,
    private toastr: ToastrService
  ) {
    this.personService = personService;
    this.alternatePersonService = alternatePersonService;
  }

  ngOnChanges() {
    this.allPeople = this.alternatePersonService.get();

    this.setupInitialPeople();
  }

  isValid = (person: Person) => {
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
      this.personService.save(person, this.availablePeopleSet, this.assignedPeopleSet);
    }
  }

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
    throw new Error('Please implement isPersonAssigned()');
  }

  setupInitialPeople = () => {
    this.assignedPeopleSet = new Set<Person>();
    this.availablePeopleSet = new Set<Person>();

    this.allPeople.forEach(person => {
      this.isPersonAssigned(this.person.id, person.id)
        ? this.assignedPeopleSet.add(person)
        : this.availablePeopleSet.add(person);
    });
  }
}
