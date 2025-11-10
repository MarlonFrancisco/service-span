import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteDto } from './dto/favorite.dto';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async create(favorite: FavoriteDto): Promise<Favorite> {
    return this.favoriteRepository.save(favorite);
  }

  async findAll(userId: string): Promise<Favorite[]> {
    return this.favoriteRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: string): Promise<Favorite> {
    return this.favoriteRepository.findOne({ where: { id } });
  }

  async update(favorite: FavoriteDto): Promise<Favorite> {
    await this.favoriteRepository.update(favorite.id, favorite);
    return this.findOne(favorite.id);
  }

  async delete(id: string): Promise<void> {
    await this.favoriteRepository.delete(id);
  }
}
