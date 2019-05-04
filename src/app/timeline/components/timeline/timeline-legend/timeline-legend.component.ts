import { Component, OnInit, Input, OnChanges, ElementRef, Renderer2 } from '@angular/core';

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
  @Input() interval: number;

  markings: Date[];

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  calcHour(marking: number): Date {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    return new Date(
      currentDate + marking * this._millisecondsInSecond * this._secondsInMinute * this.interval
    );
  }

  ngOnInit() {}
  ngOnChanges() {
    const markingAmount = this._hoursInDay * (this._minutesInHour / this.interval);

    this.markings = new Array(Math.round(markingAmount));

    Array.from(this.elRef.nativeElement.children).forEach(element =>
      this.renderer.setStyle(element, 'height', this.segmentHeight + 'px')
    );
  }
}
