import { Action } from '@ngrx/store';
import { User } from '../models';

export enum ActionTypes {
  LoadUser = '[User] Load user',
  LoadUserSuccess = '[User API] Load user success',
  LoadUserFailure = '[User API] Load user failure'
}

export class LoadUser implements Action {
  readonly type = ActionTypes.LoadUser;

  constructor(public payload: { firebaseUid: string }) {}
}

export class LoadUserSuccess implements Action {
  readonly type = ActionTypes.LoadUserSuccess;

  constructor(public payload: { user: User }) {}
}

export type UsersActions = LoadUser | LoadUserSuccess;
