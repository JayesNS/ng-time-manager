import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from '../../state';
import { LoadActivities } from '../../actions';
import { User, Activity } from 'src/app/models';
import * as fromAuth from '../../../auth/state';
import { MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { ActivityEditorComponent } from '../activity-editor/activity-editor.component';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.sass']
})
export class TimelineViewComponent implements OnDestroy {
  readonly intervals = [5, 10, 15, 20, 30, 60, 120, 180];

  interval = 60;
  segmentHeight = 200;
  date: Date = new Date();

  activities$: Observable<Activity[]>;
  user: User;
  private userSub: Subscription;

  constructor(private store: Store<fromAuth.State>, private dialog: MatDialog) {
    this.userSub = this.store.select(fromAuth.selectAuthUser).subscribe(user => {
      this.user = user;
      if (this.user) {
        this.store.dispatch(new LoadActivities({ user: this.user }));
      }
    });
    this.activities$ = this.store.select(fromStore.selectActivitiesForDate, { date: this.date });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
    this.activities$ = this.store.select(fromStore.selectActivitiesForDate, { date: this.date });
  }

  openEditor() {
    this.dialog.open(ActivityEditorComponent, {
      height: '400px',
      width: '600px'
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
