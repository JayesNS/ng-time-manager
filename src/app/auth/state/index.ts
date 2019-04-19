import * as fromAuth from './auth.reducer';
import * as fromSignIn from './sign-in.reducer';
import * as fromSignUp from './sign-up.reducer';
import * as fromUsers from './users.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';

export interface State {
  auth: fromAuth.State;
  signInPage: fromSignIn.State;
  signUpPage: fromSignUp.State;
  users: fromUsers.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  signInPage: fromSignIn.reducer,
  signUpPage: fromSignUp.reducer,
  users: fromUsers.reducer
};

export const selectAuth = (state: any) => state.auth.auth;
export const selectAuthUser = createSelector(
  selectAuth,
  fromAuth.selectUser
);
export const selectIsLoggedIn = createSelector(
  selectAuth,
  (state: fromAuth.State) => !!state.firebaseUser
);

export const selectSignInPage = (state: any) => state.auth.signInPage;
export const selectSignInPageError = createSelector(
  selectSignInPage,
  fromSignIn.selectError
);
export const selectSignInPagePending = createSelector(
  selectSignInPage,
  fromSignIn.selectPending
);

export const selectSignUpPage = (state: any) => state.auth.signUpPage;
export const selectSignUpPageError = createSelector(
  selectSignUpPage,
  fromSignUp.selectError
);
export const selectSignUpPagePending = createSelector(
  selectSignUpPage,
  fromSignUp.selectPending
);
