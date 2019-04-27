import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from './auth/state';
import { Observable } from 'rxjs';
import { RestoreSession } from './auth/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isUserAuthenticated$: Observable<boolean>;
  constructor(private store: Store<{}>) {
    this.isUserAuthenticated$ = this.store.select(selectIsLoggedIn);
    this.store.dispatch(new RestoreSession());
  }
}
