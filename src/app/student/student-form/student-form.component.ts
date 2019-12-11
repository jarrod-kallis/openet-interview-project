import { Component, ViewChild, ElementRef } from "@angular/core";

import { Student } from "../student.model";
import { PersonFormComponent } from "../../shared/components/person/person-form/person-form.component";

@Component({
  selector: "app-student-form",
  templateUrl: "./student-form.component.html",
  styleUrls: ["./student-form.component.css"]
})
export class StudentFormComponent extends PersonFormComponent {
  heading = "Student";

  @ViewChild("studentCardNumberInput", { static: false })
  studentCardNumberInputRef: ElementRef;

  onSaveClick() {
    (this
      .person as Student).studentCardNumber = this.studentCardNumberInputRef.nativeElement.value;

    super.onSaveClick();
  }
}
