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
    activities
      .filter(activity => {
        const targetDay = DateTime.fromJSDate(props.date).startOf('day');
        const startingDay = DateTime.fromJSDate(new Date(activity.startingAt)).startOf('day');
        const endingDay = DateTime.fromJSDate(new Date(activity.endingAt)).startOf('day');
        return (
          (startingDay.equals(targetDay) || endingDay.equals(targetDay)) &&
          (props.category ? activity.category === props.category : true)
        );
      })
      .map(activity => trimActivityTime(activity, props.date))
);

function trimActivityTime(activity, date) {
  const target = DateTime.fromJSDate(date);
  let startingAt = DateTime.fromJSDate(new Date(activity.startingAt));
  let endingAt = DateTime.fromJSDate(new Date(activity.endingAt));
  if (startingAt.startOf('day') <= target && endingAt.startOf('day') >= target) {
    startingAt = startingAt < target.startOf('day') ? target.startOf('day') : startingAt;
    endingAt = endingAt > target.endOf('day') ? target.endOf('day') : endingAt;
    return { ...activity, startingAt: startingAt.toJSDate(), endingAt: endingAt.toJSDate() };
  }
  return activity;
}

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
