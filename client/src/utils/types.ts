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
  token?: string;
  email?: string;

  constructor(
    name: string,
    id: string,
    isAdmin: boolean,
    token: string,
    email: string,
  ) {
    super(name, id);
    this.isAdmin = isAdmin;
    this.token = token;
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
