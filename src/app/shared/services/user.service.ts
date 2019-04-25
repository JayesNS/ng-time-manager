import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser$(user: firebase.User): Observable<any> {
    return this.http.post('api/users', { firebaseUid: user.uid });
  }

  getUser$(firebaseUid: string): Observable<any> {
    return this.http.get(`api/users/${firebaseUid}`);
  }
}
