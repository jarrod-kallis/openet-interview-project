import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-add-button",
  templateUrl: "./add-button.component.html",
  styleUrls: ["./add-button.component.css"]
})
export class AddButtonComponent {
  @Output() onClicked = new EventEmitter<null>();

  constructor() { }

  onClick() {
    this.onClicked.emit();
  }
}
