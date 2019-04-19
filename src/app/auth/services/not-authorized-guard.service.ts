import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { State, selectAuthUser } from '../state';

@Injectable({
  providedIn: 'root'
})
export class NotAuthorizedGuardService implements CanActivate {
  constructor(private store: Store<State>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectAuthUser).pipe(map(user => !user));
  }
}
