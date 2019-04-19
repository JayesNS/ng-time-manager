import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SignIn, SignInWithGoogle } from '../../actions/auth.actions';
import * as fromState from '../../state';
import { SignInCredentials } from '../../models';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit, OnDestroy {
  credentials: SignInCredentials = { email: null, password: null };
  error$ = this.store.select(fromState.selectSignInPageError);

  constructor(private store: Store<fromState.State>) {}

  ngOnInit() {}

  signIn(): void {
    this.store.dispatch(new SignIn({ credentials: this.credentials }));
  }

  signInWithGoogle(): void {
    this.store.dispatch(new SignInWithGoogle());
  }

  ngOnDestroy(): void {}
}
