import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  Type
} from '@angular/core';

import { Activity, ActivityType } from 'src/app/models';
import { ActivityComponent } from '../../activities/activity/activity.component';
import { ComponentFactory } from '@angular/core/src/render3';

@Component({
  selector: 'app-activities-timeline',
  templateUrl: './activities-timeline.component.html',
  styleUrls: ['./activities-timeline.component.sass']
})
export class ActivitiesTimelineComponent implements OnInit, OnChanges {
  @Input() interval: number;
  @Input() segmentHeight: number;
  @Input() activities: Activity[];

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnChanges() {
    this.updateActivities();
  }

  updateActivities() {
    this.container.clear();

    this.activities.forEach(activity => {
      let factory = this.componentFactoryResolver.resolveComponentFactory(ActivityComponent);
      const componentRef = this.container.createComponent(factory);
      (<ActivityComponent>componentRef.instance).activity = activity;
      (<ActivityComponent>componentRef.instance).pixelsToMinutesRatio =
        this.segmentHeight / this.interval;
    });
  }

  ngOnInit() {}
}
