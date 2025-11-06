'use client';

import { Skeleton } from '@repo/ui';
import { Card } from '@repo/ui';

function ServiceCardSkeleton() {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg bg-white p-0">
      <div className="md:flex">
        {/* Image Skeleton */}
        <div className="md:w-80 flex-shrink-0">
          <Skeleton className="h-64 md:h-full" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 p-6 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-3">
              {/* Title */}
              <Skeleton className="h-6 w-3/4" />

              {/* Rating */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Location */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>

            {/* Price */}
            <div className="text-right space-y-1">
              <Skeleton className="h-6 w-24 ml-auto" />
              <Skeleton className="h-4 w-20 ml-auto" />
            </div>
          </div>

          {/* Services Section */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2 flex-wrap">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>

          {/* Reviews Summary */}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-full" />
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-44" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ResultsListSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <ServiceCardSkeleton />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
