import * as fromAuth from './auth.reducer';
import * as fromSignIn from './sign-in.reducer';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../models';

export interface State {
  auth: fromAuth.State;
  signInPage: fromSignIn.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  signInPage: fromSignIn.reducer
};

export const selectAuth = (state: any) => state.auth.auth;
export const selectAuthUser = createSelector(
  selectAuth,
  fromAuth.selectUser
);
export const selectIsLoggedIn = createSelector(
  selectAuthUser,
  (user: User) => !!user
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
