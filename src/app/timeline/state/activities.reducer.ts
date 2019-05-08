import { TimelineActions, ActionTypes } from '../actions';
import { Activity } from 'src/app/models';

export interface State {
  activities: Activity[];
  pending: boolean;
  activityInEditor: Activity;
}

const initialState: State = {
  activities: [],
  pending: false,
  activityInEditor: null
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
        activities: [...state.activities, action.payload.activity]
      };
    }
    case ActionTypes.EditActivitySuccess: {
      const editedActivity = action.payload.activity;
      const activities = state.activities.map(activity =>
        activity._id === editedActivity._id ? editedActivity : activity
      );
      return {
        ...state,
        activities
      };
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
    case ActionTypes.OpenActivityEditor: {
      const activity = action.payload ? action.payload.activity : null;
      return { ...state, activityInEditor: activity };
    }
    case ActionTypes.CloseActivityEditor: {
      return { ...state, activityInEditor: null };
    }
    default: {
      return state;
    }
  }
}

export const selectActivities = (state: State) => state.activities;
export const selectActivityInEditor = (state: State) => state.activityInEditor;
