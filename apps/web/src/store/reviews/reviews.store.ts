import { BOOKING_REVIEWS_MOCK } from '@/utils/constants/booking.constants';
import { create } from 'zustand';
import { addReviewAction, toggleReviewsModalAction } from './reviews.actions';
import { IReviewsStore } from './reviews.types';

export const useReviewsStore = create<IReviewsStore>((set) => ({
  reviews: BOOKING_REVIEWS_MOCK,
  status: 'idle',
  isOpen: false,
  businessName: '',
  averageRating: 0,
  totalReviews: 0,
  ratingDistribution: {
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
    '1': 0,
  },
  addReview: addReviewAction(set),
  toggleReviewsModalAction: toggleReviewsModalAction(set),
}));
