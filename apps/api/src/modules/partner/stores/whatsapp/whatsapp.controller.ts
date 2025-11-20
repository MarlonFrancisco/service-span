import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { SaveWhatsappConfigDto } from './dto/save-whatsapp-config.dto';
import { WhatsappService } from './whatsapp.service';

@Controller('partner/stores/:storeId/whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post()
  async saveConfig(
    @Body() body: SaveWhatsappConfigDto,
    @Param('storeId') storeId: string,
  ) {
    const config = await this.whatsappService.save(
      new SaveWhatsappConfigDto({
        ...body,
        store: { id: storeId },
      }),
    );
    return config;
  }

  @Get()
  async getConfig(@Param('storeId') storeId: string) {
    const config = await this.whatsappService.findOne({
      store: { id: storeId },
    });

    if (!config) {
      throw new NotFoundException('Configuração do WhatsApp não encontrada');
    }

    return config;
  }
}
