import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectLoading } from './auth/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isUserAuthenticated$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  constructor(private store: Store<{}>) {
    this.isUserAuthenticated$ = this.store.select(selectIsLoggedIn);
    this.isLoading$ = this.store.select(selectLoading);
  }
}
