import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthUser } from './auth/state';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isUserAuthenticated$: Observable<boolean>;
  constructor(private store: Store<{}>) {
    this.isUserAuthenticated$ = this.store.select(selectAuthUser).pipe(map(user => !!user));
  }
}
