import { TimelineActions, ActionTypes } from '../actions';
import { Activity } from 'src/app/models';

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
      return { ...state, pending: false };
    }
    case ActionTypes.RemoveActivitySuccess: {
      const activityToRemove = action.payload.activity;
      return {
        ...state,
        activities: state.activities.filter(activity => activity._id !== activityToRemove._id)
      };
    }
    case ActionTypes.RemoveActivityFailure: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
}

export const selectActivities = (state: State) => state.activities;
