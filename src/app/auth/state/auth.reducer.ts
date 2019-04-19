import { ActionTypes, AuthActions } from '../actions/auth.actions';

export interface State {
  firebaseUser: firebase.User;
}

const initialState: State = {
  firebaseUser: null
};

export function reducer(state: State = initialState, action: AuthActions): State {
  switch (action.type) {
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

export const selectUser = (state: State) => state.firebaseUser;
