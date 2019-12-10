import { Directive, HostBinding, OnDestroy, OnInit } from "@angular/core";

import { MenuCollapseService } from "../services/menu-collapse.service";
import { Subscription } from 'rxjs';

@Directive({
  selector: "[appMenuCollapse]"
})
export class MenuCollapseDirective implements OnInit, OnDestroy {
  @HostBinding("class.collapse") isCollapsed: boolean = true;

  menuCollapseChangeSubscription: Subscription;

  constructor(private menuCollapseService: MenuCollapseService) {

  }

  ngOnInit() {
    console.log('MenuCollapseDirective onInit');
    this.menuCollapseChangeSubscription = this.menuCollapseService.onMenuCollapseChange.subscribe(menuCollapsed => {
      this.isCollapsed = menuCollapsed;
    });
  }

  ngOnDestroy() {
    console.log('MenuCollapseDirective onDestroy');
    this.menuCollapseChangeSubscription.unsubscribe();
  }
}
