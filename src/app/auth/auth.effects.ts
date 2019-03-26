import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { ActionTypes, SuccessfulSignIn, SignInUser, FailedSignIn } from './store';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AuthResponse } from './models';
import { of, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private authService: AuthService, private router: Router) {}

  @Effect()
  signInUser$ = this.actions.pipe(
    ofType(ActionTypes.SIGN_IN_USER),
    mergeMap((action: SignInUser) =>
      this.authService.signIn(action.payload).pipe(
        map((authResponse: AuthResponse) => new SuccessfulSignIn(authResponse)),
        catchError(err => of(new FailedSignIn(err.error)))
      )
    )
  );

  @Effect()
  successfulSignIn$ = this.actions.pipe(
    ofType(ActionTypes.SUCCESSFUL_SIGN_IN),
    switchMap((action: SuccessfulSignIn) => {
      localStorage.setItem('jwtToken', action.payload.token);
      this.router.navigate(['']);
      return EMPTY;
    })
  );
}
