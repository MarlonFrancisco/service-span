import { Module } from '@nestjs/common';
import { CategoryModule } from '../partner/stores/category';
import { WhatsappModule } from '../partner/stores/whatsapp';
import { WhatsappBotController } from './whatsapp-bot.controller';
import { WhatsappBotService } from './whatsapp-bot.service';

@Module({
  imports: [WhatsappModule, CategoryModule],
  controllers: [WhatsappBotController],
  providers: [WhatsappBotService],
})
export class WhatsappBotModule {}
