import { Star } from 'lucide-react';
import { useInteractiveStarRating } from './interactive-star-rating.hook';
import type { TInteractiveStarRatingConfig } from './interactive-star-rating.types';

export const InteractiveStarRating = ({
  rating,
  onChange,
}: TInteractiveStarRatingConfig) => {
  const {
    stars,
    handleStarClick,
    handleMouseEnter,
    handleMouseLeave,
    getStarClassName,
  } = useInteractiveStarRating({ rating, onChange });

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded"
        >
          <Star className={getStarClassName(star)} />
        </button>
      ))}
    </div>
  );
};
