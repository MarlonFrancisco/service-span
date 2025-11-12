import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { FavoriteDto } from './dto/favorite.dto';
import { FavoritesService } from './favorites.service';

@Controller('users/:userId/favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async create(@Body() favorite: FavoriteDto, @Param('userId') userId: string) {
    return this.favoritesService.create(
      new FavoriteDto({ ...favorite, user: { id: userId } }),
    );
  }

  @Get()
  async findAll(@Param('userId') userId: string) {
    return this.favoritesService.findAll(userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.favoritesService.delete(id);
    return { id };
  }
}
