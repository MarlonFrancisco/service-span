import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sharp from 'sharp';
import { StorageService } from 'src/modules/storage/storage.service';
import { Repository } from 'typeorm';
import { GalleryDto } from './dto/gallery.dto';
import { Gallery } from './gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
    private readonly storageService: StorageService,
  ) {}

  async create(galleryDto: GalleryDto): Promise<Gallery> {
    let gallery = this.galleryRepository.create(galleryDto);

    gallery = await this.galleryRepository.save(gallery);

    const cleanBase64 = galleryDto.url.split('base64,')[1];
    const arrayBuffer = Buffer.from(cleanBase64, 'base64');
    const webpBuffer = await sharp(arrayBuffer).webp().toBuffer();

    gallery.url = await this.storageService.uploadFile({
      bucket: 'stores',
      filePath: `${gallery.store.id}/gallery/${gallery.id}.webp`,
      file: webpBuffer,
    });

    return this.galleryRepository.save(gallery);
  }

  async findAll(storeId: string): Promise<Gallery[]> {
    return this.galleryRepository.find({ where: { store: { id: storeId } } });
  }

  async findOne(id: string): Promise<Gallery> {
    return this.galleryRepository.findOne({ where: { id } });
  }

  async update(gallery: GalleryDto): Promise<void> {
    await this.galleryRepository.update(gallery.id, gallery);
  }

  async delete(storeId: string, id: string): Promise<void> {
    await this.galleryRepository.delete(id);
    await this.storageService.deleteFile({
      bucket: 'stores',
      path: `${storeId}/gallery/${id}.webp`,
    });
  }

  async updateMainImage(gallery: GalleryDto): Promise<void> {
    const image = await this.galleryRepository.findOne({
      where: { store: { id: gallery.store.id }, isMain: true },
    });

    if (image) {
      image.isMain = false;
      await this.galleryRepository.save(image);
    }

    await this.update(gallery);
  }
}
