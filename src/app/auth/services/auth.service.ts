import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  signIn(user: User): Observable<any> {
    return this.http.post('/auth/signin', user);
  }

  signUp(user: User): Observable<any> {
    return this.http.post('/auth/signup', user);
  }

  isUserAuthenticated(): boolean {
    const token = this.jwtHelper.tokenGetter();

    return !!token || !this.jwtHelper.isTokenExpired(token);
  }
}
