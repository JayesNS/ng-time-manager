import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, from, of } from 'rxjs';

import { SignInCredentials, SignUpCredentials } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private firebase: AngularFireAuth) {}

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
