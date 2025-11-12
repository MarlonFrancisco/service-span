import { Skeleton } from '@repo/ui';

export const FeaturesSkeleton = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-3" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Feature Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <Skeleton className="h-14 w-14 rounded-2xl" />
              </div>
              {/* Title */}
              <Skeleton className="h-6 w-48 mx-auto mb-3" />
              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full mx-auto" />
                <Skeleton className="h-4 w-5/6 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
