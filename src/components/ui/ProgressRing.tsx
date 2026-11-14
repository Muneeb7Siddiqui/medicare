import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ProgressRingProps {
  progress: number // 0 to 100
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  showLabel?: boolean
  labelSubtext?: string
  className?: string
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 10,
  color = '#0284c7',
  trackColor = 'rgba(255, 255, 255, 0.08)',
  showLabel = true,
  labelSubtext = 'Adherence',
  className = '',
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(Math.min(Math.max(progress, 0), 100))
    }, 150)
    return () => clearTimeout(timer)
  }, [progress])

  const center = size / 2
  const radius = center - strokeWidth
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Animated Progress Ring */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>

      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold tracking-tight text-white">
            {Math.round(animatedProgress)}%
          </span>
          {labelSubtext && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              {labelSubtext}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
