import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EligibleWorker } from './pubsub/eligibleWorker';
import { CaseConvertInterceptor } from './middlewares/caseConvertInterceptor';

// TODO create tests for all of this

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new CaseConvertInterceptor());

  const worker: EligibleWorker = new EligibleWorker();
  worker.up();

  // TODO move this port to a dotenv

  await app.listen(3000);
}
bootstrap();
