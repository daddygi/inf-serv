// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   const corsOptions: CorsOptions = {
//     origin: 'http://localhost:3001', // Allow requests from this origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//   };
//   // Enable CORS using the CorsMiddleware
//   app.enableCors(corsOptions);
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const corsOptions: CorsOptions = {
    origin: configService.get<string>('DB_HOST'), // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  // Enable CORS using the CorsMiddleware
  app.enableCors(corsOptions);

  await app.listen(configService.get<number>('DB_PORT'));
}
bootstrap();
