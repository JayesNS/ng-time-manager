import { Component, OnInit, Input } from '@angular/core';
import { ActivityComponent } from '../activity/activity.component';

@Component({
  selector: 'app-todo-activity',
  templateUrl: './todo-activity.component.html',
  styleUrls: ['./todo-activity.component.sass', '../activity/activity.component.sass']
})
export class TodoActivityComponent extends ActivityComponent {}
