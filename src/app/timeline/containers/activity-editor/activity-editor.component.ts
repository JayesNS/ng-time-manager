import { OnInit, OnDestroy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { AddActivity, CloseActivityEditor, EditActivity } from '../../actions';
import { User, Activity, ActivityType } from 'src/app/models';
import { selectAuthUser } from 'src/app/auth/state';
import { MatDialogRef } from '@angular/material';

import { DateTime } from 'luxon';
import { selectCategories, selectActivityInEditor } from '../../state';
@Component({
  selector: 'app-activity-editor',
  templateUrl: './activity-editor.component.html',
  styleUrls: ['./activity-editor.component.sass']
})
export class ActivityEditorComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  user: User;
  activityTypes: string[] = Object.values(ActivityType);
  categories$: Observable<String[]>;
  editing = false;

  activityForm: FormGroup = new FormGroup({
    _id: new FormControl(undefined),
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
    }),
    description: new FormControl(''),
    category: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<ActivityEditorComponent>, private store: Store<any>) {}

  ngOnInit() {
    const user$ = this.store.select(selectAuthUser);
    this.userSub = user$.subscribe(user => (this.user = user));

    this.categories$ = this.store.select(selectCategories);

    this.store.select(selectActivityInEditor).subscribe(activity => {
      if (activity) {
        const startingAt = this.deserializeDatetime(activity.startingAt.toString());
        const endingAt = this.deserializeDatetime(activity.endingAt.toString());
        this.activityForm.patchValue({ ...activity, startingAt, endingAt });
        this.editing = true;
      }
    });
  }

  saveActivity() {
    if (this.user && this.activityForm.valid) {
      const activity: Activity = this.concatAllDates(this.activityForm.value);

      if (this.editing) {
        this.store.dispatch(new EditActivity({ activity }));
      } else {
        this.store.dispatch(
          new AddActivity({ user: this.user, activity: { ...activity, _id: undefined } })
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private concatAllDates(object: object): any {
    const entries: [string, any][] = Object.entries({ ...object });
    const result: any = {};
    for (let [k, v] of entries) {
      if (v && v.date && v.time) {
        v = new Date(this.serializeDatetime(v.date, v.time));
      }
      result[k] = v;
    }
    return result;
  }

  serializeDatetime(date: Date, time: string) {
    const [hour, minute] = time.split(':').map((val: any) => <number>val);
    return DateTime.fromJSDate(date)
      .startOf('day')
      .set({ hour, minute })
      .toString();
  }

  deserializeDatetime(datetime: string): { date: Date; time: string } {
    const value = DateTime.fromJSDate(new Date(datetime));
    return { date: value.startOf('day').toJSDate(), time: value.toFormat('HH:mm') };
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
