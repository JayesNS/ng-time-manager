import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Activity } from '../../models';

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.sass']
})
export class TimelineViewComponent implements OnInit, AfterViewInit {
  readonly intervals = [5, 10, 15, 20, 30, 60, 120, 180];

  interval = 60;
  segmentHeight = 100;

  @ViewChild('container') container: ElementRef;

  activities: Activity[] = [
    {
      type: 'todo',
      title: 'Shopping',
      startingAt: new Date(2019, 3, 11, 13, 45),
      endingAt: new Date(2019, 3, 11, 14, 30)
    },
    {
      type: 'todo',
      title: 'Cleaning',
      startingAt: new Date(2019, 3, 11, 7, 45),
      endingAt: new Date(2019, 3, 11, 9, 0)
    }
  ];

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.scrollToCurrentHour();
  }

  scrollToCurrentHour() {
    const hour = new Date().getHours();
    const scroll = hour * this.segmentHeight;
    this.renderer.setProperty(this.container.nativeElement, 'scrollTop', scroll);
  }
}
