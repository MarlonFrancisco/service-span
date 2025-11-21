import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from '@upstash/redis';
import { WhatsappConfig } from '../partner/stores/whatsapp/whatsapp.entity';
import { WhatsappService } from '../partner/stores/whatsapp/whatsapp.service';
import { IWhatsappWebhook } from './whatsapp-bot.types';

export enum BotState {
  MENU = 'MENU',
  SELECT_SERVICE = 'SELECT_SERVICE',
  SELECT_DATE = 'SELECT_DATE',
  SELECT_TIME = 'SELECT_TIME',
  CONFIRM_BOOKING = 'CONFIRM_BOOKING',
}

@Injectable()
export class WhatsappBotService {
  private readonly logger = new Logger(WhatsappBotService.name);
  private redis: Redis;

  constructor(
    private readonly configService: ConfigService,
    private readonly whatsappService: WhatsappService,
  ) {
    this.redis = new Redis({
      url: this.configService.get('REDIS_REST_URL'),
      token: this.configService.get('REDIS_REST_TOKEN'),
    });
  }

  async handleIncomingMessage(message: any, config: WhatsappConfig) {
    const from = message.from; // User's phone number
    const text = (message.text?.body ||
      message.interactive?.button_reply?.id) as string;

    if (!text) return;

    const sessionKey = `whatsapp:session:${from}`;
    const state = (await this.redis.get<BotState>(sessionKey)) || BotState.MENU;

    this.logger.log(`Processing message from ${from} in state ${state}`);

    switch (state) {
      case BotState.MENU:
        await this.handleMenuState(from, text, config);
        break;
      // TODO: Implement other states
      default:
        await this.sendMenu(from, config);
    }
  }

  private async handleMenuState(
    from: string,
    text: string,
    config: WhatsappConfig,
  ) {
    if (text.toLowerCase().includes('agendar')) {
      await this.redis.set(
        `whatsapp:session:${from}`,
        BotState.SELECT_SERVICE,
        {
          ex: 900, // 15 mins TTL
        },
      );
      await this.whatsappService.sendText(
        config.phoneNumberId,
        from,
        'Por favor, escolha o serviço (Simulação: Digite 1 para Corte)',
        config.accessToken,
      );
    } else {
      await this.sendMenu(from, config);
    }
  }

  private async sendMenu(from: string, config: WhatsappConfig) {
    await this.whatsappService.sendInteractiveButtons(
      config.phoneNumberId,
      from,
      'Olá! Como posso ajudar?',
      [
        { id: 'agendar', title: '📅 Agendar' },
        { id: 'meus_agendamentos', title: '📋 Meus Agendamentos' },
      ],
      config.accessToken,
    );
  }

  async handleWebhookMessage(body: IWhatsappWebhook) {
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.value.messages) {
            const message = change.value.messages[0];
            const businessPhoneNumberId = change.value.metadata.phone_number_id;

            const config = await this.whatsappService.findOne({
              phoneNumberId: businessPhoneNumberId,
            });

            if (config.phoneNumberId) {
              await this.handleIncomingMessage(message, config);
            } else {
              this.logger.warn(
                `No config found for phone number ID: ${businessPhoneNumberId}`,
              );
            }
          }
        }
      }
    }
  }
}
