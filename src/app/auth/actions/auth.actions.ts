import { Action } from '@ngrx/store';
import { SignInCredentials, SignUpCredentials } from '../models';

export enum ActionTypes {
  SignIn = '[Sign In Page] Sign in',
  SignInWithGoogle = '[Sign In Page] Sign in with Google',
  SignInSuccess = '[Auth API] Sign in success',
  SignInFailure = '[Auth API] Sign in failure',

  LogOut = '[Auth] Log out',

  SignUp = '[Sign Up Page] Sign up',
  SignUpSuccess = '[Auth API] Sign up success',
  SignUpFailure = '[Auth API] Sign up failure'
}

export class SignIn implements Action {
  readonly type = ActionTypes.SignIn;

  constructor(public payload: { credentials: SignInCredentials }) {}
}

export class SignInWithGoogle implements Action {
  readonly type = ActionTypes.SignInWithGoogle;
}

export class SignInSuccess implements Action {
  readonly type = ActionTypes.SignInSuccess;

  constructor(public payload: { user: firebase.User }) {}
}

export class SignInFailure implements Action {
  readonly type = ActionTypes.SignInFailure;

  constructor(public payload: { error: string }) {}
}

export class LogOut implements Action {
  readonly type = ActionTypes.LogOut;
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
  | SignInWithGoogle
  | SignInSuccess
  | SignInFailure
  | LogOut
  | SignUp
  | SignUpSuccess
  | SignUpFailure;
