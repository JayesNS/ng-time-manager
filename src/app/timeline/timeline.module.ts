import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ActivityComponent,
  TimelineLegendComponent,
  ActivitiesTimelineComponent
} from './components';
import { TimelineViewComponent } from './containers';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TimelineComponent } from './components/timeline/timeline.component';

@NgModule({
  declarations: [
    ActivityComponent,
    TimelineLegendComponent,
    TimelineViewComponent,
    ActivitiesTimelineComponent,
    TimelineComponent
  ],
  imports: [RouterModule, CommonModule, FormsModule, StoreModule.forFeature('timeline', {})]
})
export class TimelineModule {}
