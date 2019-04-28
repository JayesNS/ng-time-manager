import {
  Component,
  Input,
  OnChanges,
  Renderer2,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import { Activity } from 'src/app/models';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.sass']
})
export class ActivityComponent implements OnChanges, OnInit {
  @Input() activity: Activity;
  @Input() pixelsToMinutesRatio: number;

  @ViewChild('container') container: ElementRef;

  constructor(private renderer: Renderer2) {}
  ngOnInit() {
    this.renderer.setStyle(this.container.nativeElement, 'top', this.startPosition + 'px');
    this.renderer.setStyle(this.container.nativeElement, 'height', this.height + 'px');
  }
  ngOnChanges() {
    this.renderer.setStyle(this.container.nativeElement, 'top', this.startPosition + 'px');
    this.renderer.setStyle(this.container.nativeElement, 'height', this.height + 'px');
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
