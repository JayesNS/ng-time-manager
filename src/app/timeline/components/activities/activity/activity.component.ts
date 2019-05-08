import {
  Component,
  Input,
  OnChanges,
  Renderer2,
  ElementRef,
  OnInit,
  HostListener
} from '@angular/core';
import { Activity } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { ActivityDetailsComponent } from 'src/app/timeline/containers';
import { ActivitiesService } from 'src/app/timeline/services/activities.service';
import { Store } from '@ngrx/store';
import { RemoveActivity, EditActivity, OpenActivityEditor } from 'src/app/timeline/actions';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.sass']
})
export class ActivityComponent implements OnChanges, OnInit {
  @Input() activity: Activity;
  @Input() pixelsToMinutesRatio: number;

  positioning: ActivityPositioning;

  showControls = false;

  @HostListener('mouseover') onMouseOver() {
    this.showControls = true;
  }
  @HostListener('mouseleave') onmouseleave() {
    this.showControls = false;
  }

  openDetails() {
    this.dialog.open(ActivityDetailsComponent, {
      id: 'ActivityDetails',
      data: { activity: this.activity }
    });
  }

  constructor(
    private renderer: Renderer2,
    private store: Store<any>,
    private elRef: ElementRef,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.positioning = this.calcPositioning();

    this.renderer.setStyle(this.elRef.nativeElement, 'top', this.positioning.start + 'px');
    this.renderer.setStyle(this.elRef.nativeElement, 'height', this.positioning.height + 'px');
  }
  ngOnChanges() {
    this.renderer.setStyle(this.elRef.nativeElement, 'top', this.positioning.start + 'px');
    this.renderer.setStyle(this.elRef.nativeElement, 'height', this.positioning.height + 'px');
  }

  calcPositioning(): ActivityPositioning {
    const startDatetime = DateTime.fromJSDate(new Date(this.activity.startingAt));
    const endDatetime = DateTime.fromJSDate(new Date(this.activity.endingAt));
    const startOfDay = startDatetime.startOf('day');
    const durationInMinutes = endDatetime.diff(startDatetime).as('minutes');
    const minuteOfDay = startDatetime.diff(startOfDay).as('minutes');
    const start = minuteOfDay * this.pixelsToMinutesRatio;
    const height = durationInMinutes * this.pixelsToMinutesRatio;
    return { start, height, end: 0 };
  }

  removeActivity() {
    this.store.dispatch(new RemoveActivity({ activity: this.activity }));
  }

  editActivity() {
    this.store.dispatch(new OpenActivityEditor({ activity: this.activity }));
  }
}

interface ActivityPositioning {
  start: number;
  height: number;
  end: number;
}
