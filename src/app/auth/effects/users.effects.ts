import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { LoadUser, ActionTypes, LoadUserSuccess } from '../actions/users.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services';
import { EMPTY } from 'rxjs';

@Injectable()
export class UsersEffects {
  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType<LoadUser>(ActionTypes.LoadUser),
    map(action => action.payload),
    switchMap(payload =>
      this.users.getUser$(payload.firebaseUid).pipe(
        map(user => new LoadUserSuccess({ user: { ...user } })),
        catchError(err => EMPTY)
      )
    )
  );

  constructor(private actions$: Actions, private users: UserService) {}
}
