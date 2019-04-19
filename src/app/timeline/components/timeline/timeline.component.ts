import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  OnChanges,
  AfterViewInit,
  Input,
  OnInit
} from '@angular/core';

import { Activity } from '../../models';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass']
})
export class TimelineComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() interval = 60;
  @Input() segmentHeight = 100;
  @Input() activities: Activity[];

  currentHour: number;

  @ViewChild('container') container: ElementRef;
  @ViewChild('timeIndicator') timeIndicator: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    setInterval(() => this.moveTimeIndicatorToNow(), 1000);
  }

  // TODO: scrollToNow not working when segmentHeight changes
  ngAfterViewInit(): void {
    this.scrollToNow();
    this.moveTimeIndicatorToNow();
  }
  ngOnChanges(): void {
    this.scrollToNow();
    this.moveTimeIndicatorToNow();
  }

  setCurrentHour() {
    const date = new Date();
    const minutes = Math.round(date.getMinutes() / this.interval) * this.interval;
    const hour = date.getHours() + minutes / 60;
    return hour;
  }

  moveTimeIndicatorToNow() {
    const date = new Date();
    const hour = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
    const position = hour * this.segmentHeight * (60 / this.interval) + 'px';
    tick(() => this.renderer.setStyle(this.timeIndicator.nativeElement, 'top', position));
  }

  scrollToNow() {
    this.currentHour = this.setCurrentHour();
    this.scrollTo(this.currentHour * this.segmentHeight * (60 / this.interval));
  }
  scrollTo(scrollTo: number) {
    tick(() => this.renderer.setProperty(this.container.nativeElement, 'scrollTop', scrollTo));
  }
}

function tick(func: Function) {
  setTimeout(func, 0);
}
