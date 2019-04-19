import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ActionTypes, LoadActivities } from '../actions';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

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
