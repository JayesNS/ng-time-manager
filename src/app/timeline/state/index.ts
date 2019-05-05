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
export const selectFilteredActivities = createSelector(
  selectActivities,
  (activities: Activity[], props: { date: Date; category?: string }) =>
    activities.filter(activity => {
      const target = DateTime.fromJSDate(props.date).startOf('day');
      const start = DateTime.fromJSDate(new Date(activity.startingAt)).startOf('day');
      return start.equals(target) && (props.category ? activity.category === props.category : true);
    })
);

export const selectCategories = createSelector(
  selectActivities,
  (activities: Activity[]) =>
    Array.from(
      activities.reduce(
        (set, activity) => (activity.category ? set.add(activity.category) : set),
        new Set<string>()
      )
    )
);
