import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../models';

@Component({
  selector: 'app-activities-timeline',
  templateUrl: './activities-timeline.component.html',
  styleUrls: ['./activities-timeline.component.sass']
})
export class ActivitiesTimelineComponent implements OnInit {
  @Input() interval: number;
  @Input() segmentHeight: number;
  @Input() activities: Activity[];

  constructor() {}

  ngOnInit() {}
}
