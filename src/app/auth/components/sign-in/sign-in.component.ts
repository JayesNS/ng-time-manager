import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SignIn } from '../../actions/auth.actions';
import { Credentials } from '../../models';
import * as fromState from '../../state';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit, OnDestroy {
  user: Credentials = { username: null, password: null };
  error$ = this.store.select(fromState.selectSignInPageError);

  constructor(private store: Store<fromState.State>) {}

  ngOnInit() {}

  signIn(): void {
    this.store.dispatch(new SignIn(this.user));
  }

  ngOnDestroy(): void {}
}
