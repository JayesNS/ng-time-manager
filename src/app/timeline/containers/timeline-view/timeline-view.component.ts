import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Activity } from '../../models';
import * as fromStore from '../../state';
import { LoadActivities, AddActivity } from '../../actions';
import { User } from 'src/app/auth/models';
import { ActivitiesService } from '../../services/activities.service';
import { selectUsers } from 'src/app/auth/state';
import * as fromUsers from 'src/app/auth/state/users.reducer';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.sass']
})
export class TimelineViewComponent implements OnDestroy {
  readonly intervals = [5, 10, 15, 20, 30, 60, 120, 180];

  interval = 60;
  segmentHeight = 100;

  activities$: Observable<Activity[]>;
  user: User;
  private userSub: Subscription;

  constructor(private store: Store<fromUsers.State>) {
    this.userSub = this.store.select(selectUsers).subscribe(users => {
      this.user = users.user;
      console.log(this.user);
      if (this.user) {
        this.store.dispatch(new LoadActivities({ user: this.user }));
      }
    });
    this.activities$ = this.store.select(fromStore.selectTodaysActivities);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
