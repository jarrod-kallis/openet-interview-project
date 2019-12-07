import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MenuItem } from "../shared/constants";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output() onNavigatedTo = new EventEmitter<MenuItem>();

  constructor() {}

  ngOnInit() {}

  onNavigateToHome() {
    this.onNavigatedTo.emit(MenuItem.Home);
  }

  onNavigateToProfessors() {
    this.onNavigatedTo.emit(MenuItem.Professor);
  }

  onNavigateToStudents() {
    this.onNavigatedTo.emit(MenuItem.Student);
  }
}
