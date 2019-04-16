import { Component } from '@angular/core';
import { Activity } from '../../models';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.sass']
})
export class TimelineViewComponent {
  readonly intervals = [5, 10, 15, 20, 30, 60, 120, 180];

  interval = 60;
  segmentHeight = 100;

  activities: Activity[] = [
    {
      type: 'todo',
      title: 'Shopping',
      startingAt: new Date(2019, 3, 16, 13, 45),
      endingAt: new Date(2019, 3, 16, 14, 30)
    },
    {
      type: 'todo',
      title: 'Cleaning',
      startingAt: new Date(2019, 3, 16, 7, 45),
      endingAt: new Date(2019, 3, 16, 9, 0)
    }
  ];
}
