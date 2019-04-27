import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AddActivity } from '../../actions';
import { User, Activity } from 'src/app/models';
import { selectAuthUser } from 'src/app/auth/state';

@Component({
  selector: 'app-activity-editor',
  templateUrl: './activity-editor.component.html',
  styleUrls: ['./activity-editor.component.sass']
})
export class ActivityEditorComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  user: User;

  activityForm: FormGroup = new FormGroup({
    type: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    startingAt: new FormGroup({
      date: new FormControl(new Date(), [Validators.required]),
      time: new FormControl(new Date(), [Validators.required])
    }),
    endingAt: new FormGroup({
      date: new FormControl(new Date(), [Validators.required]),
      time: new FormControl(new Date(), [Validators.required])
    })
  });

  constructor(private store: Store<any>) {
    const user$ = this.store.select(selectAuthUser);
    this.userSub = user$.subscribe(user => (this.user = user));
  }

  ngOnInit() {}

  onSubmit() {
    if (this.user && this.activityForm.valid) {
      const activity: Activity = this.concatAllDates(this.activityForm.value);
      console.log(JSON.parse(JSON.stringify(activity)));
      this.store.dispatch(new AddActivity({ user: this.user, activity }));
    }
  }

  private concatAllDates(object: object): any {
    const entries: [string, any][] = Object.entries({ ...object });
    const result: any = {};
    for (let [k, v] of entries) {
      if (v.date && v.time) {
        const { date, time } = v;
        v = new Date(date + 'T' + time);
      }
      result[k] = v;
    }
    return result;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
