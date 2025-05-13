import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as cors from 'cors';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Serve static files
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
  /* setInterval(() => {
    const memory = process.memoryUsage();
    console.log('NestJS Memory Usage:', {
      rss: (memory.rss / 1024 / 1024).toFixed(2) + ' MB',
      heapUsed: (memory.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
      external: (memory.external / 1024 / 1024).toFixed(2) + ' MB',
    });
  }, 5000); // every 5 seconds */
}
bootstrap();
