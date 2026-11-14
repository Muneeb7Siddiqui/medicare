import React, { useEffect } from 'react'
import Lenis from 'lenis'
import { Navbar } from '@/components/shared/Navbar'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { TechShowcaseSection } from '@/components/landing/TechShowcaseSection'
import { CTASection } from '@/components/landing/CTASection'
import { Footer } from '@/components/landing/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const LandingPage: React.FC = () => {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [prefersReduced])

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] relative transition-colors duration-300">
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TechShowcaseSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
export default LandingPage
