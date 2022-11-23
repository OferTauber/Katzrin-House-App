import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { stringify } from 'querystring';
import {
  User,
  AuthCredentialsDTO,
  PayloadDTO,
} from 'src/consts/classes_and_DTOs';
import { getUserByEmailFile } from 'src/utils/axios';

import * as jwt from 'jsonwebtoken';
// import * as bcrypt from 'bcrypt';
// import { jwtSecret } from '../../utils/EnvironmentVariables';

@Injectable()
export class AuthService {
  constructor(/*private userService: UserService*/) {}

  async login(authCredentials: AuthCredentialsDTO): Promise<string> {
    try {
      const user: User = await getUserByEmailFile(authCredentials.email);
      const { email, id, isAdmin } = user;

      const payload: PayloadDTO = { email, id, isAdmin };

      if (!user || user.password !== authCredentials.password)
        // todo becrypt
        throw new UnauthorizedException('There is no such user');

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2d',
      });

      return accessToken;
    } catch (e) {
      throw new UnauthorizedException('There is no such user');
    }
  }

  isTokenValid(token: string): boolean {
    return !!jwt.verify(token, process.env.JWT_SECRET);
  }
}
