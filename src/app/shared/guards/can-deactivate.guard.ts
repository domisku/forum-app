import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export function onCanFormDeactivate(
  wasFormTouched: boolean,
  areChangesSaved: boolean
) {
  if (!wasFormTouched || areChangesSaved) {
    return true;
  } else {
    const message =
      'There are unsaved changes. Are you sure you want to leave?';

    return confirm(message);
  }
}

export interface CanComponentDeactivate {
  canDeactivate: () =>
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canDeactivate();
  }
}
