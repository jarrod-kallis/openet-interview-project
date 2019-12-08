import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MenuCollapseService {
  menuCollapsed: boolean = true;

  constructor() {}

  onMenuCollapseChange = new EventEmitter<boolean>();

  toggleCollapse() {
    this.menuCollapsed = !this.menuCollapsed;
    this.onMenuCollapseChange.emit(this.menuCollapsed);
  }

  forceCollapse() {
    this.menuCollapsed = true;
    this.onMenuCollapseChange.emit(this.menuCollapsed);
  }
}
