import { useReviewsStore } from '@/store';
import { useCallback, useMemo } from 'react';

export const useReviewsContent = () => {
  const { reviews, showWriteReview, setReviewsAttributesAction } =
    useReviewsStore();

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return (
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    );
  }, [reviews]);

  const totalReviews = useMemo(() => reviews.length, [reviews]);

  const ratingDistribution = useMemo(() => {
    const distribution = reviews.reduce(
      (acc, review) => {
        const rating = Math.floor(review.rating);
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    // Calculate percentages
    const distributionPercentage: Record<number, number> = {};
    [5, 4, 3, 2, 1].forEach((rating) => {
      const count = distribution[Math.floor(rating)] || 0;
      distributionPercentage[rating] =
        totalReviews > 0 ? Math.floor((count / totalReviews) * 100) : 0;
    });

    return distributionPercentage;
  }, [reviews, totalReviews]);

  const handleShowWriteReview = useCallback(() => {
    setReviewsAttributesAction({ showWriteReview: true });
  }, []);

  return {
    reviews,
    showWriteReview,
    averageRating,
    totalReviews,
    ratingDistribution,
    handleShowWriteReview,
  };
};
