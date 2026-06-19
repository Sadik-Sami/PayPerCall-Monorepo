import { cn } from '@workspace/ui/lib/utils';

export function CaseStudyStripSkeleton({ className }: { className?: string }) {
  return (
    <section className={cn('w-full', className)}>
      <div className="section-container">
        {/* Title area skeleton */}
        <div className="mb-12 text-center flex flex-col items-center">
          <div className="h-12 md:h-16 w-3/4 max-w-2xl rounded-lg bg-muted animate-pulse mb-4" />
          <div className="h-6 w-2/3 max-w-xl rounded-lg bg-muted animate-pulse" />
        </div>

        {/* Cards track skeleton */}
        <div className="relative overflow-hidden mb-12">
          <div className="flex gap-6 pb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="shrink-0 w-[320px] min-w-[320px] sm:w-87.5 sm:min-w-87.5 md:w-100 md:min-w-100 h-[400px] rounded-3xl p-8 shadow-lg bg-muted/50 animate-pulse flex flex-col justify-between"
              >
                <div>
                  <div className="h-8 w-1/2 bg-muted rounded-md mb-4" />
                  <div className="h-4 w-full bg-muted rounded-sm mb-2" />
                  <div className="h-4 w-5/6 bg-muted rounded-sm mb-2" />
                  <div className="h-4 w-4/6 bg-muted rounded-sm mb-8" />
                </div>
                <div className="w-full h-48 rounded-xl bg-muted" />
              </div>
            ))}
          </div>
        </div>

        {/* Dots and button skeleton */}
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-3 w-3 rounded-full bg-muted animate-pulse" />
            ))}
          </div>
          <div className="h-14 w-48 rounded-full bg-muted animate-pulse" />
        </div>
      </div>
    </section>
  );
}
