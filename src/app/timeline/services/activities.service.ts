import { Injectable } from '@angular/core';
import { TimelineModule } from '../timeline.module';
import { User } from 'src/app/auth/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../models';

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
}
