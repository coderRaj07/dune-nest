import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './_common/utils/http-exception.filter';

async function bootstrap() {
  // Create the NestJS application using the Fastify adapter
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);

  // Setup global pipes and filters
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  // TODO: Uncomment this block of code to enable CORS
  app.enableCors({
    origin: '*', //configService.get<string>('app.frontendHost'),
    credentials: true,
  });

  // Listen to the configured port
  await app.listen(configService.get<number>('app.port') || 9000, '0.0.0.0');

}

bootstrap();
