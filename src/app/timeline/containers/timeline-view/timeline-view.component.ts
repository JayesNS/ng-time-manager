import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Activity } from '../../models';
import * as fromStore from '../../state';
import { LoadActivities } from '../../actions';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.sass']
})
export class TimelineViewComponent {
  readonly intervals = [5, 10, 15, 20, 30, 60, 120, 180];

  interval = 60;
  segmentHeight = 100;

  activities$: Observable<Activity[]>;

  constructor(private store: Store<fromStore.State>) {
    this.store.dispatch(new LoadActivities());

    this.activities$ = this.store.select(fromStore.selectTodaysActivities);
  }
}
