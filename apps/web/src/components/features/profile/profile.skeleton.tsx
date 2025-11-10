'use client';

import { Header } from '@/components/layout';
import { Skeleton } from '@repo/ui';
import type { TProfileConfig } from './profile.types';

export const ProfileSkeleton = ({ className }: TProfileConfig) => {
  return (
    <Header>
      <div className={className}>
        {/* Profile Header Skeleton */}
        <div className="relative border-b border-gray-200 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Avatar Skeleton */}
              <div className="relative flex-shrink-0">
                <Skeleton className="w-28 h-28 sm:w-32 sm:h-32 rounded-full" />
                <Skeleton className="absolute bottom-0 right-0 w-11 h-11 rounded-full" />
              </div>

              {/* Name & Meta Info Skeleton */}
              <div className="flex-1 min-w-0 w-full sm:w-auto">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <Skeleton className="h-8 w-48 mb-2" />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Skeleton className="h-4 w-32" />
                    </div>

                    {/* Verification badges skeleton */}
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-6 w-28 rounded-full" />
                    </div>
                  </div>

                  {/* Actions Menu Skeleton */}
                  <Skeleton className="h-9 w-9 rounded-md flex-shrink-0" />
                </div>
              </div>

              {/* Profile Stats Skeleton */}
              <div className="hidden sm:flex flex-col gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="text-right">
                    <Skeleton className="h-4 w-16 mb-1 ml-auto" />
                    <Skeleton className="h-6 w-12 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Tabs Skeleton */}
          <div className="my-8">
            <div className="hidden md:flex justify-start gap-8">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-32" />
              ))}
            </div>
            <div className="md:hidden mt-4 h-auto w-full grid grid-cols-3 gap-2 p-1">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-8 pb-12">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <Skeleton className="h-7 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Image Skeleton */}
                  <Skeleton className="w-full h-52" />

                  {/* Content Skeleton */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <Skeleton className="h-5 w-16 ml-3" />
                    </div>

                    <Skeleton className="h-16 w-full mb-4 rounded-lg" />

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};
