import { useState, useEffect } from 'react'

export interface MousePosition {
  x: number // absolute clientX
  y: number // absolute clientY
  normalizedX: number // -1 to 1
  normalizedY: number // -1 to 1
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  })

  useEffect(() => {
    let timeoutId: number | null = null

    const handleMouseMove = (event: MouseEvent) => {
      // Small throttle using requestAnimationFrame for smooth 60/120fps tracking
      if (timeoutId) return

      timeoutId = window.requestAnimationFrame(() => {
        const { clientX, clientY } = event
        const width = window.innerWidth
        const height = window.innerHeight

        const normalizedX = (clientX / width) * 2 - 1
        const normalizedY = -(clientY / height) * 2 + 1

        setMousePosition({
          x: clientX,
          y: clientY,
          normalizedX,
          normalizedY,
        })
        timeoutId = null
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (timeoutId) window.cancelAnimationFrame(timeoutId)
    }
  }, [])

  return mousePosition
}
