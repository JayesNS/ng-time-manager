import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { State, selectAuthUser } from '../state';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthorizedGuardService implements CanActivate {
  constructor(private store: Store<State>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectAuthUser).pipe(
      map(user => {
        const isAuthenticated = !!user;

        if (!isAuthenticated) {
          this.router.navigate(['']);
        }

        return isAuthenticated;
      })
    );
  }
}