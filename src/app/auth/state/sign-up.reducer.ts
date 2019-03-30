import { AuthActions, ActionTypes } from '../actions/auth.actions';

export interface State {
  pending: boolean;
  error: string;
}

const initialState: State = {
  pending: false,
  error: null
};

export function reducer(state: State = initialState, action: AuthActions) {
  switch (action.type) {
    case ActionTypes.SignUp: {
      return { ...state, pending: true };
    }
    case ActionTypes.SignUpSuccess: {
      return initialState;
    }
    case ActionTypes.SignUpFailure: {
      return { ...state, pending: false, error: action.payload.error };
    }
    default: {
      return initialState;
    }
  }
}

export const selectPending = (state: State) => state.pending;
export const selectError = (state: State) => state.error;
