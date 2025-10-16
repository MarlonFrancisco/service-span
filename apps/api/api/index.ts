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
  try {
    const server = await bootstrap();
    const instance = server.getHttpAdapter().getInstance();
    return instance(req, res);
  } catch (error) {
    console.error('❌ Serverless handler error:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
