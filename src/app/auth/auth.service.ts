import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// TODO: extract models
interface User {
  username: string;
  password: string;
}
interface AuthResponse {
  success: boolean;
  msg: string;
  token?: string;
}

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
