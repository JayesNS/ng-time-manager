import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Credentials } from '../models';
import { of, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { ActionTypes, SignInSuccess, SignIn, SignInFailure } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  signInUser$ = this.actions$.pipe(
    ofType(ActionTypes.SignIn),
    map<SignIn, Credentials>(action => action.payload),
    mergeMap(credentials =>
      this.authService.signIn(credentials).pipe(
        map((response: any) => new SignInSuccess({ ...response })),
        catchError(err => of(new SignInFailure(err.error)))
      )
    )
  );

  @Effect()
  successfulSignIn$ = this.actions$.pipe(
    ofType<SignInSuccess>(ActionTypes.SignInSuccess),
    map(action => action.payload),
    switchMap(payload => {
      localStorage.setItem('jwtToken', payload.token);
      this.router.navigate(['']);
      return EMPTY;
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
