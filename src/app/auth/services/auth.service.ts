import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';

import { SignInCredentials, SignUpCredentials } from '../models';
import { State, selectIsLoggedIn } from '../state';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
    private firebase: AngularFireAuth,
    private store: Store<State>
  ) {}

  signIn$(credentials: SignInCredentials): Observable<any> {
    return from(
      this.firebase.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    );
  }

  signUp$(credentials: SignUpCredentials): Observable<any> {
    return from(
      this.firebase.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
    );
  }

  signInWithGoogle$() {
    const googleProvider = new auth.GoogleAuthProvider();
    return from(this.firebase.auth.signInWithPopup(googleProvider));
  }

  get user(): firebase.User {
    return this.firebase.auth.currentUser;
  }

  signOut$(): Observable<void> {
    return from(this.firebase.auth.signOut());
  }
}
