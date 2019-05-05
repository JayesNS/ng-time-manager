import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from '../../state';
import { LoadActivities } from '../../actions';
import { User, Activity } from 'src/app/models';
import * as fromAuth from '../../../auth/state';
import { MatDialog, MatDatepickerInputEvent, MatSelectChange } from '@angular/material';
import { ActivityEditorComponent } from '../activity-editor/activity-editor.component';
import { Duration, DateTime } from 'luxon';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.sass']
})
export class TimelineViewComponent implements OnDestroy {
  readonly intervals = [5, 10, 15, 20, 30, 60, 120, 180];
  readonly zooms = [0.25, 0.5, 1, 2, 4];

  interval = Duration.fromObject({ minutes: 60 });
  zoom = 1;
  segmentHeight = 200;
  category = '';
  date = DateTime.local();

  activities$: Observable<Activity[]>;
  categories$: Observable<string[]>;
  private userSub: Subscription;

  constructor(private store: Store<fromAuth.State>, private dialog: MatDialog) {
    this.userSub = this.store.select(fromAuth.selectAuthUser).subscribe(user => {
      if (user) {
        this.store.dispatch(new LoadActivities({ user }));
      }
    });
    this.categories$ = this.store.select(fromStore.selectCategories);
    this.updateActivities();
  }

  changeInterval(event: MatSelectChange) {
    this.interval = Duration.fromObject({ minutes: event.value });
  }
  changeZoom(event: MatSelectChange) {
    this.zoom = event.value;
  }
  changeCategory(event: MatSelectChange) {
    this.category = event.value;
    this.updateActivities();
  }
  changeDate(event: MatDatepickerInputEvent<Date>) {
    this.date = DateTime.fromJSDate(event.value);
    this.updateActivities();
  }

  updateActivities() {
    this.activities$ = this.store.select(fromStore.selectFilteredActivities, {
      date: this.date.toJSDate(),
      category: this.category
    });
  }

  openEditor() {
    this.dialog.open(ActivityEditorComponent);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
