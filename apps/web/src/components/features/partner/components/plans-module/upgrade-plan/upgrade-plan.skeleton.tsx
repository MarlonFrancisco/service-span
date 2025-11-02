'use client';

import { Card, Skeleton } from '@repo/ui';
import { motion } from 'motion/react';

export function UpgradePlanSkeleton() {
  return (
    <div className="space-y-12">
      {/* Comparison Alert Skeleton */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Plans Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <Card className="relative h-full p-8 border border-gray-200">
              <div className="space-y-6">
                {/* Plan Header */}
                <div className="space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Skeleton className="h-10 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>

                {/* Button */}
                <Skeleton className="h-10 w-full rounded-md" />

                {/* Features List */}
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Skeleton className="h-5 w-5 rounded flex-shrink-0" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ROI Calculator Section Skeleton */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <Skeleton className="h-6 w-40" />
              </div>
              <Skeleton className="h-9 w-3/4 mx-auto" />
              <Skeleton className="h-5 w-2/3 mx-auto" />
            </div>

            {/* ROI Calculator Placeholder */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              ))}
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Why Upgrade Section Skeleton */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <Skeleton className="h-9 w-1/2 mx-auto" />
            <Skeleton className="h-5 w-2/3 mx-auto" />
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="border-gray-200 p-6">
                <div className="space-y-4">
                  {/* Icon placeholder */}
                  <Skeleton className="h-12 w-12 rounded-lg" />

                  {/* Title */}
                  <Skeleton className="h-6 w-3/4" />

                  {/* Description */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
