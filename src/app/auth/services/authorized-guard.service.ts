import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthorizedGuardService implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.user.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['']);
        }
        return !!user;
      })
    );
  }
}
