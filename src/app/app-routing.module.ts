import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {
  NotAuthorizedGuardService as NotAuthorizedGuard,
  AuthorizedGuardService as AuthorizedGuard
} from './auth/services';
import { SessionResolverService } from './auth/services/session-resolver.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    canActivate: [NotAuthorizedGuard],
    resolve: { session: SessionResolverService }
  },
  {
    path: 'timeline',
    loadChildren: './timeline/timeline.module#TimelineModule',
    canActivate: [AuthorizedGuard],
    resolve: { session: SessionResolverService }
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: { session: SessionResolverService }
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
