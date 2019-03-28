import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { NotAuthorizedGuardService as NotAuthorizedGuard } from './auth/services/not-authorized-guard.service';

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
