import { ActionTypes, Actions } from './auth.actions';
import { AuthState } from './auth.state';
import * as _ from 'lodash';
import { createFeatureSelector } from '@ngrx/store';

const initialState: AuthState = {
  user: null,
  authStatus: { msg: '', success: false, token: null }
};

export function reducer(state: AuthState = initialState, action: Actions) {
  switch (action.type) {
    case ActionTypes.SIGN_IN_USER: {
      return state;
    }
    case ActionTypes.SUCCESSFUL_SIGN_IN: {
      console.log('User authenticated');
      return { ...state, authStatus: action.payload };
    }
    case ActionTypes.FAILED_SIGN_IN: {
      console.log('User not authenicated');
      return { ...state, authStatus: action.payload };
    }
    default:
      return state;
  }
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');
