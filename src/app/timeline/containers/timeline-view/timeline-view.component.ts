import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.sass']
})
export class TimelineViewComponent implements OnInit {
  interval = 10;
  segmentHeight = 100;

  activities: any[] = [
    {
      type: 'todo',
      title: 'Shopping',
      startingAt: new Date(2019, 3, 8, 13, 45),
      endingAt: new Date(2019, 3, 8, 14, 30)
    },
    {
      type: 'todo',
      title: 'Cleaning',
      startingAt: new Date(2019, 3, 8, 7, 45),
      endingAt: new Date(2019, 3, 8, 9, 0)
    }
  ];

  constructor() {}

  ngOnInit() {}
}
