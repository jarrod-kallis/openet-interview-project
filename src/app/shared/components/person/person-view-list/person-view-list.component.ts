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
  paramId: number;

  urlParamsChangedSubscription: Subscription;

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute,
    private urlChangeService: UrlChangeService
  ) {}

  async ngOnInit() {
    console.log("PersonViewListComponent onInit");

    this.urlParamsChangedSubscription = this.urlChangeService.onParamsChangedEvent.subscribe(
      (params: Params) => {
        this.paramId = +params["id"];
      }
    );

    this.people = await this.personService.get();
    this.people.forEach((person: Person) => {
      this.peopleSet.add(person);
    });

    this.selectedPerson = this.people.find(person =>
      person.id === this.paramId ? person : null
    );
  }

  ngOnDestroy() {
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
