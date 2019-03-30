import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';

import { User, SignInCredentials, SignUpCredentials } from '../models';
import { State, selectIsLoggedIn } from '../state';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private store: Store<State>
  ) {}

  signIn$(credentials: SignInCredentials): Observable<any> {
    return this.http.post('/auth/signin', credentials);
  }

  signUp$(credentials: SignUpCredentials): Observable<any> {
    return this.http.post('/auth/signup', credentials);
  }

  isUserAuthenticated$(): Observable<boolean> {
    return this.store
      .select(selectIsLoggedIn)
      .pipe(map(isLoggedIn => isLoggedIn && !this.jwtHelper.isTokenExpired()));
  }
}
