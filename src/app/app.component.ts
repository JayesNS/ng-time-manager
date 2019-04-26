import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthUser } from './auth/state';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { SignInSuccess, RestoreSession } from './auth/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isUserAuthenticated$: Observable<boolean>;
  constructor(private store: Store<{}>, private firebase: AngularFireAuth) {
    this.isUserAuthenticated$ = this.store.select(selectAuthUser).pipe(map(user => !!user));
    this.store.dispatch(new RestoreSession({ firebaseUser: this.firebase.auth.currentUser }));
  }
}
