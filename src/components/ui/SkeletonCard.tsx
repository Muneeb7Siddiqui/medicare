import React from 'react'

interface SkeletonCardProps {
  className?: string
  rows?: number
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = '', rows = 3 }) => {
  return (
    <div className={`p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 shimmer-element ${className}`}>
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-xl bg-slate-800" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-800 rounded w-1/3" />
          <div className="h-3 bg-slate-800/60 rounded w-1/4" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-slate-800/70 rounded"
            style={{ width: `${85 - i * 15}%` }}
          />
        ))}
      </div>
    </div>
  )
}
