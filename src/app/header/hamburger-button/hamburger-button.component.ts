import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  Renderer2
} from "@angular/core";

import { MenuCollapseService } from "../../shared/services/menu-collapse.service";

@Component({
  selector: "app-hamburger-button",
  templateUrl: "./hamburger-button.component.html",
  styleUrls: ["./hamburger-button.component.css"]
})
export class HamburgerButtonComponent implements OnInit {
  constructor(
    private menuCollapseService: MenuCollapseService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  onClick() {
    this.menuCollapseService.toggleCollapse();
  }

  // Force the menu to close if the window is resized
  @HostListener("window:resize") resizeWindow() {
    this.menuCollapseService.forceCollapse();
  }

  // Test if the user has clicked anywhere outside the hamburger menu
  @HostListener("document:click", ["$event"]) click(event: Event) {
    const clickedHamburgerMenu: boolean = this.elementRef.nativeElement.contains(
      event.target
    );

    if (clickedHamburgerMenu == false) {
      this.menuCollapseService.forceCollapse();
    }
  }
}
