import { Component, OnInit } from '@angular/core';
import { State, selectSignUpPageError } from '../../state';
import { Store } from '@ngrx/store';
import { SignUp } from '../../actions/auth.actions';
import { SignUpCredentials } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  credentials: SignUpCredentials = { username: '', password: '' };
  error$: Observable<string>;

  constructor(private store: Store<State>) {
    this.error$ = this.store.select(selectSignUpPageError);
  }

  ngOnInit() {}

  signUp(): void {
    this.store.dispatch(new SignUp({ credentials: this.credentials }));
    /* this.auth.signUp$(this.user).subscribe(
      (response: any) => {
        this.message = response.msg;
        if (response.success) {
          this.router.navigate(['sign-in']);
        }
      },
      err => {
        this.message = err.error.msg;
      }
    ); */
  }
}
