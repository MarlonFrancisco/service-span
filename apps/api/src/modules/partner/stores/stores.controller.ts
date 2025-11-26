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
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { Public } from '../../auth/decorators/public.decorator';
import { StoreDto } from './dto/store.dto';
import { StoreOwnerGuard } from './guards';
import { StoresService } from './stores.services';

@Controller('partner/stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async getStores(@CurrentUser('sub') userId: string) {
    return this.storesService.findAll(userId);
  }

  @Public()
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

    return this.storesService.create(plainToInstance(StoreDto, createStoreDto));
  }

  @Put(':id')
  @UseGuards(StoreOwnerGuard)
  async updateStore(@Param('id') id: string, @Body() updateStoreDto: unknown) {
    return this.storesService.update(id, plainToInstance(StoreDto, updateStoreDto));
  }

  @Delete(':id')
  @UseGuards(StoreOwnerGuard)
  async deleteStore(@Param('id') id: string) {
    await this.storesService.delete(id);
    return { id };
  }
}
