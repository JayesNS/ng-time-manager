import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SignInCredentials } from '../../../models';
import { SignIn, SignInWithGoogle } from '../../actions/auth.actions';
import * as fromState from '../../state';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  error$ = this.store.select(fromState.selectSignInPageError);

  constructor(private store: Store<fromState.State>) {}

  ngOnInit() {}

  signIn(): void {
    const credentials: SignInCredentials = this.signInForm.value;
    this.store.dispatch(new SignIn({ credentials }));
  }

  signInWithGoogle(): void {
    this.store.dispatch(new SignInWithGoogle());
  }

  ngOnDestroy(): void {}
}
