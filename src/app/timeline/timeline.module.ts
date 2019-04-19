import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  ActivityComponent,
  TimelineLegendComponent,
  ActivitiesTimelineComponent,
  TimelineComponent
} from './components';
import { TimelineViewComponent } from './containers';

import { reducers } from './state';
import { TimelineEffects } from './effects/timeline.effects';
import { EffectsModule } from '@ngrx/effects';
import { TimelineRoutingModule } from './timeline-routing.module';

@NgModule({
  declarations: [
    ActivityComponent,
    TimelineLegendComponent,
    TimelineViewComponent,
    ActivitiesTimelineComponent,
    TimelineComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    StoreModule.forFeature('timeline', reducers),
    EffectsModule.forFeature([TimelineEffects]),
    TimelineRoutingModule
  ]
})
export class TimelineModule {}
