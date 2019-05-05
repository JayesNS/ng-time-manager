import { Component, OnInit, Input, OnChanges, ElementRef, Renderer2 } from '@angular/core';
import { Duration, DateTime } from 'luxon';

@Component({
  selector: 'app-timeline-legend',
  templateUrl: './timeline-legend.component.html',
  styleUrls: ['./timeline-legend.component.sass']
})
export class TimelineLegendComponent implements OnInit, OnChanges {
  private readonly _hoursInDay = 24;
  private readonly _millisecondsInSecond = 1000;
  private readonly _secondsInMinute = 60;
  private readonly _minutesInHour = 60;

  @Input() segmentHeight: number;
  @Input() interval: Duration;

  markings: Date[];

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  calcHour(marking: number): Date {
    const currentDate = DateTime.local().startOf('day');
    const minuteOfDay = marking * this.interval.as('minutes');
    return currentDate.plus({ minutes: minuteOfDay }).toJSDate();
  }

  ngOnInit() {}
  ngOnChanges() {
    this.markings = [];
    const markingAmount = 24 / this.interval.as('hours');
    for (let i = 0; i < markingAmount; i++) {
      this.markings.push(this.calcHour(i));
    }
  }
}
