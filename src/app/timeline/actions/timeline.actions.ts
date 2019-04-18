import { Action } from '@ngrx/store';

export enum ActionTypes {
  LoadActivities = '[Timeline Page] Load actions'
}

export class LoadActivities implements Action {
  readonly type = ActionTypes.LoadActivities;
}

export type TimelineActions = LoadActivities;
