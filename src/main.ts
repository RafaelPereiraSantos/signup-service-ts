import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Consumer } from './consumer';
import { CaseConvertInterceptor } from './caseConvertInterceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new CaseConvertInterceptor());

  const consumer: Consumer = new Consumer();
  consumer.up();

  await app.listen(3000);
}
bootstrap();
