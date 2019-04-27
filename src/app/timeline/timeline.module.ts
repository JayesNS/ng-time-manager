import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { TimelineRoutingModule } from './timeline-routing.module';
import {
  TimelineLegendComponent,
  ActivitiesTimelineComponent,
  TimelineComponent,
  ActivityEditorComponent,
  ActivityComponent
} from './components';
import { TimelineViewComponent } from './containers';
import * as fromState from './state';
import * as fromEffects from './effects';

@NgModule({
  declarations: [
    TimelineLegendComponent,
    TimelineViewComponent,
    ActivitiesTimelineComponent,
    TimelineComponent,
    ActivityEditorComponent,
    ActivityComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('timeline', fromState.reducers),
    EffectsModule.forFeature([fromEffects.ActivitiesEffects]),
    TimelineRoutingModule
  ],
  entryComponents: [ActivityComponent]
})
export class TimelineModule {}
