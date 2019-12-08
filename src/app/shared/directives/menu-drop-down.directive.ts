import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[appMenuDropDown]"
})
export class MenuDropDownDirective {
  // Control a property on an element
  @HostBinding("class") class: string;

  constructor() {}

  // An event to listen to on the element
  @HostListener("mouseover") onHover() {
    this.class = "open";
  }

  @HostListener("mouseleave") onLeave() {
    this.class = "";
  }
}
