import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})
export class FormItemComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() label: string = "";
  @Input() inputType: string = "text";
  @Input() inputName: string = "";
  @Input() containerClass: string = "col-sm-10";

  @Output() onChangesMade = new Subject<void>();

  constructor() { }

  ngOnInit() {
  }

  getClass(): string {
    return `${this.containerClass} form-group`;
  }

  onChangeMade() {
    this.onChangesMade.next();
  }

  getFormControl(name: string) {
    return this.formGroup.get(name);
  }
}
