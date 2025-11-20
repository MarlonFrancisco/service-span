import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WhatsappBotService } from './whatsapp-bot.service';
import type { IWhatsappWebhook } from './whatsapp-bot.types';

@Controller('whatsapp/webhook')
export class WhatsappBotController {
  private readonly logger = new Logger(WhatsappBotController.name);

  constructor(
    private readonly botService: WhatsappBotService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async verifyToken(
    @Query('hub.mode') mode: string,
    @Query('hub.challenge') challenge: string,
    @Query('hub.verify_token') verifyToken: string,
  ) {
    const isValid =
      mode === 'subscribe' &&
      verifyToken === this.configService.get('WHATSAPP_VERIFY_TOKEN');

    if (isValid) {
      this.logger.log('Webhook verified successfully');
      return challenge;
    }

    throw new ForbiddenException('Invalid verify token');
  }

  @Post()
  async handleMessage(@Body() body: IWhatsappWebhook) {
    this.logger.log('Received webhook event');

    return await this.botService.handleWebhookMessage(body);
  }
}
