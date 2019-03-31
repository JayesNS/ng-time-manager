import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State, selectIsLoggedIn } from '../../state';
import { LogOut } from '../../actions/auth.actions';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.sass']
})
export class LogOutComponent implements OnInit {
  isAuthenticated$ = this.store.select(selectIsLoggedIn);

  constructor(private store: Store<State>) {}

  ngOnInit() {}

  logOut(): any {
    this.store.dispatch(new LogOut());
  }
}
