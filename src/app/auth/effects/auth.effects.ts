import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
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
  LoadUserSuccess,
  LoadUserFailure
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
              return of(new SignInSuccess({ firebaseUser: user }));
            })
          )
        ),
        catchError(err => of(new SignInFailure({ error: err.message })))
      )
    )
  );

  @Effect()
  restoreSession$ = this.actions$.pipe(
    ofType<RestoreSession>(ActionTypes.RestoreSession),
    switchMap(() =>
      this.firebase.user.pipe(
        switchMap(user => {
          if (user) {
            return of(new LoadUser({ firebaseUser: user }));
          }
          return of(new LoadUserFailure({ error: '' }));
        })
      )
    )
  );

  @Effect()
  loadUserFailure$ = this.actions$.pipe(
    ofType<LoadUserFailure>(ActionTypes.LoadUserFailure),
    map(() => new LogOut())
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
      this.users.getUser$(payload.firebaseUser).pipe(
        switchMap(user => {
          if (user) {
            return of(new LoadUserSuccess({ user }));
          }
          return of(new LoadUserFailure({ error: 'User not found' }));
        }),
        catchError(err => of(new LoadUserFailure({ error: err })))
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
