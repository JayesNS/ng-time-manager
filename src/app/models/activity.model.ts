export interface Activity {
  _id: string;
  type: ActivityType;
  title: string;
  startingAt: Date;
  endingAt: Date;
  description?: string;
  category?: string;
}

export enum ActivityType {
  TODO = 'todo',
  SIMPLE = 'simple'
}
