import { Component, OnInit, Output, EventEmitter } from "@angular/core";

// import { MenuItem } from "../shared/constants";
import { MenuCollapseService } from "../shared/services/menu-collapse.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  providers: [MenuCollapseService]
})
export class HeaderComponent implements OnInit {
  // menuCollapsed: boolean;

  // @Output() onNavigatedTo = new EventEmitter<MenuItem>();

  constructor() { }

  ngOnInit() { }

  // onNavigateToHome() {
  //   this.onNavigatedTo.emit(MenuItem.Home);
  // }

  // onNavigateToProfessors() {
  //   this.onNavigatedTo.emit(MenuItem.Professor);
  // }

  // onNavigateToStudents() {
  //   this.onNavigatedTo.emit(MenuItem.Student);
  // }

  // onMenuCollapse(collapsed: boolean) {
  //   this.menuCollapsed = collapsed;
  //   console.log(collapsed);
  // }
}
