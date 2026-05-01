export function SkeletonCard() {
  return (
    <div className="px-4 py-3 animate-pulse">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-[#2f3336] shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 bg-[#2f3336] rounded" />
          <div className="h-3 w-full bg-[#2f3336] rounded" />
          <div className="h-3 w-2/3 bg-[#2f3336] rounded" />
          <div className="flex gap-4 mt-2">
            <div className="h-3 w-12 bg-[#2f3336] rounded" />
            <div className="h-3 w-12 bg-[#2f3336] rounded" />
            <div className="h-3 w-12 bg-[#2f3336] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
