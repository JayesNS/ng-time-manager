import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

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
  RemoveActivityFailure,
  OpenActivityEditor,
  CloseActivityEditor,
  EditActivity,
  EditActivityFailure,
  EditActivitySuccess,
  ChangeTodoStatus
} from '../actions';
import { ActivitiesService } from '../services/activities.service';
import { MatDialog } from '@angular/material';
import { ActivityEditorComponent } from '../containers';

@Injectable()
export class ActivitiesEffects {
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
  addActivitySuccess$ = this.actions$.pipe(
    ofType<AddActivitySuccess>(ActionTypes.AddActivitySuccess),
    map(() => new CloseActivityEditor({ close: true }))
  );

  @Effect()
  editActivity$ = this.actions$.pipe(
    ofType<EditActivity>(ActionTypes.EditActivity),
    map(action => action.payload),
    switchMap(payload =>
      this.activities.editActivity$(payload.activity).pipe(
        switchMap(activity => of(new EditActivitySuccess({ activity }))),
        catchError(error => of(new EditActivityFailure({ error })))
      )
    )
  );

  @Effect()
  editActivitySuccess$ = this.actions$.pipe(
    ofType<EditActivitySuccess>(ActionTypes.EditActivitySuccess),
    map(() => new CloseActivityEditor({ close: true }))
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

  @Effect()
  changeTodoStatus$ = this.actions$.pipe(
    ofType<ChangeTodoStatus>(ActionTypes.ChangeTodoStatus),
    map(action => action.payload),
    switchMap(payload =>
      this.activities.editTodo$(payload.todo).pipe(
        switchMap(todo => {
          return EMPTY;
        })
      )
    )
  );

  @Effect()
  openActivityEditor$ = this.actions$.pipe(
    ofType<OpenActivityEditor>(ActionTypes.OpenActivityEditor),
    map(action => action.payload),
    switchMap(payload => {
      this.dialog.open(ActivityEditorComponent, {
        id: 'ActivityEditor',
        data: payload ? payload.activity : undefined
      });
      return EMPTY;
    })
  );

  @Effect()
  closeActivityEditor$ = this.actions$.pipe(
    ofType<CloseActivityEditor>(ActionTypes.CloseActivityEditor),
    map(action => action.payload),
    switchMap(payload => {
      if (payload.close) {
        this.dialog.getDialogById('ActivityEditor').close();
      }
      return EMPTY;
    })
  );

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private activities: ActivitiesService
  ) {}
}
