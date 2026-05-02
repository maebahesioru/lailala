"use client";

import { motion } from "framer-motion";

function Shimmer({ className }: { className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

export function SkeletonCard() {
  return (
    <div className="px-4 py-3">
      <div className="flex gap-3">
        <Shimmer className="w-10 h-10 rounded-full bg-[#2f3336] shrink-0" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-4 w-1/3 bg-[#2f3336]" />
          <Shimmer className="h-3 w-full bg-[#2f3336]" />
          <Shimmer className="h-3 w-2/3 bg-[#2f3336]" />
          <div className="flex gap-4 mt-2">
            <Shimmer className="h-3 w-12 bg-[#2f3336]" />
            <Shimmer className="h-3 w-12 bg-[#2f3336]" />
            <Shimmer className="h-3 w-12 bg-[#2f3336]" />
          </div>
        </div>
      </div>
    </div>
  );
}
