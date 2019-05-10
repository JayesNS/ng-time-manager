import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { MatCheckboxChange } from '@angular/material';
import { Store } from '@ngrx/store';
import { ChangeTodoStatus } from '../../actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  constructor(private store: Store<any>) {}

  ngOnInit() {}

  onStateChange(event: MatCheckboxChange) {
    this.todo.completed = event.checked;
    this.store.dispatch(new ChangeTodoStatus({ todo: this.todo }));
  }
}
