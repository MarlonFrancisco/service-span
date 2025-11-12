import { Skeleton } from '@repo/ui';

export const RecommendationCardSkeleton = () => {
  return (
    <div className="h-full select-none">
      <div className="h-full flex flex-col max-w-full">
        {/* Image Skeleton */}
        <Skeleton className="w-full aspect-square mb-3 rounded-xl" />

        {/* Content Section */}
        <div className="flex-grow flex flex-col gap-1">
          {/* Location and Rating */}
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-10" />
          </div>

          {/* Service Name */}
          <Skeleton className="h-4 w-full" />

          {/* Services Badge */}
          <Skeleton className="h-4 w-24" />

          {/* Price */}
          <div className="mt-1">
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};
