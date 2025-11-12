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
    const createdReview = await this.reviewRepository.save(review);
    return this.findOne(createdReview.id);
  }

  async findAll(storeId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { store: { id: storeId } },
      relations: ['user', 'store'],
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          avatar: true,
        },
        store: {
          id: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<Review> {
    return this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'store'],
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          avatar: true,
        },
        store: {
          id: true,
        },
      },
    });
  }

  async update(id: string, review: ReviewDto): Promise<Review> {
    await this.reviewRepository.update(id, review);
    return this.findOne(id);
  }

  async delete(id: string): Promise<{ id: string }> {
    await this.reviewRepository.delete(id);
    return { id };
  }
}
