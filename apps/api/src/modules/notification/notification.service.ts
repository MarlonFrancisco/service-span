import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SendGrid from '@sendgrid/mail';
import fs from 'fs/promises';
import handlebars from 'handlebars';
import path from 'path';
import { WhatsappService } from '../partner/stores/whatsapp';

@Injectable()
export class NotificationService {
  constructor(
    private readonly configService: ConfigService,
    private readonly whatsappService: WhatsappService,
  ) {
    SendGrid.setApiKey(configService.get<string>('SENDGRID_API_KEY'));
  }

  async sendSMS(phoneNumber: string, message: string) {
    return SendGrid.send({
      to: phoneNumber,
      from: 'general@ssnap.io',
      subject: 'SMS Notification',
      text: message,
    });
  }

  async sendEmail(to: string, subject: string, body: string) {
    return SendGrid.send({
      to: to,
      from: 'general@ssnap.io',
      subject: subject,
      html: body,
    });
  }

  async sendWhatsapp({
    phoneNumberId,
    to,
    message,
    accessToken,
  }: {
    phoneNumberId: string;
    to: string;
    message: string;
    accessToken: string;
  }) {
    return this.whatsappService.sendText(
      phoneNumberId,
      to,
      message,
      accessToken,
    );
  }

  async sendEmailOTP(to: string, code: string) {
    const subject = 'Código de verificação';
    const body = `Seu código de verificação é: ${code}`;
    return this.sendEmail(to, subject, body);
  }

  async sendSMSOTP(phoneNumber: string, code: string) {
    const message = `Seu código de verificação é: ${code}`;
    return this.sendSMS(phoneNumber, message);
  }

  async invoicePaid(to: string, invoiceId: string, currentPeriodEnd: string) {
    const template = await fs.readFile(
      path.join(process.cwd(), 'src', 'templates', 'invoice-paid.hbs'),
      'utf8',
    );

    const body = handlebars.compile(template)({ invoiceId, currentPeriodEnd });

    return this.sendEmail(to, 'Pagamento Recebido - Assinatura Ativa', body);
  }

  async paymentFailed(to: string, invoiceId: string, attemptCount: number) {
    const template = await fs.readFile(
      path.join(process.cwd(), 'src', 'templates', 'payment-failed.hbs'),
      'utf8',
    );

    const body = handlebars.compile(template)({ invoiceId, attemptCount });

    return this.sendEmail(to, 'Pagamento Falhou - Assinatura Inativa', body);
  }
}
