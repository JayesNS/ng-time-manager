import { Activity } from '../models';
import { TimelineActions, ActionTypes } from '../actions';
import { createSelector } from '@ngrx/store';

export interface State {
  activities: Activity[];
}

// TODO: mock activities
const mockActivities: Activity[] = [
  {
    type: 'todo',
    title: 'Shopping',
    startingAt: new Date(2019, 3, 18, 13, 45),
    endingAt: new Date(2019, 3, 18, 14, 30)
  },
  {
    type: 'todo',
    title: 'Cleaning',
    startingAt: new Date(2019, 3, 16, 7, 45),
    endingAt: new Date(2019, 3, 16, 9, 0)
  }
];

const initialState: State = {
  activities: []
};

export function reducer(state: State = initialState, action: TimelineActions) {
  switch (action.type) {
    case ActionTypes.LoadActivities:
      return { ...state, activities: mockActivities };
    default: {
      return state;
    }
  }
}

export const selectActivities = (state: State) => state.activities;
