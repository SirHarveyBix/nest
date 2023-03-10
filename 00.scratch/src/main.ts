import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // starts server to http://localhost:3000/
  await app.listen(3000);
}

bootstrap();
