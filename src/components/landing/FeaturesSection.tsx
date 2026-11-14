import React from 'react'
import { motion } from 'framer-motion'
import {
  BellRing,
  Users,
  ScanLine,
  TrendingUp,
  ShieldAlert,
  PackageCheck,
  ArrowRight,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { useApp } from '@/context/AppContext'

export const FeaturesSection: React.FC = () => {
  const { theme } = useApp()
  const isBright = theme === 'bright'

  const features = [
    {
      icon: BellRing,
      color: isBright ? 'from-[#05668d] to-[#028090]' : 'from-[#11a7ad] to-[#32e5eb]',
      tag: 'Adaptive Reminders',
      title: 'Context-Aware Smart Scheduling',
      description:
        'Reminders adjust automatically based on meals, sleep cycles, and physician instructions. Zero annoying alarm fatigue.',
    },
    {
      icon: Users,
      color: isBright ? 'from-[#00a896] to-[#02c39a]' : 'from-[#356d74] to-[#50a3ae]',
      tag: 'Family & Clinical Portals',
      title: 'Caregiver Live Telemetry',
      description:
        'Peace of mind for families. Instant push alerts if an elderly parent misses a time-sensitive cardiovascular dose.',
    },
    {
      icon: ScanLine,
      color: isBright ? 'from-[#028090] to-[#05668d]' : 'from-[#50a3ae] to-[#88f0f3]',
      tag: 'AI Vision OCR',
      title: 'Instant Prescription Digitization',
      description:
        'Point your camera at any prescription bottle or doctor note. OCR extracts dosage, refills, and instructions in seconds.',
    },
    {
      icon: TrendingUp,
      color: isBright ? 'from-[#05668d] to-[#00a896]' : 'from-[#8ac2c9] to-[#c2dfe3]',
      tag: 'Clinical Metrics',
      title: 'Adherence Analytics & Trends',
      description:
        'Export verifiable PDF adherence logs for medical appointments. Prove compliance and optimize clinical outcomes.',
    },
    {
      icon: ShieldAlert,
      color: isBright ? 'from-[#045372] to-[#05668d]' : 'from-[#384146] to-[#7192a4]',
      tag: 'Safety Guard',
      title: 'Drug Interaction Defense',
      description:
        'Continuous automated screening cross-checks FDA interaction databases whenever a new supplement or Rx is added.',
    },
    {
      icon: PackageCheck,
      color: isBright ? 'from-[#02c39a] to-[#00a896]' : 'from-[#11a7ad] to-[#32e5eb]',
      tag: 'Pharmacy Sync',
      title: 'Predictive Refill Automation',
      description:
        'Intelligent inventory forecasting coordinates refills with your local pharmacy 7 days before you run out.',
    },
  ]

  return (
    <section id="features" className="py-24 relative overflow-hidden mesh-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border ${
              isBright
                ? 'bg-[#b9e9fc]/40 border-[#05668d]/30 text-[#05668d]'
                : 'bg-[#161e21] border-[#384146] text-[#32e5eb]'
            }`}
          >
            Engineering Excellence
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] ${
              isBright ? 'text-[#01151d]' : 'text-white'
            }`}
          >
            Precision Tools for{' '}
            <span
              className={`text-transparent bg-clip-text ${
                isBright
                  ? 'bg-gradient-to-r from-[#05668d] to-[#00a896]'
                  : 'bg-gradient-to-r from-[#32e5eb] to-[#8ac2c9]'
              }`}
            >
              Zero-Dose Errors
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`mt-4 text-base sm:text-lg ${
              isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
            }`}
          >
            Built from the ground up to solve complex polypharmacy regimens for chronic conditions,
            rehabilitation, and proactive wellness.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <GlassCard
                key={feature.title}
                variant="interactive"
                className="p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                        isBright ? 'text-white' : 'text-[#070a0b]'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        isBright
                          ? 'bg-[#b9e9fc]/30 text-[#045372] border-[#b9e9fc]'
                          : 'bg-[#161e21] text-[#9db4c0] border-[#384146]'
                      }`}
                    >
                      {feature.tag}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold transition-colors font-['Plus_Jakarta_Sans'] ${
                      isBright
                        ? 'text-[#01151d] group-hover:text-[#05668d]'
                        : 'text-white group-hover:text-[#32e5eb]'
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      isBright ? 'text-[#033e56]' : 'text-[#9db4c0]'
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>

                <div
                  className={`mt-6 pt-4 border-t flex items-center text-xs font-semibold transition-colors ${
                    isBright
                      ? 'border-[#b9e9fc] text-[#05668d] group-hover:text-[#00a896]'
                      : 'border-[#384146] text-[#32e5eb] group-hover:text-[#88f0f3]'
                  }`}
                >
                  <span>Learn more about protocol</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
