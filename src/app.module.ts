import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AssociationService } from './services/associationService';
import { RegistrationService } from './services/registrationService';
import { EligibilitySearchService } from './services/eligibilitySearchService';
import { LoggerMiddleware } from './middlewares/loggerMiddleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AssociationService, RegistrationService, EligibilitySearchService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(AppController);
  }
}
