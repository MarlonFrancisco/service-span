import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SendGrid from '@sendgrid/mail';

@Injectable()
export class NotificationService {
  constructor(private readonly configService: ConfigService) {
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

  async sendEmailOTP(to: string, code: string) {
    const subject = 'Código de verificação';
    const body = `Seu código de verificação é: ${code}`;
    return this.sendEmail(to, subject, body);
  }

  async sendSMSOTP(phoneNumber: string, code: string) {
    const message = `Seu código de verificação é: ${code}`;
    return this.sendSMS(phoneNumber, message);
  }
}
