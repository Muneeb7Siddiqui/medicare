import { useState, useEffect, useRef } from 'react'

interface CounterOptions {
  duration?: number
  decimals?: number
  delay?: number
}

export function useAnimatedCounter(
  targetValue: number,
  options: CounterOptions = {}
) {
  const { duration = 1600, decimals = 0, delay = 0 } = options
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    let animationFrameId: number

    const timeoutId = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)

        // Ease-out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const current = easeOut * targetValue

        setCount(Number(current.toFixed(decimals)))

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {
          setCount(targetValue)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible, targetValue, duration, decimals, delay])

  return { count, ref: elementRef, isVisible }
}
