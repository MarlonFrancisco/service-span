import { useState, useCallback } from 'react';
import type { TInteractiveStarRatingConfig } from './interactive-star-rating.types';

export const useInteractiveStarRating = ({
  rating,
  onChange,
}: TInteractiveStarRatingConfig) => {
  const [hoverRating, setHoverRating] = useState(0);

  const stars = [1, 2, 3, 4, 5];

  const handleStarClick = useCallback(
    (star: number) => {
      onChange(star);
    },
    [onChange],
  );

  const handleMouseEnter = useCallback((star: number) => {
    setHoverRating(star);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverRating(0);
  }, []);

  const getStarClassName = (star: number) => {
    const isActive = star <= (hoverRating || rating);
    const fillColor = isActive
      ? 'fill-yellow-400 text-yellow-400'
      : 'fill-gray-200 text-gray-200 hover:fill-yellow-200 hover:text-yellow-200';

    return `h-8 w-8 transition-colors ${fillColor}`;
  };

  return {
    stars,
    handleStarClick,
    handleMouseEnter,
    handleMouseLeave,
    getStarClassName,
  };
};
