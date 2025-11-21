import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { SaveWhatsappConfigDto } from './dto/save-whatsapp-config.dto';
import { WhatsappConfig } from './whatsapp.entity';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private readonly baseUrl = 'https://graph.facebook.com/v22.0';

  constructor(
    @InjectRepository(WhatsappConfig)
    private readonly whatsappConfigRepository: Repository<WhatsappConfig>,
    private readonly configService: ConfigService,
  ) {}

  async sendMessage(
    phoneNumberId: string,
    to: string,
    message: any,
    accessToken: string,
  ) {
    try {
      const url = `${this.baseUrl}/${phoneNumberId}/messages`;
      await axios.post(
        url,
        {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          ...message,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error: any) {
      this.logger.error(
        `Failed to send WhatsApp message to ${to}`,
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async sendText(
    phoneNumberId: string,
    to: string,
    text: string,
    accessToken: string,
  ) {
    return this.sendMessage(
      phoneNumberId,
      to,
      { type: 'text', text: { body: text } },
      accessToken,
    );
  }

  async sendInteractiveButtons(
    phoneNumberId: string,
    to: string,
    text: string,
    buttons: { id: string; title: string }[],
    accessToken: string,
  ) {
    return this.sendMessage(
      phoneNumberId,
      to,
      {
        type: 'interactive',
        interactive: {
          type: 'button',
          body: { text },
          action: {
            buttons: buttons.map((btn) => ({
              type: 'reply',
              reply: { id: btn.id, title: btn.title },
            })),
          },
        },
      },
      accessToken,
    );
  }

  async save(config: SaveWhatsappConfigDto) {
    const configResult = await this.whatsappConfigRepository.save(config);

    return { ...configResult, store: config.store };
  }

  async findOne(config: Partial<SaveWhatsappConfigDto>) {
    const result = await this.whatsappConfigRepository.findOne({
      relations: ['store'],
      where: config,
    });

    return (
      result ||
      ({
        webhookVerifyToken: this.configService.get('WHATSAPP_VERIFY_TOKEN'),
      } as WhatsappConfig)
    );
  }
}
