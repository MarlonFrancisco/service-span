import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from '@upstash/redis';
import { mapCategoryToWhatsappInteractiveList } from 'src/utils/helpers/whatsapp.helpers';
import { CategoryService } from '../partner/stores/category/category.service';
import { WhatsappConfig } from '../partner/stores/whatsapp/whatsapp.entity';
import { WhatsappService } from '../partner/stores/whatsapp/whatsapp.service';
import { IWhatsappWebhook } from './whatsapp-bot.types';

export enum BotState {
  MENU = 'MENU',
  SELECT_SERVICE = 'SELECT_SERVICE',
  SELECT_PROFESSIONAL = 'SELECT_PROFESSIONAL',
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
    private readonly categoryService: CategoryService,
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
      case BotState.SELECT_SERVICE:
        await this.handleSelectServiceState(from, text, config);
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

      const categories = await this.categoryService.findAll(config.store.id);

      await this.whatsappService.sendInteractiveList({
        phoneNumberId: config.phoneNumberId,
        to: from,
        headerText: 'Serviços disponíveis',
        bodyText: 'Por favor, escolha o serviço',
        footerText: 'Selecione um serviço',
        buttonText: 'Selecionar Serviço',
        sections: categories.map(mapCategoryToWhatsappInteractiveList),
        accessToken: config.accessToken,
      });
    } else {
      await this.sendMenu(from, config);
    }
  }

  private async handleSelectServiceState(
    from: string,
    text: string,
    config: WhatsappConfig,
  ) {
    // TODO: Fetch services from database based on config.storeId
    // For now, simulating with hardcoded service
    if (text === '1') {
      await this.redis.set(
        `whatsapp:session:${from}:service`,
        JSON.stringify({ id: 1, name: 'Corte' }),
        { ex: 900 },
      );

      await this.redis.set(
        `whatsapp:session:${from}`,
        BotState.SELECT_PROFESSIONAL,
        { ex: 900 },
      );

      await this.whatsappService.sendText(
        config.phoneNumberId,
        from,
        'Serviço selecionado: Corte\n\nAgora escolha o profissional (Simulação: Digite 1 para João)',
        config.accessToken,
      );
    } else {
      await this.whatsappService.sendText(
        config.phoneNumberId,
        from,
        'Opção inválida. Por favor, digite 1 para Corte',
        config.accessToken,
      );
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

            if (config.isActive) {
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
