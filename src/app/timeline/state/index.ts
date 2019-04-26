import * as fromTimeline from './activities.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { Activity } from '../models';

export interface State {
  timeline: fromTimeline.State;
}

export const reducers: ActionReducerMap<State> = {
  timeline: fromTimeline.reducer
};

export const selectTimeline = (state: any) => state.timeline.timeline;
export const selectActivities = createSelector(
  selectTimeline,
  timeline => timeline.activities
);
export const selectTodaysActivities = createSelector(
  selectActivities,
  (activities: Activity[]) =>
    activities.filter(
      activity =>
        new Date(activity.startingAt).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    )
);
