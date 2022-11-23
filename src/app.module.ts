import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

const pathToReact = resolve(__dirname, '../../client/build');

@Module({
  imports: [
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: pathToReact,
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
