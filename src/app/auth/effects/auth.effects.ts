import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

import {
  ActionTypes,
  SignInSuccess,
  SignIn,
  SignInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure,
  LogOut,
  SignInWithGoogle,
  RestoreSession,
  LoadUser,
  LoadUserSuccess
} from '../actions/auth.actions';
import { AuthService } from '../services';
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
        switchMap(() =>
          this.authService.user$.pipe(
            switchMap(user => of(new SignInSuccess({ firebaseUser: user })))
          )
        ),
        catchError(err => of(new SignInFailure({ error: err.message })))
      )
    )
  );

  @Effect()
  signInWithGoogle$ = this.actions$.pipe(
    ofType<SignInWithGoogle>(ActionTypes.SignInWithGoogle),
    switchMap(() =>
      this.authService.signInWithGoogle$().pipe(
        switchMap(() =>
          this.firebase.user.pipe(
            switchMap(user => {
              this.router.navigate(['']);
              console.log({ user });
              return of(new SignInSuccess({ firebaseUser: user }));
            })
          )
        ),
        catchError(err => of(new SignInFailure({ error: err.message })))
      )
    )
  );

  @Effect()
  successfulSignIn$ = this.actions$.pipe(
    ofType<SignInSuccess>(ActionTypes.SignInSuccess),
    map(action => action.payload),
    switchMap(payload =>
      this.users.createUser$(payload.firebaseUser).pipe(
        switchMap(() => {
          this.router.navigate(['']);
          return EMPTY;
        }),
        catchError(err => {
          return of(new LoadUser({ firebaseUid: payload.firebaseUser.uid }));
        })
      )
    )
  );

  @Effect()
  restoreSession$ = this.actions$.pipe(
    ofType<RestoreSession>(ActionTypes.RestoreSession),
    switchMap(() =>
      this.authService.user$.pipe(
        map(user => {
          if (user) {
            return new LoadUser({ firebaseUid: user.uid });
          }
          return new LogOut();
        })
      )
    )
  );

  @Effect()
  logOut$ = this.actions$.pipe(
    ofType<LogOut>(ActionTypes.LogOut),
    switchMap(() =>
      this.authService.signOut$().pipe(
        switchMap(() => {
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
        switchMap(() => of(new SignUpSuccess())),
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

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType<LoadUser>(ActionTypes.LoadUser),
    map(action => action.payload),
    switchMap(payload =>
      this.users.getUser$(payload.firebaseUid).pipe(
        map(user => {
          console.log({ user });
          if (user) {
            return new LoadUserSuccess({ user });
          }
          return new LogOut();
        }),
        catchError(err => EMPTY)
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private users: UserService,
    private router: Router,
    private firebase: AngularFireAuth
  ) {}
}
