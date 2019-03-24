import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
  exports: [SignInComponent, SignUpComponent]
})
export class AuthModule {}
