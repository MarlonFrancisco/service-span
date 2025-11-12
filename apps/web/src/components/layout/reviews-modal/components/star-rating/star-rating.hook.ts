import type { TStarRatingConfig } from './star-rating.types';

export const useStarRating = ({ rating, size = 'default' }: TStarRatingConfig) => {
  const sizeClasses = {
    small: 'h-3.5 w-3.5',
    default: 'h-4 w-4',
    large: 'h-5 w-5',
  };

  const stars = [1, 2, 3, 4, 5];

  const getStarClassName = (star: number) => {
    const baseSize = sizeClasses[size];
    const fillColor = star <= rating
      ? 'fill-yellow-400 text-yellow-400'
      : 'fill-gray-200 text-gray-200';

    return `${baseSize} ${fillColor}`;
  };

  return {
    stars,
    getStarClassName,
  };
};
