import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthEffects } from './effects/auth.effects';
import { reducers } from './state';
import { LogOutComponent } from './components/log-out/log-out.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, LogOutComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    FormsModule,
    /* JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwtToken')
      }
    }), */
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [SignInComponent, SignUpComponent, LogOutComponent]
})
export class AuthModule {}
