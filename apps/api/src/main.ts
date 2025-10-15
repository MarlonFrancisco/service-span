import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  return app;
}

async function bootstrap() {
  const app = await createApp();
  await app.listen(3000);
}

// Executa apenas se for o arquivo principal (não quando importado)
if (require.main === module) {
  void bootstrap();
}

// Exporta para ambientes serverless
export default bootstrap;
