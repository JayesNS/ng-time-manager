import * as fromAuth from './auth.reducer';
import * as fromSignIn from './sign-in.reducer';
import * as fromSignUp from './sign-up.reducer';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../../models';

export interface State {
  auth: fromAuth.State;
  signInPage: fromSignIn.State;
  signUpPage: fromSignUp.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  signInPage: fromSignIn.reducer,
  signUpPage: fromSignUp.reducer
};

export const select = createFeatureSelector('auth');

export const selectAuth = createSelector(
  select,
  (state: State) => state.auth
);
export const selectAuthUser = createSelector(
  selectAuth,
  fromAuth.selectUser
);
export const selectIsLoggedIn = createSelector(
  selectAuthUser,
  (user: User) => {
    console.log({ user });
    return !!user;
  }
);

export const selectSignInPage = createSelector(
  select,
  (state: State) => state.signInPage
);
export const selectSignInPageError = createSelector(
  selectSignInPage,
  fromSignIn.selectError
);
export const selectSignInPagePending = createSelector(
  selectSignInPage,
  fromSignIn.selectPending
);

export const selectSignUpPage = createSelector(
  select,
  (state: State) => state.signUpPage
);
export const selectSignUpPageError = createSelector(
  selectSignUpPage,
  fromSignUp.selectError
);
export const selectSignUpPagePending = createSelector(
  selectSignUpPage,
  fromSignUp.selectPending
);
