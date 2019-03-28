import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { selectIsLoggedIn } from '../state';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotAuthorizedGuardService implements CanActivate {
  constructor(public store: Store<State>) {}

  canActivate() {
    return this.store.select(selectIsLoggedIn).pipe(map(isLoggedIn => !isLoggedIn));
  }
}
