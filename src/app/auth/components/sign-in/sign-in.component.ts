import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthState, SignInUser, selectAuthState } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit, OnDestroy {
  user = { username: '', password: '' };
  message: string;

  constructor(private store: Store<AuthState>) {}

  ngOnInit() {
    this.store.select(selectAuthState).subscribe((state: AuthState) => {
      this.message = state.authStatus.msg;
    });
  }

  signIn(): void {
    this.store.dispatch(new SignInUser(this.user));
  }

  ngOnDestroy(): void {}
}
