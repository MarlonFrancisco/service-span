import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('partner/stores/:storeId/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Param('storeId') storeId: string, @Body() review: ReviewDto) {
    return this.reviewService.create(
      new ReviewDto({ ...review, store: { id: storeId } }),
    );
  }

  @Get()
  async findAll(@Param('storeId') storeId: string) {
    return this.reviewService.findAll(storeId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() review: ReviewDto) {
    return this.reviewService.update(id, review);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
