import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from '@upstash/redis';
import {
  extractNumberFromText,
  filterAvailableTimeSlots,
  formatTimeSlotsForMessage,
  generateTimeSlots,
  getTimeSlotByIndex,
} from '../../utils/helpers/schedule.helpers';
import {
  mapCategoryToWhatsappInteractiveList,
  mapStoreMemberToWhatsappInteractiveList,
  validateDateForBooking,
} from '../../utils/helpers/whatsapp.helpers';
import { CategoryService } from '../partner/stores/category/category.service';
import { ServiceService } from '../partner/stores/category/service/service.service';
import { CreateSchedulesDto } from '../partner/stores/schedule/dto/create-schedule.dto';
import { ScheduleService } from '../partner/stores/schedule/schedule.service';
import { StoreMemberService } from '../partner/stores/store-member/store-member.service';
import { WhatsappConfig } from '../partner/stores/whatsapp/whatsapp.entity';
import { WhatsappService } from '../partner/stores/whatsapp/whatsapp.service';
import {
  IWhatsappWebhook,
  IWhatsappWebhookMessage,
} from './whatsapp-bot.types';

export enum BotState {
  MENU = 'MENU',
  SELECT_SERVICE = 'SELECT_SERVICE',
  SELECT_STORE_MEMBER = 'SELECT_STORE_MEMBER',
  SELECT_DATE = 'SELECT_DATE',
  SELECT_TIME = 'SELECT_TIME',
  CONFIRM_BOOKING = 'CONFIRM_BOOKING',
}

