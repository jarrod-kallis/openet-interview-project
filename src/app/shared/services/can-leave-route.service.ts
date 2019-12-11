import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

export interface CanLeaveRouteComponentInterface {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}

export class CanLeaveRouteService
  implements CanDeactivate<CanLeaveRouteComponentInterface> {
  canDeactivate(
    component: CanLeaveRouteComponentInterface,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log(component);
    return component.canDeactivate();
  }
}
