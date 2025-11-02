import { Card, CardContent, CardHeader, Skeleton } from '@repo/ui';

export const SalesRevenueMetricsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      {/* Goal Progress Card */}
      <Card className="border-gray-200">
        <CardContent className="p-4 sm:p-5 md:p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
              <Skeleton className="h-10 w-20" />
            </div>
            <Skeleton className="h-3 w-full" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-gray-200">
            <CardContent className="p-4 sm:p-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-9 w-28" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-gray-200">
          <CardHeader className="border-b border-gray-200 pb-4">
            <Skeleton className="h-6 w-44" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="border-b border-gray-200 pb-4">
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-200 pb-4">
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
