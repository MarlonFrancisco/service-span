import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './modules/app.module';

let cachedApp: INestApplication | null = null;

const isProduction = process.env.NODE_ENV === 'production';

export async function createApp(): Promise<INestApplication> {
  // Cache da app APENAS em produção serverless
  // Em dev, sempre recria para permitir hot reload
  if (cachedApp && isProduction) {
    return cachedApp;
  }

  const app = await NestFactory.create(AppModule);

  // Aumenta o limite de payload para uploads de imagens (padrão: 100kb)
  app.use(json({ limit: '5mb' }));

  app.getHttpAdapter().getInstance().set('trust proxy', true);

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
if (!isProduction) {
  void bootstrap();
}

export default async function handler(req: Request, res: Response) {
  const app = await createApp();
  return app.getHttpAdapter().getInstance().handle(req, res);
}
