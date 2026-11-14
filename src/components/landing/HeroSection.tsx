import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  Play,
  Sparkles,
  ArrowDown,
} from 'lucide-react'
import { HeroScene } from '@/components/three/HeroScene'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useApp } from '@/context/AppContext'

export const HeroSection: React.FC = () => {
  const mouse = useMousePosition()
  const { theme } = useApp()
  const isBright = theme === 'bright'

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden mesh-bg">
      {/* Ambient background glow accents */}
      <div
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
          isBright ? 'bg-[#73d4fa]/20' : 'bg-[#32e5eb]/10'
        }`}
      />
      <div
        className={`absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
          isBright ? 'bg-[#84fee3]/25' : 'bg-[#11a7ad]/10'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start text-left"
          >
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border shadow-sm ${
                isBright
                  ? 'bg-[#b9e9fc]/50 border-[#05668d]/30 text-[#05668d]'
                  : 'bg-[#161e21] border-[#384146] text-[#32e5eb]'
              }`}
            >
              <Sparkles
                className={`w-3.5 h-3.5 ${isBright ? 'text-[#02c39a]' : 'text-[#88f0f3]'}`}
              />
              <span>Next-Generation Healthcare Technology</span>
            </motion.div>

            {/* Main Heading */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] font-['Plus_Jakarta_Sans'] ${
                isBright ? 'text-[#01151d]' : 'text-white'
              }`}
            >
              Healthcare,{' '}
              <span
                className={`text-transparent bg-clip-text ${
                  isBright
                    ? 'bg-gradient-to-r from-[#05668d] via-[#028090] to-[#02c39a]'
                    : 'bg-gradient-to-r from-[#32e5eb] via-[#8ac2c9] to-[#e0fbfc]'
                }`}
              >
                Reimagined.
              </span>{' '}
              Every Dose, On Time.
            </h1>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <MagneticButton strength={0.3}>
                <Link
                  to="/dashboard"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold shadow-xl transition-all group ${
                    isBright
                      ? 'bg-gradient-to-r from-[#05668d] to-[#00a896] hover:from-[#089bd5] hover:to-[#02c39a] text-white shadow-[#05668d]/30'
                      : 'bg-gradient-to-r from-[#11a7ad] to-[#32e5eb] hover:from-[#32e5eb] hover:to-[#88f0f3] text-[#070a0b] shadow-[#32e5eb]/25 font-bold'
                  }`}
                >
                  <span>Get Started Free</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <a
                  href="#technology"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border transition-all ${
                    isBright
                      ? 'bg-white/80 hover:bg-white text-[#033e56] border-[#b9e9fc] hover:text-[#05668d]'
                      : 'bg-[#161e21]/80 hover:bg-[#253237] text-[#c2dfe3] border-[#384146] hover:text-white'
                  }`}
                >
                  <Play
                    className={`w-4 h-4 fill-current ${
                      isBright ? 'text-[#05668d]' : 'text-[#32e5eb]'
                    }`}
                  />
                  <span>Explore Technology</span>
                </a>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Right 3D Visual Column (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative h-[480px] sm:h-[540px] lg:h-[620px] w-full flex items-center justify-center"
          >
            {/* The 3D Scene */}
            <HeroScene mouse={mouse} className="z-10" />
          </motion.div>
        </div>
      </div>

      {/* Down Scroll Arrow */}
      <a
        href="#features"
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-colors p-2 ${
          isBright ? 'text-[#045372] hover:text-[#05668d]' : 'text-[#5c6b73] hover:text-[#c2dfe3]'
        }`}
        aria-label="Scroll to features"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </a>
    </section>
  )
}
