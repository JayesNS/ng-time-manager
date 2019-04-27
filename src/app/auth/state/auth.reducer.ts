import { ActionTypes, AuthActions } from '../actions/auth.actions';
import { User } from '../../models';

export interface State {
  firebaseUser: firebase.User;
  user: User;
}

const initialState: State = {
  firebaseUser: null,
  user: null
};

export function reducer(state: State = initialState, action: AuthActions): State {
  switch (action.type) {
    case ActionTypes.LoadUserSuccess: {
      return { ...state, user: action.payload.user };
    }
    case ActionTypes.SignInSuccess: {
      return { ...state, firebaseUser: action.payload.firebaseUser };
    }
    case ActionTypes.SignInFailure: {
      return initialState;
    }
    case ActionTypes.LogOut: {
      return initialState;
    }
    default:
      return state;
  }
}

export const selectFirebaseUser = (state: State) => state.firebaseUser;
export const selectUser = (state: State) => state.user;
