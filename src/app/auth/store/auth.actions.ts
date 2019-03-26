import { Action } from '@ngrx/store';
import { User, AuthResponse } from '../models';

export enum ActionTypes {
  SIGN_IN_USER = '[Auth] Sign in user',
  SUCCESSFUL_SIGN_IN = '[Auth] Successful sign in',
  FAILED_SIGN_IN = '[Auth] Failed sign in'
}

export class SignInUser implements Action {
  readonly type = ActionTypes.SIGN_IN_USER;

  constructor(public payload: User) {}
}

export class SuccessfulSignIn implements Action {
  readonly type = ActionTypes.SUCCESSFUL_SIGN_IN;

  constructor(public payload: AuthResponse) {}
}

export class FailedSignIn implements Action {
  readonly type = ActionTypes.FAILED_SIGN_IN;

  constructor(public payload: AuthResponse) {}
}

export type Actions = SignInUser | SuccessfulSignIn | FailedSignIn;
