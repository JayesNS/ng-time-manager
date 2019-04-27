import { Action } from '@ngrx/store';
import { User, Activity } from 'src/app/models';

export enum ActionTypes {
  LoadActivities = '[Timeline Page] Load activities',
  LoadActivitiesSuccess = '[Activity API] Load activities success',
  LoadActivitiesFailure = '[Activity API] Load activities failure',

  AddActivity = '[Timeline Page] Add activity',
  AddActivitySuccess = '[Activity API] Add activity success',
  AddActivityFailure = '[Activity API] Add activity failure'
}

export class LoadActivities implements Action {
  readonly type = ActionTypes.LoadActivities;

  constructor(public payload: { user: User }) {}
}

export class LoadActivitiesSuccess implements Action {
  readonly type = ActionTypes.LoadActivitiesSuccess;

  constructor(public payload: { activities: Activity[] }) {}
}

export class LoadActivitiesFailure implements Action {
  readonly type = ActionTypes.LoadActivitiesFailure;

  constructor(public payload: { error: string }) {}
}

export class AddActivity implements Action {
  readonly type = ActionTypes.AddActivity;

  constructor(public payload: { user: User; activity: Activity }) {}
}

export class AddActivitySuccess implements Action {
  readonly type = ActionTypes.AddActivitySuccess;

  constructor(public payload: { activity: Activity }) {}
}

export class AddActivityFailure implements Action {
  readonly type = ActionTypes.AddActivityFailure;

  constructor(public payload: { error: string }) {}
}

export type TimelineActions =
  | LoadActivities
  | LoadActivitiesSuccess
  | LoadActivitiesFailure
  | AddActivity
  | AddActivitySuccess
  | AddActivityFailure;
