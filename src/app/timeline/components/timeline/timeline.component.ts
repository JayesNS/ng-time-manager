import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  OnChanges,
  Input,
  OnInit
} from '@angular/core';
import { Activity } from 'src/app/models';
import { Duration, DateTime } from 'luxon';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass']
})
export class TimelineComponent implements OnInit, OnChanges {
  @Input() interval: Duration;
  @Input() segmentHeight;
  @Input() activities: Activity[];

  currentDate = DateTime.local();

  @ViewChild('timeIndicator') timeIndicator: ElementRef;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    setInterval(() => this.moveTimeIndicatorToNow(), 1000);
  }

  ngOnChanges(): void {
    this.scrollToNow();
    this.moveTimeIndicatorToNow();
  }

  setCurrentHour() {
    return this.currentDate.hour;
  }

  moveTimeIndicatorToNow() {
    const date = DateTime.local().startOf('day');
    const time = Math.abs(date.diffNow('hours').hours);
    const position = time * this.segmentHeight * (1 / this.interval.as('hours')) + 'px';
    tick(() => this.renderer.setStyle(this.timeIndicator.nativeElement, 'top', position));
  }

  scrollToNow() {
    const startOfDay = DateTime.local().startOf('day');
    const hourOfDay = Math.abs(startOfDay.diffNow('hours').hours);
    const halfOfTimelineHeight = this.elRef.nativeElement.offsetHeight / 2;
    const scrollTo =
      hourOfDay * this.segmentHeight * (1 / this.interval.as('hours')) - halfOfTimelineHeight;
    this.scrollTo(scrollTo);
  }
  scrollTo(scrollTo: number) {
    tick(() => {
      this.renderer.setProperty(this.elRef.nativeElement, 'scrollTop', scrollTo);
    });
  }
}

function tick(func: Function) {
  setTimeout(func, 0);
}
