import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RestoreSession } from '../actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class SessionResolverService implements Resolve<void> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    return this.store.dispatch(new RestoreSession());
  }

  constructor(private store: Store<any>) {}
}
