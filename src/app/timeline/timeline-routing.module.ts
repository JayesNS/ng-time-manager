import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineViewComponent } from './containers';
import { ActivityEditorComponent } from './components/activity-editor/activity-editor.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'day' },
  { path: 'day', component: TimelineViewComponent },
  { path: 'editor', component: ActivityEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule {}
