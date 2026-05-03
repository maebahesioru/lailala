import { MainLayout } from "@/components/main-layout";

export default function ThreadLoading() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Back button */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-border animate-pulse" />
          <div className="h-5 w-32 bg-border rounded animate-pulse" />
        </div>

        {/* Parent comment skeleton */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-border animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-24 bg-border rounded animate-pulse" />
                <div className="h-4 w-16 bg-border rounded animate-pulse" />
              </div>
              <div className="h-4 w-full bg-border rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-border rounded animate-pulse" />
              <div className="flex gap-4 pt-2">
                <div className="h-4 w-12 bg-border rounded animate-pulse" />
                <div className="h-4 w-12 bg-border rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Replies skeleton */}
        <div className="divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-4 py-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-border animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-20 bg-border rounded animate-pulse" />
                    <div className="h-4 w-14 bg-border rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-full bg-border rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-border rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
