import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";

import { Person } from "../../models/person.model";

@Component({
  selector: "app-person-detail",
  templateUrl: "./person-detail.component.html",
  styleUrls: ["./person-detail.component.css"]
})
export class PersonDetailComponent implements OnInit {
  @Input() heading: string;
  @Input() person: Person;

  @Output() onSave = new EventEmitter<Person>();
  @Output() onCancel = new EventEmitter<null>();

  @ViewChild("firstNameInput", { static: false }) firstNameInputRef: ElementRef;
  @ViewChild("lastNameInput", { static: false }) lastNameInputRef: ElementRef;

  constructor() {}

  ngOnInit() {}

  onSaveClick() {
    const person: Person = new Person(
      this.person.id,
      this.firstNameInputRef.nativeElement.value,
      this.lastNameInputRef.nativeElement.value
    );

    this.onSave.emit(person);
  }

  onCancelClick() {
    this.onCancel.emit();
  }
}
