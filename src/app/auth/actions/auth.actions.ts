import { Action } from '@ngrx/store';
import { SignInCredentials, SignUpCredentials } from '../models';

export enum ActionTypes {
  SignIn = '[Sign In Page] Sign in',
  SignInSuccess = '[Auth API] Sign in success',
  SignInFailure = '[Auth API] Sign in failure',

  SignUp = '[Sign Up Page] Sign up',
  SignUpSuccess = '[Auth API] Sign up success',
  SignUpFailure = '[Auth API] Sign up failure'
}

export class SignIn implements Action {
  readonly type = ActionTypes.SignIn;

  constructor(public payload: { credentials: SignInCredentials }) {}
}

export class SignInSuccess implements Action {
  readonly type = ActionTypes.SignInSuccess;

  constructor(public payload: { token: string }) {}
}

export class SignInFailure implements Action {
  readonly type = ActionTypes.SignInFailure;

  constructor(public payload: { error: string }) {}
}

export class SignUp implements Action {
  readonly type = ActionTypes.SignUp;

  constructor(public payload: { credentials: SignUpCredentials }) {}
}

export class SignUpSuccess implements Action {
  readonly type = ActionTypes.SignUpSuccess;
}

export class SignUpFailure implements Action {
  readonly type = ActionTypes.SignUpFailure;

  constructor(public payload: { error: string }) {}
}

export type AuthActions =
  | SignIn
  | SignInSuccess
  | SignInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure;
