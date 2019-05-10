import { OnInit, OnDestroy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { AddActivity, CloseActivityEditor, EditActivity } from '../../actions';
import { User, Activity, ActivityType } from 'src/app/models';
import { selectAuthUser } from 'src/app/auth/state';
import { MatDialogRef, MatSelectChange } from '@angular/material';

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
  activityType: ActivityType = null;

  activityForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ActivityEditorComponent>, private store: Store<any>) {}

  ngOnInit() {
    const user$ = this.store.select(selectAuthUser);
    this.userSub = user$.subscribe(user => (this.user = user));

    this.categories$ = this.store.select(selectCategories);

    this.store.select(selectActivityInEditor).subscribe(activity => {
      this.activityType = activity ? activity.type : null;
      this.activityForm = this.setActivityForm(activity);
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

  onTypeChange(event: MatSelectChange) {
    this.activityType = event.value;
    this.activityForm.get('todoList').reset();
    this.activityForm.get('description').reset();
  }

  private setActivityForm(activity?: Activity) {
    if (!activity) {
      activity = {
        _id: undefined,
        title: '',
        type: ActivityType.TODO,
        startingAt: new Date(),
        endingAt: DateTime.fromJSDate(new Date())
          .plus({ minutes: 10 })
          .toJSDate(),
        todoList: { todos: [] },
        category: '',
        description: ''
      };
    }
    const startingAt = this.deserializeDatetime(activity.startingAt.toString());
    const endingAt = this.deserializeDatetime(activity.endingAt.toString());
    return new FormGroup({
      _id: new FormControl(activity._id),
      type: new FormControl(activity.type, Validators.required),
      title: new FormControl(activity.title, Validators.required),
      startingAt: new FormGroup({
        date: new FormControl(startingAt.date, [Validators.required]),
        time: new FormControl(startingAt.time, [Validators.required])
      }),
      endingAt: new FormGroup({
        date: new FormControl(endingAt.date, [Validators.required]),
        time: new FormControl(endingAt.time, [Validators.required])
      }),
      description: new FormControl(activity.description),
      todoList: new FormGroup({
        todos: new FormArray(
          activity.todoList.todos.map(
            todo =>
              new FormGroup({
                title: new FormControl(todo.title),
                completed: new FormControl(todo.completed)
              })
          )
        )
      }),
      category: new FormControl(activity.category)
    });
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
