import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

@Injectable()
export class SMSService {
  private readonly sns: AWS.SNS;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: configService.get<string>('AWS_REGION', 'us-east-1'),
    });

    this.sns = new AWS.SNS({
      apiVersion: '2010-03-31',
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

  async sendOTP(
    phoneNumber: string,
    code: string,
  ): Promise<AWS.SNS.PublishResponse> {
    const message = `Seu código de verificação é: ${code}`;
    return this.sendSMS(phoneNumber, message);
  }

  getSNSClient(): AWS.SNS {
    return this.sns;
  }
}
