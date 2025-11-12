import { Star } from 'lucide-react';
import type { TRatingBarConfig } from './rating-bar.types';

export const RatingBar = ({ rating, percentage }: TRatingBarConfig) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-700 w-4">{rating}</span>
      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-600 w-10 text-right">
        {percentage}%
      </span>
    </div>
  );
};
