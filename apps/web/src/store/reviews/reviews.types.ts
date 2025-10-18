import { FetchingStatus } from '@/types/api';
import { IReview } from '@/types/reviews.types';

export interface IReviewStoreActions {
  addReview: (review: IReview) => void;
  toggleReviewsModalAction: (open: boolean) => void;
}

export interface IReviewsStore extends IReviewStoreActions {
  reviews: IReview[];
  status: FetchingStatus;
  isOpen: boolean;
  businessName: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
