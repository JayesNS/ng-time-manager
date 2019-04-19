import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent, SignUpComponent } from './containers';
import { NotAuthorizedGuardService as NotAuthorizedGuard } from './services';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [NotAuthorizedGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [NotAuthorizedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
