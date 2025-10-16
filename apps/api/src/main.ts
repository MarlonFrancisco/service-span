import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { Express } from 'express';
import express from 'express';
import { AppModule } from './modules/app.module';

let cachedApp: INestApplication | null = null;

export async function createApp(
  expressApp?: Express,
): Promise<INestApplication> {
  const isProduction = process.env.NODE_ENV === 'production';

  // Cache da app APENAS em produção serverless
  // Em dev, sempre recria para permitir hot reload
  if (cachedApp && isProduction) {
    return cachedApp;
  }

  const serverInstance = expressApp || express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(serverInstance),
    {
      logger: isProduction
        ? ['error', 'warn']
        : ['log', 'error', 'warn', 'debug'],
    },
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });

  // Global prefix para todas as rotas (opcional)
  // app.setGlobalPrefix('api');

  await app.init();

  // Cacheia somente em produção serverless
  if (isProduction) {
    cachedApp = app;
  }

  return app;
}

async function bootstrap() {
  const app = await createApp();
  const port = process.env.PORT || 3000;
  await app.listen(port);
}

// Executa apenas se for o arquivo principal (não quando importado em serverless)
if (require.main === module) {
  void bootstrap();
}

// Handler para ambientes serverless (Vercel, AWS Lambda, etc)
export default createApp;
