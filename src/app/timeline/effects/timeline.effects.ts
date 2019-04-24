import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import {
  ActionTypes,
  LoadActivities,
  AddActivity,
  LoadActivitiesSuccess,
  LoadActivitiesFailure
} from '../actions';
import { ActivitiesService } from '../services/activities.service';

@Injectable()
export class TimelineEffects {
  constructor(private actions$: Actions, private activities: ActivitiesService) {}

  @Effect()
  loadActivities$ = this.actions$.pipe(
    ofType<LoadActivities>(ActionTypes.LoadActivities),
    switchMap(action => {
      return this.activities.loadActivities$(action.payload.user).pipe(
        map(activities => new LoadActivitiesSuccess({ activities })),
        catchError(err => {
          console.error({ err });
          return of(new LoadActivitiesFailure({ err }));
        })
      );
    })
  );

  // TODO: complete effect
  @Effect()
  addActivity$ = this.actions$.pipe(
    ofType<AddActivity>(ActionTypes.AddActivity),
    map(action => action.payload),
    switchMap(payload => {
      return EMPTY;
    })
  );
}
