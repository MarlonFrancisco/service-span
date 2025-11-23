import { Module } from '@nestjs/common';
import { WhatsappModule } from '../partner/stores/whatsapp';
import { NotificationService } from './notification.service';

@Module({
  imports: [WhatsappModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
