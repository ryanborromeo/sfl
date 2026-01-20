import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse bg-gray-200 rounded', className)}
    />
  );
}

export function PlanPageSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-10 w-24 rounded-xl" />
          <Skeleton className="h-10 w-20 rounded-xl" />
        </div>

        {/* Title section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-200 rounded-2xl mb-3 animate-pulse" />
          <Skeleton className="h-9 w-64 mx-auto mb-2" />
          <Skeleton className="h-5 w-40 mx-auto" />
        </div>

        {/* Grocery list button skeleton */}
        <Skeleton className="w-full h-14 rounded-2xl mb-8" />

        {/* Day cards skeleton */}
        <div className="space-y-6">
          {[1, 2, 3].map((day) => (
            <div key={day} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Skeleton className="h-12 w-full" />
              <div className="divide-y divide-gray-100">
                {[1, 2, 3].map((meal) => (
                  <div key={meal} className="p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <div className="flex gap-2">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export function GroceryPageSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pb-24">
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-12 w-full rounded-xl mb-3" />
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {[1, 2, 3, 4].map((category) => (
          <div key={category} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Skeleton className="h-12 w-full" />
            <div className="divide-y divide-gray-100">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4">
                  <Skeleton className="w-7 h-7 rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
