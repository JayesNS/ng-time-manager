import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import {
  ActivityComponent,
  TimelineLegendComponent,
  ActivitiesTimelineComponent,
  TimelineComponent
} from './components';
import { TimelineViewComponent } from './containers';
import { reducers } from './state';
import { ActivitiesEffects } from './effects/activities.effects';
import { TimelineRoutingModule } from './timeline-routing.module';
import { ActivityEditorComponent } from './components/activity-editor/activity-editor.component';

@NgModule({
  declarations: [
    ActivityComponent,
    TimelineLegendComponent,
    TimelineViewComponent,
    ActivitiesTimelineComponent,
    TimelineComponent,
    ActivityEditorComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('timeline', reducers),
    EffectsModule.forFeature([ActivitiesEffects]),
    TimelineRoutingModule
  ]
})
export class TimelineModule {}
