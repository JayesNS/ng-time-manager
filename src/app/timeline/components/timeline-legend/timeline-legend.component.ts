import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-timeline-legend',
  templateUrl: './timeline-legend.component.html',
  styleUrls: ['./timeline-legend.component.sass']
})
export class TimelineLegendComponent implements OnInit, OnChanges {
  readonly hoursInDay = 24;

  @Input() segmentHeight: number;
  @Input() interval: number;

  markings: Date[];

  constructor() {
    this.segmentHeight = 100;
    this.interval = 30;
  }

  calcHour(marking: number): Date {
    const currentTime = new Date();
    const currentDate = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate()
    );
    return new Date(currentDate.getTime() + marking * 1000 * 60 * this.interval);
  }

  ngOnInit() {}
  ngOnChanges() {
    const markingAmount = this.hoursInDay * (60 / this.interval);

    if (markingAmount % 1 !== 0) {
      return;
    }

    this.markings = new Array(markingAmount);
  }
}
