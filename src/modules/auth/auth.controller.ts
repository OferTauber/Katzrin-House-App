import {
  Controller,
  Post,
  Headers,
  Body,
  Get,
  HttpException,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from 'src/consts/classes_and_DTOs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/login')
  async login(@Body() req: AuthCredentialsDTO): Promise<string> {
    const token = await this.authService.login(req);

    return token;
  }

  @Get('/validate-token')
  isTokenValid(@Headers() headers: any): boolean {
    try {
      const token = extractTokenFromHeaders(headers);
      return this.authService.isTokenValid(token);
    } catch (err) {
      return false;
    }
  }
}

const extractTokenFromHeaders = (headers: any): string => {
  try {
    const [_, token] = headers?.authorization?.split(' ');

    if (!token) throw new HttpException('Please provide a token', 403);

    return token;
  } catch (err) {
    throw new HttpException('Please provide a valid token', 403);
  }
};
