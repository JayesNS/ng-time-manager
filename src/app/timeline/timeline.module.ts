import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayViewComponent, ActivityComponent, TimelineLegendComponent } from './components';
import { TimelineViewComponent } from './containers';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DayViewComponent,
    ActivityComponent,
    TimelineLegendComponent,
    TimelineViewComponent
  ],
  imports: [RouterModule, CommonModule, StoreModule.forFeature('timeline', {})]
})
export class TimelineModule {}
