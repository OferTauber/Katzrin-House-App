import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.use(cookieParser());
  app.listen(PORT).then(() => {
    console.log(`Server is up and listening to port ${PORT}`);
  });
}
bootstrap();
