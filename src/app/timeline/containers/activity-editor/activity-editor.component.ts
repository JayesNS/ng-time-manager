import { OnInit, OnDestroy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AddActivity } from '../../actions';
import { User, Activity, ActivityType } from 'src/app/models';
import { selectAuthUser } from 'src/app/auth/state';
import { MatDialogRef } from '@angular/material';

import { DateTime } from 'luxon';
@Component({
  selector: 'app-activity-editor',
  templateUrl: './activity-editor.component.html',
  styleUrls: ['./activity-editor.component.sass']
})
export class ActivityEditorComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  user: User;
  activityTypes: string[] = Object.values(ActivityType);

  activityForm: FormGroup = new FormGroup({
    type: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    startingAt: new FormGroup({
      date: new FormControl(new Date(), [Validators.required]),
      time: new FormControl(DateTime.local().toFormat('HH:mm'), [Validators.required])
    }),
    endingAt: new FormGroup({
      date: new FormControl(new Date(), [Validators.required]),
      time: new FormControl(
        DateTime.local()
          .plus({ minutes: 10 })
          .toFormat('HH:mm'),
        [Validators.required]
      )
    })
  });

  constructor(public dialogRef: MatDialogRef<ActivityEditorComponent>, private store: Store<any>) {
    const user$ = this.store.select(selectAuthUser);
    this.userSub = user$.subscribe(user => (this.user = user));
  }

  ngOnInit() {}

  onSubmit() {
    if (this.user && this.activityForm.valid) {
      const activity: Activity = this.concatAllDates(this.activityForm.value);
      this.store.dispatch(new AddActivity({ user: this.user, activity }));
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private concatAllDates(object: object): any {
    const entries: [string, any][] = Object.entries({ ...object });
    const result: any = {};
    for (let [k, v] of entries) {
      if (v.date && v.time) {
        const { date, time }: { date: Date; time: string } = v;
        const [hour, minute] = time.split(':').map(num => parseInt(num, 10));
        const datetime = DateTime.fromMillis(date.getTime()).set({ hour, minute });
        v = new Date(datetime.toMillis());
      }
      result[k] = v;
    }
    return result;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