@Injectable()
export class WhatsappBotService {
  private readonly logger = new Logger(WhatsappBotService.name);
  private redis: Redis;
  private config: WhatsappConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly whatsappService: WhatsappService,
    private readonly categoryService: CategoryService,
    private readonly serviceService: ServiceService,
    private readonly storeMemberService: StoreMemberService,
    private readonly scheduleService: ScheduleService,
  ) {
    this.redis = new Redis({
      url: this.configService.get('REDIS_REST_URL'),
      token: this.configService.get('REDIS_REST_TOKEN'),
    });
  }

  async handleIncomingMessage(message: IWhatsappWebhookMessage) {
    const from = message.from; // User's phone number
    const text =
      message.text?.body ||
      message.interactive?.button_reply?.id ||
      message.interactive?.list_reply?.id;

    this.logger.log('text', text);

    if (!text) return;

    const sessionKey = `whatsapp:session:${from}`;
    const state = (await this.redis.get<BotState>(sessionKey)) || BotState.MENU;

    this.logger.log(`Processing message from ${from} in state ${state}`);

    switch (state) {
      case BotState.MENU:
        await this.handleMenuState(from, text);
        break;
      case BotState.SELECT_SERVICE:
        await this.handleServiceState(from, text);
        break;
      case BotState.SELECT_STORE_MEMBER:
        await this.handleStoreMemberState(from, text);
        break;
      case BotState.SELECT_DATE:
        await this.handleDateState(from, text);
        break;
      case BotState.SELECT_TIME:
        await this.handleTimeState(from, text);
        break;
      case BotState.CONFIRM_BOOKING:
        await this.handleConfirmBookingState(from, text);
        break;
      default:
        await this.sendMenu(from);
    }
  }

  private async handleMenuState(from: string, text: string) {
    if (text.toLowerCase().includes('agendar')) {
      const categories = await this.categoryService.findAll(
        this.config.store.id,
      );

      await this.whatsappService.sendInteractiveList({
        phoneNumberId: this.config.phoneNumberId,
        to: from,
        headerText: 'Serviços disponíveis',
        bodyText: 'Por favor, escolha o serviço',
        footerText: 'Selecione um serviço',
        buttonText: 'Selecionar Serviço',
        sections: categories.map(mapCategoryToWhatsappInteractiveList),
        accessToken: this.config.accessToken,
      });

      await this.redis.set(
        `whatsapp:session:${from}`,
        BotState.SELECT_SERVICE,
        {
          ex: 900, // 15 mins TTL
        },
      );
    } else {
      await this.sendMenu(from);
    }
  }

  private async handleServiceState(from: string, text: string) {
    try {
      const service = await this.serviceService.findOne(text);

      if (!service) {
        return void this.whatsappService.sendText(
          this.config.phoneNumberId,
          from,
          'Serviço não encontrado. Por favor, escolha um serviço disponível.',
          this.config.accessToken,
        );
      }

      await this.redis.set(
        `whatsapp:session:${from}:service`,
        JSON.stringify({
          id: service.id,
          name: service.name,
          duration: service.duration,
        }),
        { ex: 900 },
      );

      const storeMembers = await this.storeMemberService.findStoreMembers(
        this.config.store.id,
      );

      const storeMembersWithService = storeMembers.filter((storeMember) =>
        storeMember.services.some((s) => s.id === service.id),
      );

      if (storeMembersWithService.length > 0) {
        await this.redis.set(
          `whatsapp:session:${from}`,
          BotState.SELECT_STORE_MEMBER,
          { ex: 900 },
        );

        await this.whatsappService.sendInteractiveList({
          phoneNumberId: this.config.phoneNumberId,
          to: from,
          headerText: 'Profissionais disponíveis',
          bodyText: 'Por favor, escolha o profissional',
          footerText: 'Selecione um profissional',
          buttonText: 'Selecionar Profissional',
          sections: storeMembersWithService.map(
            mapStoreMemberToWhatsappInteractiveList,
          ),
          accessToken: this.config.accessToken,
        });
      }
    } catch (error) {
      this.logger.error('Failed to handle service state', error);
      return await this.whatsappService.sendText(
        this.config.phoneNumberId,
        from,
        'Ocorreu um erro ao processar o serviço. Por favor, tente novamente mais tarde.',
        this.config.accessToken,
      );
    }
  }

  private async handleStoreMemberState(from: string, text: string) {
    const storeMember =
      await this.storeMemberService.findStoreMemberWithSchedules(
        this.config.store.id,
        text,
      );

    if (!storeMember) {
      return await this.whatsappService.sendText(
        this.config.phoneNumberId,
        from,
        'Profissionais não encontrados para esse serviço.',
        this.config.accessToken,
      );
    }

    await this.redis.set(
      `whatsapp:session:${from}:storeMember`,
      JSON.stringify({
        id: storeMember.id,
        name: storeMember.user.firstName + ' ' + storeMember.user.lastName,
        blockedTimes: storeMember.blockedTimes,
        schedules: storeMember.schedules,
      }),
      { ex: 900 },
    );

    await this.redis.set(`whatsapp:session:${from}`, BotState.SELECT_DATE, {
      ex: 900,
    });

    await this.whatsappService.sendText(
      this.config.phoneNumberId,
      from,
      'Por favor, digite a data desejada no formato DD/MM/AAAA\n\nExemplo: 25/12/2025',
      this.config.accessToken,
    );
  }

  private async handleDateState(from: string, text: string) {
    const result = validateDateForBooking(text, this.config.store.businessDays);

    if (result.isValid === false) {
      await this.whatsappService.sendText(
        this.config.phoneNumberId,
        from,
        result.error,
        this.config.accessToken,
      );
      return;
    }

    await this.redis.set(
      `whatsapp:session:${from}:date`,
      result.date.toISOString(),
      { ex: 900 },
    );

    await this.redis.set(`whatsapp:session:${from}`, BotState.SELECT_TIME, {
      ex: 900,
    });

    // Busca storeMember selecionado do Redis (já contém schedules e blockedTimes)
    const storeMemberData = await this.redis.get<string>(
      `whatsapp:session:${from}:storeMember`,
    );
    const storeMember = storeMemberData ? JSON.parse(storeMemberData) : null;

    if (!storeMember) {
      await this.whatsappService.sendText(
        this.config.phoneNumberId,
        from,
        'Erro ao recuperar profissional. Por favor, reinicie o processo.',
        this.config.accessToken,
      );

      void this.clearSession(from);

      void this.sendMenu(from);

      return;
    }

    // Gera todos os slots possíveis
    const allSlots = generateTimeSlots(
      this.config.store.openTime,
      this.config.store.closeTime,
      this.config.store.lunchStartTime,
      this.config.store.lunchEndTime,
    );

    // Filtra slots disponíveis usando dados do Redis
    const availableSlots = filterAvailableTimeSlots(
      allSlots,
      result.date,
      storeMember.blockedTimes || [],
      storeMember.schedules || [],
    );

    // Armazena os slots disponíveis no Redis para validação posterior
    await this.redis.set(
      `whatsapp:session:${from}:availableSlots`,
      JSON.stringify(availableSlots),
      { ex: 900 },
    );

    // Envia mensagem com horários disponíveis
    const message = formatTimeSlotsForMessage(availableSlots);
    await this.whatsappService.sendText(
      this.config.phoneNumberId,
      from,
      `Data selecionada: ${text}\n\n${message}`,
      this.config.accessToken,
    );
  }

  private async handleTimeState(from: string, text: string) {
    // Recupera slots disponíveis do Redis
    const slotsData = await this.redis.get<string>(
      `whatsapp:session:${from}:availableSlots`,
    );
    const availableSlots = slotsData ? JSON.parse(slotsData) : [];

    if (availableSlots.length === 0) {
      await this.whatsappService.sendText(
        this.config.phoneNumberId,
        from,
        'Erro ao recuperar horários disponíveis. Por favor, reinicie o processo.',
        this.config.accessToken,
      );
      return;
    }

    // Extrai número do texto (permite "1", "número 1", "quero o 3", etc)
    const selectedIndex = extractNumberFromText(text);

    if (selectedIndex === null) {
      await this.whatsappService.sendText(
        this.config.phoneNumberId,
        from,
        'Por favor, informe o número correspondente ao horário desejado.',
        this.config.accessToken,
      );
      return;
    }

    // Obtém o horário selecionado
    const selectedTime = getTimeSlotByIndex(availableSlots, selectedIndex);

    if (!selectedTime) {
      await this.whatsappService.sendText(
        this.config.phoneNumberId,
        from,
        `Opção inválida. Por favor, escolha um número entre 1 e ${availableSlots.length}.`,
        this.config.accessToken,
      );
      return;
    }

    // Salva o horário no Redis
    await this.redis.set(`whatsapp:session:${from}:time`, selectedTime, {
      ex: 900,
    });

    await this.redis.set(`whatsapp:session:${from}`, BotState.CONFIRM_BOOKING, {
      ex: 900,
    });

    // Recupera informações para resumo
    const serviceData = await this.redis.get<string>(
      `whatsapp:session:${from}:service`,
    );
    const storeMemberData = await this.redis.get<string>(
      `whatsapp:session:${from}:storeMember`,
    );
    const dateData = await this.redis.get<string>(
      `whatsapp:session:${from}:date`,
    );

    const service = serviceData ? JSON.parse(serviceData) : null;
    const storeMember = storeMemberData ? JSON.parse(storeMemberData) : null;
    const date = dateData ? new Date(dateData) : null;

    // Formata a data para exibição
    const formattedDate = date
      ? date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : '';

    // Envia resumo com botões de confirmação
    const summary =
      `📋 *Resumo do Agendamento*\n\n` +
      `📌 Serviço: ${service?.name || 'N/A'}\n` +
      `👤 Profissional: ${storeMember?.name || 'N/A'}\n` +
      `📅 Data: ${formattedDate}\n` +
      `🕐 Horário: ${selectedTime}\n\n` +
      `Confirmar agendamento?`;

    await this.whatsappService.sendInteractiveButtons(
      this.config.phoneNumberId,
      from,
      summary,
      [
        { id: 'confirmar', title: '✅ Confirmar' },
        { id: 'cancelar', title: '❌ Cancelar' },
      ],
      this.config.accessToken,
    );
  }

  private async handleConfirmBookingState(from: string, text: string) {
    const response = text.toLowerCase();

    if (response.includes('cancelar')) {
      await this.clearSession(from);

      await this.whatsappService.sendText(
        this.config.phoneNumberId,
        from,
        'Agendamento cancelado. Digite "agendar" para fazer um novo agendamento.',
        this.config.accessToken,
      );
      return;
    }

    if (!response.includes('confirmar')) {
      await this.whatsappService.sendText(
        this.config.phoneNumberId,
        from,
        'Por favor, escolha "✅ Confirmar" ou "❌ Cancelar".',
        this.config.accessToken,
      );
      return;
    }

    // Recupera todas as informações da sessão
    const serviceData = await this.redis.get<string>(
      `whatsapp:session:${from}:service`,
    );
    const storeMemberData = await this.redis.get<string>(
      `whatsapp:session:${from}:storeMember`,
    );
    const dateData = await this.redis.get<string>(
      `whatsapp:session:${from}:date`,
    );
    const timeData = await this.redis.get<string>(
      `whatsapp:session:${from}:time`,
    );

    const service = serviceData ? JSON.parse(serviceData) : null;
    const storeMember = storeMemberData ? JSON.parse(storeMemberData) : null;
    const date = dateData ? new Date(dateData) : null;
    const time = timeData || '';

    if (!service || !storeMember || !date || !time) {
      await this.whatsappService.sendText(
        this.config.phoneNumberId,
        from,
        'Erro ao recuperar informações do agendamento. Por favor, reinicie o processo.',
        this.config.accessToken,
      );
      return;
    }

    try {
      await this.scheduleService.create(
        new CreateSchedulesDto({
          storeId: this.config.store.id,
          storeMember: { id: storeMember.id },
          services: [{ id: service.id, duration: service.duration }],
          user: { telephone: from },
          date,
          startTime: time,
        }),
      );

      await this.clearSession(from);

      const formattedDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      await this.whatsappService.sendText(
        this.config.phoneNumberId,
        from,
        `✅ *Agendamento Confirmado!*\n\n` +
          `📌 Serviço: ${service.name}\n` +
          `👤 Profissional: ${storeMember.name}\n` +
          `📅 Data: ${formattedDate}\n` +
          `🕐 Horário: ${time}\n\n` +
          `Aguardamos você! 😊`,
        this.config.accessToken,
      );
    } catch (error) {
      this.logger.error('Failed to create schedule', error);
      await this.whatsappService.sendText(
        this.config.phoneNumberId,
        from,
        'Erro ao criar agendamento. Por favor, tente novamente mais tarde.',
        this.config.accessToken,
      );
    }
  }

  /**
   * Limpa todas as chaves da sessão do Redis para um usuário
   */
  private async clearSession(from: string): Promise<void> {
    await this.redis.del(`whatsapp:session:${from}`);
    await this.redis.del(`whatsapp:session:${from}:service`);
    await this.redis.del(`whatsapp:session:${from}:storeMember`);
    await this.redis.del(`whatsapp:session:${from}:date`);
    await this.redis.del(`whatsapp:session:${from}:time`);
    await this.redis.del(`whatsapp:session:${from}:availableSlots`);
  }

  private async sendMenu(from: string) {
    await this.whatsappService.sendInteractiveButtons(
      this.config.phoneNumberId,
      from,
      'Olá! Como posso ajudar?',
      [
        { id: 'agendar', title: '📅 Agendar' },
        { id: 'meus_agendamentos', title: '📋 Meus Agendamentos' },
      ],
      this.config.accessToken,
    );
  }

  async handleWebhookMessage(body: IWhatsappWebhook) {
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.value.messages) {
            const message = change.value.messages[0];
            const businessPhoneNumberId = change.value.metadata.phone_number_id;
            this.logger.log('handleWebhookMessage', JSON.stringify(body));

            this.config = await this.whatsappService.findOne({
              phoneNumberId: businessPhoneNumberId,
            });

            if (this.config.isActive) {
              await this.handleIncomingMessage(message);
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
