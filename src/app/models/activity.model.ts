import { Todo } from './todo.model';

export interface Activity {
  _id: string;
  type: ActivityType;
  title: string;
  startingAt: Date;
  endingAt: Date;
  description?: string;
  category?: string;
  todoList?: { todos: Todo[] };
}

export enum ActivityType {
  TODO = 'todo',
  SIMPLE = 'simple'
}
