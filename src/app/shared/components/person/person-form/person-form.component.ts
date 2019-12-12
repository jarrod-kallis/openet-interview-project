import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Person } from "../../../models/person.model";

@Component({
  selector: "app-person-form",
  templateUrl: "./person-form.component.html",
  styleUrls: ["./person-form.component.css"]
})
export class PersonFormComponent {
  @Input() heading: string;
  @Input() person: Person;
  @Input() readonly: boolean = false;

  @Output() onSave = new EventEmitter<Person>();
  @Output() onCancel = new EventEmitter<null>();
  @Output() onChangesMade = new EventEmitter<null>();

  // @ViewChild("firstNameInput", { static: false }) firstNameInputRef: ElementRef;
  // @ViewChild("lastNameInput", { static: false }) lastNameInputRef: ElementRef;

  populatePerson(value: any) {
    this.person.firstName = value.firstName;
    this.person.lastName = value.lastName;
  }

  // NgForm is the JS object that Angular creates automatically so we can get access to the details of the form
  // It doesn't have to be an argument in the onSubmit method, we can also get hold of it using @ViewChild
  onSubmit(form: NgForm) {
    console.log("Person Form Submitted", form.value);

    // this.person.firstName = form.value.firstName;
    // this.person.lastName = form.value.lastName;
    this.populatePerson(form.value);

    this.onSaveClick();
  }

  protected onSaveClick() {
    // this.person.firstName = this.firstNameInputRef.nativeElement.value;
    // this.person.lastName = this.lastNameInputRef.nativeElement.value;

    this.onSave.emit(this.person);
  }

  onCancelClick() {
    this.onCancel.emit();
  }

  onChangeMade() {
    this.onChangesMade.emit();
  }
}
