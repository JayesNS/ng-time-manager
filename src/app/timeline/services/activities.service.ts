import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, Activity } from 'src/app/models';
import { Todo } from 'src/app/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  constructor(private http: HttpClient) {}

  loadActivities$(user: User): Observable<Activity[]> {
    return this.http.get<Activity[]>(`api/activities/${user._id}`);
  }

  addActivity$(user: User, activity: Activity): Observable<Activity> {
    return this.http.post<Activity>('api/activities', { uid: user._id, activity });
  }

  editActivity$(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>('api/activities', { activity });
  }

  removeActivity$(activity: Activity): Observable<Activity> {
    return this.http.delete<Activity>(`api/activities/${activity._id}`);
  }

  editTodo$(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`api/todos`, { todo });
  }
}
