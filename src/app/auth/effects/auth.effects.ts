import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { of, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import {
  ActionTypes,
  SignInSuccess,
  SignIn,
  SignInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  signInUser$ = this.actions$.pipe(
    ofType<SignIn>(ActionTypes.SignIn),
    map(action => action.payload),
    switchMap(payload =>
      this.authService.signIn$(payload.credentials).pipe(
        map((response: any) => new SignInSuccess({ token: response.token })),
        catchError(err => of(new SignInFailure(err)))
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

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType<SignUp>(ActionTypes.SignUp),
    map(action => action.payload),
    switchMap(payload =>
      this.authService.signUp$(payload.credentials).pipe(
        map(response => new SignUpSuccess()),
        catchError(err => of(new SignUpFailure(err)))
      )
    )
  );

  @Effect()
  signUpSuccess$ = this.actions$.pipe(
    ofType<SignUpSuccess>(ActionTypes.SignUpSuccess),
    map(() => {
      this.router.navigate(['sign-in']);
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
