import type { NestExpressApplication } from '@nestjs/platform-express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import createApp from '../src/main';

let app: NestExpressApplication;

async function bootstrap() {
  if (!app) {
    app = (await createApp()) as NestExpressApplication;
    await app.init();
  }
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const server = await bootstrap();
  return server.getHttpAdapter().getInstance()(req, res);
}
