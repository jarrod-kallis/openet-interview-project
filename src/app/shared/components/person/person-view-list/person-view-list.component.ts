import { OnInit, OnDestroy, Component } from "@angular/core";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Person } from "../../../models/person.model";
import { UrlChangeService } from "../../../services/url-change.service";
import { PersonService } from "../../../services/person.service";

export class PersonViewListComponent implements OnInit, OnDestroy {
  people: Person[];
  peopleSet: Set<Person> = new Set<Person>();
  selectedPerson: Person;

  urlParamsChangedSubscription: Subscription;

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute,
    private urlChangeService: UrlChangeService
  ) { }

  async ngOnInit() {
    console.log("PersonViewListComponent onInit");
    let paramId: number;

    this.urlParamsChangedSubscription = this.urlChangeService.onParamsChangedEvent.subscribe(
      (params: Params) => {
        console.log("PersonViewListComponent urlChanged");
        // This is only necessary to catch a page refresh (eg. F5)
        // This component doesn't have access to the :id url param, because its route is on {person}/view
        // It gets the param from the relevant ViewListComponent which fires the urlChanged event
        paramId = +params["id"];
      }
    );

    // Only get the people when the component first loads
    this.people = await this.personService.get();
    this.people.forEach((person: Person) => {
      this.peopleSet.add(person);
    });

    // Get the initially selected person (ie. read the url from a refresh)
    this.selectedPerson = this.people.find(person =>
      person.id === paramId ? person : null
    );
  }

  ngOnDestroy() {
    console.log("PersonViewListComponent onDestroy");

    this.urlParamsChangedSubscription.unsubscribe();
  }

  showPerson(): boolean {
    return this.selectedPerson ? true : false;
  }

  onPersonClick(person: Person) {
    this.selectedPerson = person;
    this.router.navigate([person.id], {
      relativeTo: this.route
    });
  }

  getActivePersonId() {
    return this.selectedPerson ? this.selectedPerson.id : 0;
  }
}
