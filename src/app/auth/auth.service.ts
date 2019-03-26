import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, AuthResponse } from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/auth/signin', user);
  }

  signUp(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/auth/signup', user);
  }
}
