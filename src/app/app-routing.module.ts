import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {
  NotAuthorizedGuardService as NotAuthorizedGuard,
  AuthorizedGuardService as AuthorizedGuard
} from './auth/services';
import { SignInComponent, SignUpComponent } from './auth/containers';
import { TimelineViewComponent } from './timeline/containers';
import { DayViewComponent } from './timeline/components';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [NotAuthorizedGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [NotAuthorizedGuard]
  },
  {
    path: 'timeline',
    component: TimelineViewComponent,
    canActivate: [AuthorizedGuard],
    canActivateChild: [AuthorizedGuard],
    children: [{ path: 'day', component: DayViewComponent }]
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
