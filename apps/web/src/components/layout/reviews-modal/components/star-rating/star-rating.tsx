import { Star } from 'lucide-react';
import { useStarRating } from './star-rating.hook';
import type { TStarRatingConfig } from './star-rating.types';

export const StarRating = ({ rating, size = 'default' }: TStarRatingConfig) => {
  const { stars, getStarClassName } = useStarRating({ rating, size });

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((star) => (
        <Star key={star} className={getStarClassName(star)} />
      ))}
    </div>
  );
};
