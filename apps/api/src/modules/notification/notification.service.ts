import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

@Injectable()
export class NotificationService {
  private readonly sns: AWS.SNS;
  private readonly email: AWS.SES;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: configService.get<string>('AWS_REGION', 'us-east-1'),
    });

    this.sns = new AWS.SNS({
      apiVersion: '2010-03-31',
    });

    this.email = new AWS.SES({
      apiVersion: '2010-12-01',
    });
  }

  async sendSMS(
    phoneNumber: string,
    message: string,
  ): Promise<AWS.SNS.PublishResponse> {
    const params: AWS.SNS.PublishInput = {
      Message: message,
      PhoneNumber: phoneNumber,
    };

    return this.sns.publish(params).promise();
  }

  async sendEmail(
    to: string,
    subject: string,
    body: string,
  ): Promise<AWS.SES.SendEmailResponse> {
    const params: AWS.SES.SendEmailRequest = {
      Source: 'no-reply@service-span.com',
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Html: {
            Data: body,
          },
        },
      },
    };

    return this.email.sendEmail(params).promise();
  }

  async sendEmailOTP(
    to: string,
    code: string,
  ): Promise<AWS.SES.SendEmailResponse> {
    const subject = 'Código de verificação';
    const body = `Seu código de verificação é: ${code}`;
    return this.sendEmail(to, subject, body);
  }

  async sendSMSOTP(
    phoneNumber: string,
    code: string,
  ): Promise<AWS.SNS.PublishResponse> {
    const message = `Seu código de verificação é: ${code}`;
    return this.sendSMS(phoneNumber, message);
  }
}
