import { Action } from '@ngrx/store';
import { Credentials, User } from '../models';

export enum ActionTypes {
  SignIn = '[Sign In Page] Sign in',
  SignInSuccess = '[Auth API] Sign in success',
  SignInFailure = '[Auth API] Sign in failure'
}

export class SignIn implements Action {
  readonly type = ActionTypes.SignIn;

  constructor(public payload: Credentials) {}
}

export class SignInSuccess implements Action {
  readonly type = ActionTypes.SignInSuccess;

  constructor(public payload: { token: string; user: User }) {}
}

export class SignInFailure implements Action {
  readonly type = ActionTypes.SignInFailure;

  constructor(public payload: { error: string }) {}
}

export type AuthActions = SignIn | SignInSuccess | SignInFailure;
