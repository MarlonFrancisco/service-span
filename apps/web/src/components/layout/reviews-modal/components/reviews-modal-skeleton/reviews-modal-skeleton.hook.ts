export function useReviewsModalSkeleton() {
  const skeletonItems = {
    ratingBars: Array.from({ length: 5 }, (_, i) => i + 1),
    reviewCards: Array.from({ length: 3 }, (_, i) => i + 1),
  };

  return {
    skeletonItems,
  };
}
