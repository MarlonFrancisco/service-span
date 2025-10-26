import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { StoreDto } from './dto/store.dto';
import { StoreOwnerGuard } from './guards';
import { StoresService } from './stores.services';

@Controller('partner/stores')
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async getStores(@CurrentUser('sub') userId: string) {
    return this.storesService.findAll(userId);
  }

  @Get(':id')
  async getStore(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @Post()
  async createStore(
    @Body() createStoreDto: unknown,
    @CurrentUser('sub') userId: string,
  ) {
    createStoreDto['owner'] = { id: userId };

    return this.storesService.create(new StoreDto(createStoreDto));
  }

  @Put(':id')
  @UseGuards(StoreOwnerGuard)
  async updateStore(@Param('id') id: string, @Body() updateStoreDto: unknown) {
    return this.storesService.update(id, new StoreDto(updateStoreDto));
  }

  @Delete(':id')
  @UseGuards(StoreOwnerGuard)
  async deleteStore(@Param('id') id: string) {
    return this.storesService.delete(id);
  }
}
