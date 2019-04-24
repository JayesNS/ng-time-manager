import { Activity } from '../models';
import { TimelineActions, ActionTypes } from '../actions';

export interface State {
  activities: Activity[];
  pending: boolean;
}

const initialState: State = {
  activities: [],
  pending: false
};

export function reducer(state: State = initialState, action: TimelineActions) {
  switch (action.type) {
    case ActionTypes.LoadActivitiesSuccess: {
      return { ...state, activities: action.payload.activities };
    }
    case ActionTypes.LoadActivitiesFailure: {
      return { ...state };
    }
    case ActionTypes.AddActivity: {
      return { ...state, pending: true };
    }
    case ActionTypes.AddActivitySuccess: {
      return {
        ...state,
        pending: false,
        activities: [...state.activities, action.payload.activity]
      };
    }
    case ActionTypes.AddActivityFailure: {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
}

export const selectActivities = (state: State) => state.activities;
