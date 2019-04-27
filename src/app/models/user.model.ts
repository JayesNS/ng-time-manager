import { Activity } from './activity.model';

export interface User {
  _id: string;
  activities: Activity[];
}
