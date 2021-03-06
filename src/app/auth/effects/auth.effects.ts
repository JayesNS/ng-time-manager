import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
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
  SignUpFailure,
  LogOut,
  SignInWithGoogle
} from '../actions/auth.actions';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class AuthEffects {
  @Effect()
  signInUser$ = this.actions$.pipe(
    ofType<SignIn>(ActionTypes.SignIn),
    map(action => action.payload),
    switchMap(payload =>
      this.authService.signIn$(payload.credentials).pipe(
        map(() => {
          const user = this.authService.user;
          return new SignInSuccess({ user });
        }),
        catchError(err => of(new SignInFailure(err)))
      )
    )
  );

  @Effect()
  signInWithGoogle$ = this.actions$.pipe(
    ofType<SignInWithGoogle>(ActionTypes.SignInWithGoogle),
    switchMap(() =>
      this.authService.signInWithGoogle$().pipe(
        map(() => {
          const user = this.authService.user;
          return new SignInSuccess({ user });
        }),
        catchError(err => of(new SignInFailure({ error: err.message })))
      )
    )
  );

  @Effect()
  successfulSignIn$ = this.actions$.pipe(
    ofType<SignInSuccess>(ActionTypes.SignInSuccess),
    map(action => action.payload),
    switchMap(payload => {
      this.router.navigate(['']);
      return this.users.createUser$(this.authService.user).pipe(
        switchMap(() => EMPTY),
        catchError(() => EMPTY)
      );
    })
  );

  @Effect()
  logOut$ = this.actions$.pipe(
    ofType<LogOut>(ActionTypes.LogOut),
    switchMap(() =>
      this.authService.signOut$().pipe(
        map(() => {
          this.router.navigate(['']);
          return EMPTY;
        })
      )
    )
  );

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType<SignUp>(ActionTypes.SignUp),
    map(action => action.payload),
    switchMap(payload =>
      this.authService.signUp$(payload.credentials).pipe(
        map(() => new SignUpSuccess()),
        catchError(err => of(new SignUpFailure({ error: err.message })))
      )
    )
  );

  @Effect()
  signUpSuccess$ = this.actions$.pipe(
    ofType<SignUpSuccess>(ActionTypes.SignUpSuccess),
    switchMap(() => {
      this.router.navigate(['sign-in']);
      return EMPTY;
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private users: UserService,
    private router: Router
  ) {}
}
