import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Activity } from 'src/app/models';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.sass']
})
export class ActivityDetailsComponent implements OnInit {
  activity: Activity;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { activity: Activity }) {
    this.activity = this.data.activity;
  }

  ngOnInit() {}
}
