import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ? => if we want to use /api/ then uncomment it
  // app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
