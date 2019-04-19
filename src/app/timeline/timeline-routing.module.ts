import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineViewComponent } from './containers/timeline-view/timeline-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'day' },
  { path: 'day', component: TimelineViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule {}
