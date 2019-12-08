import { Directive, HostBinding } from "@angular/core";

import { MenuCollapseService } from "../services/menu-collapse.service";

@Directive({
  selector: "[appMenuCollapse]"
})
export class MenuCollapseDirective {
  @HostBinding("class.collapse") isCollapsed: boolean = true;

  constructor(private menuCollapseService: MenuCollapseService) {
    this.menuCollapseService.onMenuCollapseChange.subscribe(menuCollapsed => {
      this.isCollapsed = menuCollapsed;
    });
  }
}
