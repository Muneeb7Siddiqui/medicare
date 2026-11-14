import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedCheckmarkProps {
  checked: boolean
  size?: number
  className?: string
}

export const AnimatedCheckmark: React.FC<AnimatedCheckmarkProps> = ({
  checked,
  size = 28,
  className = '',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <AnimatePresence>
        {checked && (
          <>
            {/* Ripple Pulse */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-emerald-400"
            />

            {/* Subtle glow layer */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-full bg-emerald-500/20 blur-sm"
            />
          </>
        )}
      </AnimatePresence>

      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Outer Circle */}
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke={checked ? '#10b981' : '#475569'}
          strokeWidth="2"
          fill={checked ? '#10b981' : 'transparent'}
          initial={false}
          animate={{
            fill: checked ? '#10b981' : 'transparent',
            stroke: checked ? '#10b981' : '#475569',
            scale: checked ? [1, 1.15, 1] : 1,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />

        {/* Check Icon */}
        <motion.path
          d="M7 12.5L10.5 16L17 8.5"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: checked ? 1 : 0,
            opacity: checked ? 1 : 0,
          }}
          transition={{
            pathLength: { duration: 0.3, delay: checked ? 0.1 : 0, ease: 'easeOut' },
            opacity: { duration: 0.1 },
          }}
        />
      </svg>
    </div>
  )
}
