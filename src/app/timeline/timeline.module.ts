import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { TimelineRoutingModule } from './timeline-routing.module';
import {
  TimelineViewComponent,
  ActivityEditorComponent,
  ActivityDetailsComponent
} from './containers';
import * as fromState from './state';
import * as fromEffects from './effects';
import { ActivityComponent } from './components/activities';
import {
  TimelineLegendComponent,
  ActivitiesTimelineComponent,
  TimelineComponent
} from './components/timeline';
import { MaterialModule } from '../shared/material/material.module';
import { TodoEditorComponent } from './components/todo-editor/todo-editor.component';
import { TodoComponent } from './components/todo/todo.component';

@NgModule({
  declarations: [
    TimelineLegendComponent,
    TimelineViewComponent,
    ActivitiesTimelineComponent,
    TimelineComponent,
    ActivityEditorComponent,
    ActivityComponent,
    ActivityDetailsComponent,
    TodoEditorComponent,
    TodoComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('timeline', fromState.reducers),
    EffectsModule.forFeature([fromEffects.ActivitiesEffects]),
    TimelineRoutingModule,
    MaterialModule
  ],
  entryComponents: [ActivityEditorComponent, ActivityComponent, ActivityDetailsComponent]
})
export class TimelineModule {}
