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

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.sass']
})
export class ActivityComponent implements OnChanges, OnInit {
  @Input() activity: Activity | any;
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

  constructor(private renderer: Renderer2, private elRef: ElementRef, private dialog: MatDialog) {}
  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, 'top', this.startPosition + 'px');
    this.renderer.setStyle(this.elRef.nativeElement, 'height', this.height + 'px');
  }
  ngOnChanges() {
    this.renderer.setStyle(this.elRef.nativeElement, 'top', this.startPosition + 'px');
    this.renderer.setStyle(this.elRef.nativeElement, 'height', this.height + 'px');
  }

  get startPosition() {
    const currentDate = new Date(this.activity.startingAt).setHours(0, 0, 0, 0);
    const startTime = new Date(this.activity.startingAt);
    const millisecondOfDay = startTime.getTime() - currentDate;
    const minuteOfDay = millisecondOfDay / 1000 / 60;
    return Math.round(minuteOfDay * this.pixelsToMinutesRatio);
  }

  get height() {
    const timeDifference =
      new Date(this.activity.endingAt).getTime() - new Date(this.activity.startingAt).getTime();
    const lengthInMinutes = timeDifference / 1000 / 60;
    return Math.round(lengthInMinutes * this.pixelsToMinutesRatio);
  }
}
