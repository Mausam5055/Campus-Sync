import { Skeleton } from "@/components/ui/skeleton"

export function MeditationSkeleton() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-6 animate-fade-in">
      <div className="w-full max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* Header Skeleton */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 md:h-12 w-[280px] md:w-[450px]" />
          </div>
          <Skeleton className="h-5 md:h-6 w-[240px] md:w-[520px] mx-auto" />
          
          {/* Duration and tags skeleton */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Skeleton className="h-6 w-16 rounded-full" />
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-16 ml-auto" />
              </div>
              
              {/* Instructions skeleton */}
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                    <Skeleton className="h-4 w-full max-w-md" />
                  </div>
                ))}
              </div>
              
              {/* Timer skeleton */}
              <div className="border-t border-border/50 pt-6">
                <div className="flex items-center justify-center gap-4">
                  <Skeleton className="h-12 w-24" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-10 w-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Skeleton */}
        <div className="max-w-3xl mx-auto text-center">
          <Skeleton className="h-6 w-20 mx-auto mb-4" />
          <div className="flex flex-wrap justify-center gap-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))}
          </div>
        </div>

        {/* Actions Skeleton */}
        <div className="flex justify-center items-center gap-4 md:gap-6">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  )
}