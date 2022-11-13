export enum exclusive {
  no,
  unConfirmed,
  confirmed,
}
export interface User {
  name: string;
  email: string;
}

export interface EventDTO {
  title: string;
  start: Date;
  end: Date;
  owner: User;
  isExclusiveConfirmed?: exclusive;
  allDay?: boolean;
  joining: Array<User>;
}
