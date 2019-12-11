import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef
} from "@angular/core";

import { Person } from "../../../models/person.model";

@Component({
  selector: "app-person-form",
  templateUrl: "./person-form.component.html",
  styleUrls: ["./person-form.component.css"]
})
export class PersonFormComponent implements OnInit {
  @Input() heading: string;
  @Input() person: Person;
  @Input() readonly: boolean = false;

  @Output() onSave = new EventEmitter<Person>();
  @Output() onCancel = new EventEmitter<null>();
  @Output() onChangesMade = new EventEmitter<null>();

  @ViewChild("firstNameInput", { static: false }) firstNameInputRef: ElementRef;
  @ViewChild("lastNameInput", { static: false }) lastNameInputRef: ElementRef;

  constructor() {}

  ngOnInit() {}

  onSaveClick() {
    this.person.firstName = this.firstNameInputRef.nativeElement.value;
    this.person.lastName = this.lastNameInputRef.nativeElement.value;

    this.onSave.emit(this.person);
  }

  onCancelClick() {
    this.onCancel.emit();
  }

  onChangeMade() {
    this.onChangesMade.emit();
  }
}
