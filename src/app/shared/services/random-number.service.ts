import { Injectable } from "@angular/core";

// They say that this is equivalent to adding the service to App Module, but I can't get it to work
// Injectable({
//   providedIn: "root"
// });
export class RandomNumberService {
  random: string;

  constructor() {
    this.random = Math.random().toFixed(5);
  }
}
