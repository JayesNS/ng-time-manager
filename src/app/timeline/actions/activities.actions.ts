import { Action } from '@ngrx/store';
import { User, Activity } from 'src/app/models';

export enum ActionTypes {
  LoadActivities = '[Timeline Page] Load activities',
  LoadActivitiesSuccess = '[Activity API] Load activities success',
  LoadActivitiesFailure = '[Activity API] Load activities failure',

  AddActivity = '[Timeline Page] Add activity',
  AddActivitySuccess = '[Activity API] Add activity success',
  AddActivityFailure = '[Activity API] Add activity failure',

  RemoveActivity = '[Activity Component] Remove activity',
  RemoveActivitySuccess = '[Activity API] Remove activity success',
  RemoveActivityFailure = '[Activity API] Remove activity failure'
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

export class RemoveActivity implements Action {
  readonly type = ActionTypes.RemoveActivity;

  constructor(public payload: { activity: Activity }) {}
}

export class RemoveActivitySuccess implements Action {
  readonly type = ActionTypes.RemoveActivitySuccess;

  constructor(public payload: { activity: Activity }) {}
}

export class RemoveActivityFailure implements Action {
  readonly type = ActionTypes.RemoveActivityFailure;

  constructor(public payload: { error: string }) {}
}

export type TimelineActions =
  | LoadActivities
  | LoadActivitiesSuccess
  | LoadActivitiesFailure
  | AddActivity
  | AddActivitySuccess
  | AddActivityFailure
  | RemoveActivity
  | RemoveActivitySuccess
  | RemoveActivityFailure;
