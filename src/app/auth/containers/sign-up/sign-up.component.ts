import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SignUp } from '../../actions/auth.actions';
import { SignUpCredentials } from '../../../models';
import { State, selectSignUpPageError } from '../../state';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign-in/sign-in.component.sass']
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  error$: Observable<string>;

  constructor(private store: Store<State>) {
    this.error$ = this.store.select(selectSignUpPageError);
  }

  ngOnInit() {}

  signUp(): void {
    const credentials: SignUpCredentials = this.signUpForm.value;
    this.store.dispatch(new SignUp({ credentials }));
  }
}
