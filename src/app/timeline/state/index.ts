import * as fromTimeline from './activities.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { Activity } from 'src/app/models';
import { DateTime } from 'luxon';

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
    activities.filter(activity => {
      const target = DateTime.fromJSDate(props.date).startOf('day');
      const start = DateTime.fromJSDate(new Date(activity.startingAt)).startOf('day');
      return start.equals(target);
    })
);
