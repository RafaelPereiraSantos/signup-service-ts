import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AssociationService } from './associationService';
import { LoggerMiddleware } from './loggerMiddleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AssociationService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(AppController);
  }
}
