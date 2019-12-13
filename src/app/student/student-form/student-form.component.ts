import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnChanges
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";

import { Student } from "../student.model";
import { PersonFormComponent } from "../../shared/components/person/person-form/person-form.component";
import { StudentService } from "../../shared/services/student.service";

@Component({
  selector: "app-student-form",
  templateUrl: "./student-form.component.html",
  styleUrls: ["./student-form.component.css"]
})
export class StudentFormComponent extends PersonFormComponent
  implements OnInit, OnChanges {
  heading = "Student";

  @ViewChild("studentCardNumberInput", { static: false })
  studentCardNumberInputRef: ElementRef;

  personForm: FormGroup;

  constructor(private studentService: StudentService) {
    super();
  }

  ngOnInit() {
    console.log("StudentFormComponent onInit");
    // Can't set up the FormGroup on Init, because the students view screen only changes the data and doesn't re-initialise the form
  }

  ngOnChanges() {
    console.log("StudentFormComponent onChanges");
    this.personForm = new FormGroup({
      firstName: new FormControl(
        { value: this.person.firstName, disabled: this.readonly },
        Validators.required
      ),
      lastName: new FormControl(
        { value: this.person.lastName, disabled: this.readonly },
        Validators.required
      ),
      studentCardNumber: new FormControl(
        {
          value: (this.person as Student).studentCardNumber,
          disabled: this.readonly
        },
        Validators.required,
        this.invalidStudentCardNumber
      )
    });
  }

  getFormControl(name: string) {
    return this.personForm.get(name);
  }

  populatePerson(value: any) {
    super.populatePerson(value);
    (this
      .person as Student).studentCardNumber = this.personForm.value.studentCardNumber;
  }

  onSubmit() {
    console.log("Student Form Submitted", this.personForm);

    this.populatePerson(this.personForm.value);

    this.onSaveClick();
  }

  // onSaveClick() {
  //   (this
  //     .person as Student).studentCardNumber = this.studentCardNumberInputRef.nativeElement.value;

  //   super.onSaveClick();
  // }

  invalidStudentCardNumber = (
    formControl: FormControl
  ):
    | Promise<{ [s: string]: boolean }>
    | Observable<{ [s: string]: boolean }> => {
    return this.studentService.studentCardAlreadyInUse(this.person.id, formControl.value)
      .then(invalid => {
        if (invalid) {
          return { cardInUse: true };
        } else {
          return null;
        }
      });
  };

  isFirstNameValid(): boolean {
    return !this.getFormControl('firstName').valid &&
      this.getFormControl('firstName').touched;
  }

  isLastNameValid(): boolean {
    return !this.getFormControl('lastName').valid &&
      this.getFormControl('lastName').touched;
  }

  isStudentCardNumberBeingChecked(): boolean {
    return this.getFormControl('studentCardNumber').value.length > 0 &&
      this.getFormControl('studentCardNumber').pending &&
      this.getFormControl('studentCardNumber').touched;
  }

  isStudentCardNumberInUse(): boolean {
    return this.getFormControl('studentCardNumber').errors &&
      this.getFormControl('studentCardNumber').errors['cardInUse'];
  }

  isStudentCardNumberEmpty(): boolean {
    return this.getFormControl('studentCardNumber').value.length === 0 &&
      !this.getFormControl('studentCardNumber').valid &&
      this.getFormControl('studentCardNumber').touched;
  }
}
