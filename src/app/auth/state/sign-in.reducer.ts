import { AuthActions, ActionTypes } from '../actions/auth.actions';

export interface State {
  pending: boolean;
  error: string;
}

const initialState: State = {
  pending: false,
  error: null
};

export function reducer(state: State = initialState, action: AuthActions): State {
  switch (action.type) {
    case ActionTypes.SignIn: {
      return { ...state, pending: true };
    }
    case ActionTypes.SignInSuccess: {
      return initialState;
    }
    case ActionTypes.SignInFailure: {
      return { ...state, pending: false, error: action.payload.error };
    }
    default: {
      return state;
    }
  }
}

export const selectPending = (state: State) => state.pending;
export const selectError = (state: State) => state.error;
