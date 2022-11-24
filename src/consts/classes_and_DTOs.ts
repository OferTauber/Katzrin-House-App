export class PayloadDTO {
  email: string;
  isAdmin: boolean;
  id: string;
  name: string;
}

export class UserToExport extends PayloadDTO {
  name: string;
}

export class User extends UserToExport {
  password: string;
  recoveryCode?: string;
}

export class AuthCredentialsDTO {
  email: string;
  password: string;
}
