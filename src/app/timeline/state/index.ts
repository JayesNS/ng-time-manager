import * as fromTimeline from './activities.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { Activity } from 'src/app/models';

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
export const selectActivitiesForDate = createSelector(
  selectActivities,
  (activities: Activity[], props: { date: Date }) =>
    activities.filter(
      activity =>
        new Date(activity.startingAt).setHours(0, 0, 0, 0) ===
        new Date(props.date).setHours(0, 0, 0, 0)
    )
);
