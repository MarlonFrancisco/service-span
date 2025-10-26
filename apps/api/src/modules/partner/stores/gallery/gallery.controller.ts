import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GalleryDto } from './dto/gallery.dto';
import { GalleryService } from './gallery.service';

@Controller('partner/stores/:storeId/gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  async findAll(@Param('storeId') storeId: string) {
    return this.galleryService.findAll(storeId);
  }

  @Post()
  async create(
    @Param('storeId') storeId: string,
    @Body() galleryDto: GalleryDto,
  ) {
    return this.galleryService.create(
      new GalleryDto({ ...galleryDto, store: { id: storeId } }),
    );
  }

  @Patch(':id')
  async update(
    @Param('storeId') storeId: string,
    @Param('id') id: string,
    @Body() image: GalleryDto,
  ) {
    return this.galleryService.updateMainImage(
      new GalleryDto({ ...image, id, store: { id: storeId } }),
    );
  }

  @Delete(':id')
  async delete(@Param('storeId') storeId: string, @Param('id') id: string) {
    return this.galleryService.delete(storeId, id);
  }
}
