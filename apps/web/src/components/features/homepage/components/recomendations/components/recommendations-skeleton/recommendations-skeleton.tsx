import { RecommendationCardSkeleton } from '../recommendation-card-skeleton';

export const RecommendationsSkeleton = () => {
  return (
    <div className="flex flex-col gap-20 mb-10">
      <section className="px-4 w-full max-w-7xl md:px-6 mx-auto">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-3">
          <div className="w-full md:w-auto">
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md mb-2" />
            <div className="h-5 w-64 bg-gray-200 animate-pulse rounded-md" />
          </div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <RecommendationCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
};
