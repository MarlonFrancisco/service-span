import { ReviewsService } from '@/service/reviews/reviews.service';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const useReviewsQuery = ({ storeId }: { storeId: string }) => {
  const { data: reviews, isPending: isPendingReviews } = useQuery({
    queryKey: CACHE_QUERY_KEYS.reviews(storeId),
    queryFn: () => ReviewsService.getByStore(storeId),
    enabled: !!storeId,
  });

  return { reviews, isPendingReviews };
};
