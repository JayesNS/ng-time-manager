import {
  Component,
  Input,
  OnChanges,
  Renderer2,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener
} from '@angular/core';
import { Activity } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { ActivityDetailsComponent } from 'src/app/timeline/containers';
import { ActivitiesService } from 'src/app/timeline/services/activities.service';
import { Store } from '@ngrx/store';
import { RemoveActivity } from 'src/app/timeline/actions';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.sass']
})
export class ActivityComponent implements OnChanges, OnInit {
  @Input() activity: Activity;
  @Input() pixelsToMinutesRatio: number;

  showControls = false;

  @HostListener('mouseover') onMouseOver() {
    this.showControls = true;
  }
  @HostListener('mouseleave') onmouseleave() {
    this.showControls = false;
  }

  openDetails() {
    this.dialog.open(ActivityDetailsComponent, { data: { activity: this.activity } });
  }

  constructor(
    private renderer: Renderer2,
    private store: Store<any>,
    private elRef: ElementRef,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, 'top', this.startPosition + 'px');
    this.renderer.setStyle(this.elRef.nativeElement, 'height', this.height + 'px');
  }
  ngOnChanges() {
    this.renderer.setStyle(this.elRef.nativeElement, 'top', this.startPosition + 'px');
    this.renderer.setStyle(this.elRef.nativeElement, 'height', this.height + 'px');
  }

  get startPosition() {
    const startOfDay = DateTime.local().startOf('day');
    const startTime = DateTime.fromJSDate(new Date(this.activity.startingAt));
    const minuteOfDay = Math.round(startTime.diff(startOfDay).as('minutes'));
    return Math.round(minuteOfDay * this.pixelsToMinutesRatio);
  }

  get height() {
    const startingAt = DateTime.fromJSDate(new Date(this.activity.startingAt));
    const endingAt = DateTime.fromJSDate(new Date(this.activity.endingAt));
    const activityDurationInMinutes = Math.round(endingAt.diff(startingAt).as('minutes'));
    return Math.round(activityDurationInMinutes * this.pixelsToMinutesRatio);
  }

  removeActivity() {
    this.store.dispatch(new RemoveActivity({ activity: this.activity }));
  }
}
