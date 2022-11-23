export enum exclusive {
  no,
  unConfirmed,
  confirmed,
}

export class User {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

export class LogedUser extends User {
  isAdmin: boolean;
  email?: string;

  constructor(
    name: string,
    id: string,
    isAdmin: boolean,

    email: string,
  ) {
    super(name, id);
    this.isAdmin = isAdmin;
    this.email = email;
  }
}

export interface EventDTO {
  title: string;
  start: string;
  end: string;
  owner: User;
  isExclusiveConfirmed?: exclusive;
  allDay?: boolean;
  joining: Array<User>;
  id: string;
}

export class AxiosDTO {
  error?: any;
  data?: any;
}

export enum QueryKeys {
  user = 'user',
  events = 'events',
}
