import { EventEmitter } from "@angular/core";
import { Params } from "@angular/router";

export class UrlChangeService {
  onParamsChangedEvent = new EventEmitter<Params>();

  constructor() {}

  paramsChanged(params: Params) {
    this.onParamsChangedEvent.emit(params);
  }
}
