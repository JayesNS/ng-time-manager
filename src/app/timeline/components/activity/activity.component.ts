import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.sass']
})
export class ActivityComponent implements OnInit, OnChanges {
  @Input() activity: any;
  @Input() segmentHeight: number;
  @Input() interval: number;

  activityHeight: number;
  startPosition: number;

  constructor() {}

  ngOnInit() {}
  ngOnChanges() {
    this.activityHeight = this.calcHeight();
    this.startPosition = this.calcStartPosition();
  }

  calcStartPosition() {
    const currentTime = new Date();
    const currentDate: any = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate()
    );
    const startTime = this.activity.startingAt;
    const millisecondsInDay = startTime - currentDate;
    return Math.round((millisecondsInDay / 1000 / 60) * (this.segmentHeight / this.interval));
  }

  calcHeight() {
    const timeDifference = this.activity.endingAt - this.activity.startingAt;
    const lengthInMinutes = timeDifference / 60 / 1000;
    return Math.round(lengthInMinutes * (this.segmentHeight / this.interval));
  }
}
