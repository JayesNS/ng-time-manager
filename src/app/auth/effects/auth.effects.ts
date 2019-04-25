import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

import { AuthService } from '../services';
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
import { LoadUser } from '../actions/users.actions';
import { UserService } from '../../shared/services';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  signInUser$ = this.actions$.pipe(
    ofType<SignIn>(ActionTypes.SignIn),
    map(action => action.payload),
    switchMap(payload =>
      this.authService.signIn$(payload.credentials).pipe(
        map(() => {
          const firebaseUser = this.authService.user;
          return new SignInSuccess({ firebaseUser });
        }),
        catchError(err => of(new SignInFailure({ error: err.message })))
      )
    )
  );

  @Effect()
  signInWithGoogle$ = this.actions$.pipe(
    ofType<SignInWithGoogle>(ActionTypes.SignInWithGoogle),
    switchMap(() =>
      this.authService.signInWithGoogle$().pipe(
        map(() => {
          const firebaseUser = this.authService.user;
          return new SignInSuccess({ firebaseUser });
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
        map(() => {
          this.firebase.auth.currentUser
            .getIdToken(true)
            .then(token => localStorage.setItem('tokenId', token));
          return EMPTY;
        }),
        catchError(() => of(new LoadUser({ firebaseUid: payload.firebaseUser.uid })))
      );
    })
  );

  @Effect()
  logOut$ = this.actions$.pipe(
    ofType<LogOut>(ActionTypes.LogOut),
    switchMap(() => {
      this.router.navigate(['']);
      this.authService.signOut$().pipe(map(() => EMPTY));
      return EMPTY;
    })
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
    private firebase: AngularFireAuth,
    private router: Router
  ) {}
}
