import { Component } from "@angular/core";

import { MenuItem } from "./shared/constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  selectedMenuItem: MenuItem = MenuItem.Home;

  onNavigatedTo(selectedMenuItem: MenuItem) {
    this.selectedMenuItem = selectedMenuItem;
  }

  get menuItemEnum() {
    return MenuItem;
  }
}
