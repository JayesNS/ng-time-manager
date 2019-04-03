import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotAuthorizedGuardService as NotAuthorizedGuard } from './auth/services/not-authorized-guard.service';
import { SignInComponent } from './auth/containers/sign-in/sign-in.component';
import { SignUpComponent } from './auth/containers/sign-up/sign-up.component';

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
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
