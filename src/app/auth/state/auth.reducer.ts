import { User } from '../models';
import { ActionTypes, AuthActions } from '../actions/auth.actions';

export interface State {
  user: User;
  token: string;
}

const initialState: State = {
  user: null,
  token: null
};

export function reducer(state: State = initialState, action: AuthActions): State {
  switch (action.type) {
    case ActionTypes.SignInSuccess: {
      return { ...state, token: action.payload.token, user: action.payload.user };
    }
    case ActionTypes.SignInFailure: {
      return initialState;
    }
    default:
      return state;
  }
}

export const selectUser = (state: State) => state.user;
