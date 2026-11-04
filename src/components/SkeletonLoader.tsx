import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen w-full bg-[#09090b] flex flex-col p-6 max-w-7xl mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="space-y-2 hidden md:block w-1/4">
          <div className="h-3 w-24 bg-white/10 rounded-full"></div>
          <div className="h-7 w-36 bg-white/15 rounded-lg"></div>
        </div>
        <div className="h-12 w-full max-w-lg bg-white/10 rounded-full"></div>
        <div className="flex items-center justify-end gap-3 w-1/4">
          <div className="w-10 h-10 rounded-full bg-white/10"></div>
          <div className="w-10 h-10 rounded-full bg-white/10"></div>
        </div>
      </div>

      {/* Hero Carousel Skeleton */}
      <div className="w-full h-65 md:h-75 rounded-3xl bg-white/5 border border-white/5 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/5 to-white/0 -translate-x-full animate-[shimmer_2s_infinite]"></div>
        <div className="p-8 md:p-12 flex flex-col justify-center h-full max-w-lg space-y-4">
          <div className="h-5 w-24 bg-white/10 rounded-full"></div>
          <div className="h-8 md:h-10 w-3/4 bg-white/15 rounded-lg"></div>
          <div className="h-4 w-1/2 bg-white/10 rounded-lg"></div>
          <div className="h-10 w-32 bg-white/15 rounded-full mt-2"></div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-4 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-8 w-24 bg-white/10 rounded-full"></div>
        ))}
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="aspect-square w-full rounded-xl bg-white/10"></div>
            <div className="h-4 w-3/4 bg-white/10 rounded"></div>
            <div className="h-3 w-1/2 bg-white/5 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
