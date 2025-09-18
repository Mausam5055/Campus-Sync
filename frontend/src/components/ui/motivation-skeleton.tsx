import { Skeleton } from "@/components/ui/skeleton"

export function MotivationSkeleton() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-6 animate-fade-in">
      <div className="w-full max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* Header Skeleton */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-8 md:h-12 w-[250px] md:w-[400px]" />
          </div>
          <Skeleton className="h-5 md:h-6 w-[200px] md:w-[500px] mx-auto" />
          
          {/* Tags skeleton */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 md:w-20 rounded-full" />
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl mx-auto">
            <Skeleton className="w-full aspect-video rounded-2xl" />
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