import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  constructor() {}

  ngOnInit() {}

  onStateChange(event: MatCheckboxChange) {
    this.todo.completed = event.checked;
    console.log('todo state changed', this.todo);
  }
}
