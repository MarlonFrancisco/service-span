import { useReviewsStore } from './reviews.store';

export const useReviews = () => {
  const {
    reviews,
    status,
    isOpen,
    businessName,
    averageRating,
    totalReviews,
    ratingDistribution,
    addReview,
    toggleReviewsModalAction,
  } = useReviewsStore();

  return {
    reviews,
    status,
    isOpen,
    businessName,
    averageRating,
    totalReviews,
    ratingDistribution,
    addReview,
    toggleReviewsModalAction,
  };
};
