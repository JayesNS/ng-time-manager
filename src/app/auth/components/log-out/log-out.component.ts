import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State, selectIsLoggedIn } from '../../state';
import { LogOut } from '../../actions/auth.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.sass']
})
export class LogOutComponent implements OnInit {
  isAuthenticated$ = this.firebase.user.pipe(map(user => !!user));

  constructor(private store: Store<State>, private firebase: AngularFireAuth) {}

  ngOnInit() {}

  logOut(): any {
    this.store.dispatch(new LogOut());
  }
}
