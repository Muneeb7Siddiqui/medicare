import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useApp } from '@/context/AppContext'

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReduced = useReducedMotion()
  const { theme } = useApp()
  const isBright = theme === 'bright'

  useEffect(() => {
    // Only enable on desktop with coarse pointers disabled
    if (prefersReduced || window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      const isInteractive = target?.closest('button, a, input, select, [role="button"]')
      setIsPointer(!!isInteractive)
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [prefersReduced, isVisible])

  if (!isVisible || prefersReduced) return null

  const ringBg = isBright
    ? isPointer
      ? 'rgba(5, 102, 141, 0.25)'
      : 'rgba(5, 102, 141, 0.12)'
    : isPointer
    ? 'rgba(50, 229, 235, 0.25)'
    : 'rgba(50, 229, 235, 0.1)'

  const ringBorder = isBright
    ? isPointer
      ? 'rgba(5, 102, 141, 0.7)'
      : 'rgba(5, 102, 141, 0.35)'
    : isPointer
    ? 'rgba(50, 229, 235, 0.7)'
    : 'rgba(50, 229, 235, 0.35)'

  const dotColor = isBright ? '#05668d' : '#32e5eb'
  const dotShadow = isBright ? '0 0 10px rgba(5, 102, 141, 0.5)' : '0 0 10px #32e5eb'

  return (
    <>
      {/* Outer ambient glow ring */}
      <motion.div
        className="custom-cursor fixed pointer-events-none rounded-full z-50 mix-blend-multiply dark:mix-blend-screen"
        animate={{
          x: position.x - (isPointer ? 24 : 16),
          y: position.y - (isPointer ? 24 : 16),
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          backgroundColor: ringBg,
          borderColor: ringBorder,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.1 }}
        style={{ borderWidth: '1.5px', backdropFilter: 'blur(2px)' }}
      />
      {/* Center sharp dot */}
      <motion.div
        className="custom-cursor fixed pointer-events-none w-1.5 h-1.5 rounded-full z-50"
        style={{ backgroundColor: dotColor, boxShadow: dotShadow }}
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 700 }}
      />
    </>
  )
}
