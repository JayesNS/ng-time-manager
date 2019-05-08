import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material';
import { Activity } from 'src/app/models';
import { Store } from '@ngrx/store';
import { RemoveActivity, OpenActivityEditor } from '../../actions';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.sass']
})
export class ActivityDetailsComponent implements OnInit {
  activity: Activity;

  constructor(
    private store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public data: { activity: Activity },
    private dialog: MatDialog
  ) {
    this.activity = this.data.activity;
  }

  removeActivity() {
    this.store.dispatch(new RemoveActivity({ activity: this.activity }));
    this.dialog.getDialogById('ActivityDetails').close();
  }

  editActivity() {
    this.store.dispatch(new OpenActivityEditor({ activity: this.activity }));
  }

  ngOnInit() {}
}
