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
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ServiceDto } from './service.dto';
import { ServiceService } from './service.service';

@Controller('partner/stores/:storeId/categories/:categoryId/services')
@UseGuards(JwtAuthGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async findAll(@Param('categoryId') categoryId: string) {
    return this.serviceService.findAll(categoryId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Post()
  async create(@Body() service: ServiceDto) {
    return this.serviceService.create(service);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() service: ServiceDto) {
    return this.serviceService.update(new ServiceDto({ ...service, id }));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.serviceService.delete(id);
  }
}
