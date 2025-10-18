import { IReview } from '@/types/reviews.types';
import { TStoreSet } from '@/types/store.types';
import { IReviewsStore } from './reviews.types';

export const addReviewAction =
  (set: TStoreSet<IReviewsStore>) => (review: IReview) => {
    set((state) => ({
      reviews: [...state.reviews, review],
      status: 'success',
    }));
  };

export const toggleReviewsModalAction =
  (set: TStoreSet<IReviewsStore>) => (open: boolean) => {
    set({
      isOpen: open,
    });
  };
