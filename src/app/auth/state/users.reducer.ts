import { User } from '../models';
import { UsersActions, ActionTypes } from '../actions/users.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function reducer(state: State = initialState, action: UsersActions) {
  switch (action.type) {
    case ActionTypes.LoadUserSuccess: {
      return { ...state, user: action.payload.user };
    }
    default: {
      return state;
    }
  }
}
