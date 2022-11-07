import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

const pathToReact = resolve(__dirname, '../client/build');
console.log(pathToReact);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: pathToReact,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
