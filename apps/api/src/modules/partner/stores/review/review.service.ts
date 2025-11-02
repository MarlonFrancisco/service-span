import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewDto } from './dto/review.dto';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(review: ReviewDto): Promise<Review> {
    return this.reviewRepository.save(review);
  }

  async findAll(storeId: string): Promise<Review[]> {
    return this.reviewRepository.find({ where: { store: { id: storeId } } });
  }

  async findOne(id: string): Promise<Review> {
    return this.reviewRepository.findOne({ where: { id } });
  }

  async update(id: string, review: ReviewDto): Promise<Review> {
    await this.reviewRepository.update(id, review);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
