import { Progress } from '@repo/ui';
import { Star } from 'lucide-react';

interface ReviewBarProps {
  stars: number;
  percentage: number;
}

export const ReviewBar = ({ stars, percentage }: ReviewBarProps) => {
  return (
    <div className="flex items-center space-x-3 text-sm">
      <span className="w-2 font-medium">{stars}</span>
      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
      <div className="flex-1">
        <Progress
          value={percentage}
          className="h-2 bg-gray-200 [&>div]:bg-yellow-500"
        />
      </div>
      <span className="w-8 text-right text-muted-foreground">
        {percentage}%
      </span>
    </div>
  );
};
