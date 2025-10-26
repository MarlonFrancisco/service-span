import { Skeleton } from '@repo/ui';

export const StatsCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <Skeleton className="w-full h-34 bg-gray-200 rounded-md" />

      <Skeleton className="w-full h-34 bg-gray-200 rounded-md" />
    </div>
  );
};
