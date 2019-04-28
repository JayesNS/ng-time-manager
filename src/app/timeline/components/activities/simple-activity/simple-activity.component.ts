import { Component, OnInit } from '@angular/core';
import { ActivityComponent } from '../activity/activity.component';

@Component({
  selector: 'app-simple-activity',
  templateUrl: './simple-activity.component.html',
  styleUrls: ['./simple-activity.component.sass', '../activity/activity.component.sass']
})
export class SimpleActivityComponent extends ActivityComponent {}
