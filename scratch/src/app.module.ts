import { Module } from '@nestjs/common';
import { AppController } from './app.contoller';

@Module({
  controllers: [AppController],
})
export class AppModule {}
