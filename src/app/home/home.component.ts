import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from '../shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get menuItemEnum() {
    return MenuItem;
  }

  navigateTo(menuItem: MenuItem) {
    let path = "/";

    switch (menuItem) {
      case MenuItem.Professor:
        path = '/professors';
        break;
      case MenuItem.Student:
        path = '/students';
        break;
      default:
        path = '/';
    }

    this.router.navigate([path]);
  }
}
