import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import {
  ActionTypes,
  LoadActivities,
  AddActivity,
  LoadActivitiesSuccess,
  LoadActivitiesFailure,
  AddActivitySuccess,
  AddActivityFailure,
  RemoveActivity,
  RemoveActivitySuccess,
  RemoveActivityFailure
} from '../actions';
import { ActivitiesService } from '../services/activities.service';

@Injectable()
export class ActivitiesEffects {
  constructor(private actions$: Actions, private activities: ActivitiesService) {}

  @Effect()
  loadActivities$ = this.actions$.pipe(
    ofType<LoadActivities>(ActionTypes.LoadActivities),
    switchMap(action =>
      this.activities.loadActivities$(action.payload.user).pipe(
        map(activities => new LoadActivitiesSuccess({ activities })),
        catchError(error => of(new LoadActivitiesFailure({ error })))
      )
    )
  );

  @Effect()
  addActivity$ = this.actions$.pipe(
    ofType<AddActivity>(ActionTypes.AddActivity),
    map(action => action.payload),
    switchMap(payload =>
      this.activities.addActivity$(payload.user, payload.activity).pipe(
        switchMap(activity => of(new AddActivitySuccess({ activity }))),
        catchError(error => of(new AddActivityFailure({ error })))
      )
    )
  );

  @Effect()
  removeActivity$ = this.actions$.pipe(
    ofType<RemoveActivity>(ActionTypes.RemoveActivity),
    map(action => action.payload),
    switchMap(payload =>
      this.activities.removeActivity$(payload.activity).pipe(
        switchMap(activity => of(new RemoveActivitySuccess({ activity }))),
        catchError(error => of(new RemoveActivityFailure({ error })))
      )
    )
  );
}
