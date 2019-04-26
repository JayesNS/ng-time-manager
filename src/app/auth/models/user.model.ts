import { Activity } from 'src/app/timeline/models';

export interface User {
  _id: string;
  activities: Activity[];
}
