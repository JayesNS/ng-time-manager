import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State, selectIsLoggedIn, selectAuthUser } from '../../state';
import { LogOut } from '../../actions/auth.actions';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.sass']
})
export class LogOutComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  ngOnInit() {}

  logOut(): any {
    this.store.dispatch(new LogOut());
  }
}
