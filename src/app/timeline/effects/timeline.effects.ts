import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ActionTypes, LoadActivities } from '../actions';

@Injectable()
export class TimelineEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  loadActivities$ = this.actions$.pipe(
    ofType<LoadActivities>(ActionTypes.LoadActivities),
    switchMap(action => {
      return EMPTY;
    })
  );
}
