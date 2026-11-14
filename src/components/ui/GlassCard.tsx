import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  variant?: 'dark' | 'light' | 'interactive' | 'border-gradient'
  glow?: boolean
  className?: string
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'dark',
  glow = false,
  className = '',
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'light':
        return 'bg-white/90 backdrop-blur-xl border border-[#b9e9fc] text-[#01151d] shadow-xl shadow-slate-900/5'
      case 'border-gradient':
        return 'animated-gradient-border'
      case 'interactive':
        return 'glass-card-interactive'
      case 'dark':
      default:
        return 'glass-panel'
    }
  }

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${getVariantStyles()} ${
        glow ? 'shadow-2xl shadow-cyan-500/10' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
