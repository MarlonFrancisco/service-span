'use client';

import { Card } from '@repo/ui';

function ServiceCardSkeleton() {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg bg-white p-0">
      <div className="md:flex">
        {/* Image Skeleton */}
        <div className="md:w-80 flex-shrink-0">
          <div className="h-64 md:h-full relative overflow-hidden bg-gray-200 animate-pulse" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              {/* Title */}
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-2" />

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              </div>

              {/* Location */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-40" />
              </div>
            </div>

            {/* Price */}
            <div className="text-right ml-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-24 mb-1" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
            </div>
          </div>

          {/* Services Section */}
          <div className="pt-4 pb-4 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2" />
            <div className="flex gap-2 flex-wrap">
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-24" />
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
            </div>
          </div>

          {/* Reviews Summary */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-48 mb-2" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
            <div className="h-10 bg-gray-200 rounded animate-pulse w-44" />
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
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-2" />
          <div className="h-5 bg-gray-200 rounded animate-pulse w-80" />
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 gap-8">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`animate-in transition-all duration-300 ${
              index === 0
                ? 'delay-0'
                : index === 1
                  ? 'delay-75'
                  : 'delay-150'
            }`}
          >
            <ServiceCardSkeleton />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
    </div>
  );
}
