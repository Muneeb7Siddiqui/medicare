import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  strength?: number
  className?: string
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.35,
  className = '',
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const prefersReduced = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReduced || !buttonRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()

    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)

    setPosition({
      x: middleX * strength,
      y: middleY * strength,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center font-medium transition-colors select-none ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
}
