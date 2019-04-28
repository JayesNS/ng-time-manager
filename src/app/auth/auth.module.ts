import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent, SignUpComponent } from './containers';
import { LogOutComponent } from './components';
import { reducers } from './state';
import { AuthEffects } from './effects';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, LogOutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
    FormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
    MaterialModule
  ],
  exports: [SignInComponent, SignUpComponent, LogOutComponent]
})
export class AuthModule {}
