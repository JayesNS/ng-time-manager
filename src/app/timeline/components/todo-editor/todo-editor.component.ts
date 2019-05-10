import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-editor',
  templateUrl: './todo-editor.component.html',
  styleUrls: ['./todo-editor.component.sass']
})
export class TodoEditorComponent implements OnInit {
  @Input() todoList: FormGroup;
  get todos(): FormArray {
    return this.todoList.get('todos') as FormArray;
  }

  constructor() {}

  ngOnInit() {}

  addTodo() {
    this.todos.push(
      new FormGroup({
        title: new FormControl(''),
        completed: new FormControl(false)
      })
    );
  }

  removeTodo(todoIndex: number) {
    this.todos.removeAt(todoIndex);
  }
}
