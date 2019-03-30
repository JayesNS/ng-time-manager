import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotAuthorizedGuardService implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate() {
    return this.auth.isUserAuthenticated$().pipe(map(isAuthenticated => !isAuthenticated));
  }
}
