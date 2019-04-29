export interface Activity {
  type: ActivityType;
  title: string;
  startingAt: Date;
  endingAt: Date;
}

export enum ActivityType {
  TODO = 'todo',
  SIMPLE = 'simple'
}
