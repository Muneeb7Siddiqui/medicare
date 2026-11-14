import React from 'react'
import { motion } from 'framer-motion'
import { FeatureShowcaseItem } from '@/components/three/FeatureShowcase'
import { GlassCard } from '@/components/ui/GlassCard'
import { Sparkles, Check, Cpu, Zap, Eye } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export const TechShowcaseSection: React.FC = () => {
  const { theme } = useApp()
  const isBright = theme === 'bright'

  return (
    <section
      id="technology"
      className={`py-28 relative overflow-hidden mesh-bg border-y transition-colors ${
        isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
      }`}
    >
      {/* Decorative ambient beams */}
      <div
        className={`absolute top-0 left-1/3 w-[600px] h-[300px] rounded-full blur-[140px] pointer-events-none ${
          isBright ? 'bg-[#73d4fa]/20' : 'bg-[#32e5eb]/10'
        }`}
      />
      <div
        className={`absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full blur-[140px] pointer-events-none ${
          isBright ? 'bg-[#84fee3]/20' : 'bg-[#11a7ad]/10'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border ${
              isBright
                ? 'bg-[#b9e9fc]/40 border-[#05668d]/30 text-[#05668d]'
                : 'bg-[#161e21] border-[#384146] text-[#32e5eb]'
            }`}
          >
            <Cpu className={`w-3.5 h-3.5 ${isBright ? 'text-[#02c39a]' : 'text-[#88f0f3]'}`} />
            <span>Interactive 3D Hardware & AI Showcase</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] ${
              isBright ? 'text-[#01151d]' : 'text-white'
            }`}
          >
            Technology That{' '}
            <span
              className={`text-transparent bg-clip-text ${
                isBright
                  ? 'bg-gradient-to-r from-[#05668d] via-[#00a896] to-[#02c39a]'
                  : 'bg-gradient-to-r from-[#32e5eb] via-[#8ac2c9] to-[#e0fbfc]'
              }`}
            >
              Cares
            </span>
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg ${
              isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
            }`}
          >
            Hardware-calibrated sensors and computer vision working harmoniously to safeguard every patient's daily routine.
          </p>
        </div>

        {/* 3 Interactive Showcases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Showcase 1: Smart Reminders */}
          <GlassCard
            variant="border-gradient"
            className="p-6 sm:p-8 flex flex-col justify-between group"
          >
            <div>
              <div
                className={`relative mb-6 rounded-2xl border overflow-hidden shadow-inner ${
                  isBright
                    ? 'bg-white/90 border-[#b9e9fc]'
                    : 'bg-[#161e21] border-[#384146]'
                }`}
              >
                {/* 3D Capsule Scene */}
                <FeatureShowcaseItem variant="reminders" />
                <div
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                    isBright
                      ? 'bg-[#b9e9fc]/80 border-[#05668d]/30 text-[#05668d]'
                      : 'bg-[#161e21]/80 border-[#384146] text-[#32e5eb]'
                  }`}
                >
                  Live 3D Render
                </div>
              </div>

              <div
                className={`flex items-center gap-2 text-xs font-semibold mb-2 ${
                  isBright ? 'text-[#05668d]' : 'text-[#32e5eb]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>01 • Chrono-Sync</span>
              </div>
              <h3
                className={`text-2xl font-bold font-['Plus_Jakarta_Sans'] ${
                  isBright ? 'text-[#01151d]' : 'text-white'
                }`}
              >
                Smart Reminders
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isBright ? 'text-[#033e56]' : 'text-[#9db4c0]'
                }`}
              >
                A 3D digital twin of every pill in your regimen. Interactive visual shape and color verification prevents taking the wrong medication in poor lighting.
              </p>
            </div>

            <div
              className={`mt-6 pt-4 border-t space-y-2 ${
                isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs ${
                  isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
                }`}
              >
                <Check className={`w-4 h-4 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`} />
                <span>High-gloss color matching against FDA records</span>
              </div>
              <div
                className={`flex items-center gap-2 text-xs ${
                  isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
                }`}
              >
                <Check className={`w-4 h-4 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`} />
                <span>Custom acoustic and haptic frequency alerts</span>
              </div>
            </div>
          </GlassCard>

          {/* Showcase 2: Caregiver Monitoring */}
          <GlassCard
            variant="border-gradient"
            className="p-6 sm:p-8 flex flex-col justify-between group"
          >
            <div>
              <div
                className={`relative mb-6 rounded-2xl border overflow-hidden shadow-inner ${
                  isBright
                    ? 'bg-white/90 border-[#b9e9fc]'
                    : 'bg-[#161e21] border-[#384146]'
                }`}
              >
                {/* 3D Shield Scene */}
                <FeatureShowcaseItem variant="monitoring" />
                <div
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                    isBright
                      ? 'bg-[#bbfff8]/80 border-[#00a896]/30 text-[#00a896]'
                      : 'bg-[#161e21]/80 border-[#384146] text-[#11a7ad]'
                  }`}
                >
                  Live 3D Render
                </div>
              </div>

              <div
                className={`flex items-center gap-2 text-xs font-semibold mb-2 ${
                  isBright ? 'text-[#00a896]' : 'text-[#11a7ad]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>02 • Guardian Protocol</span>
              </div>
              <h3
                className={`text-2xl font-bold font-['Plus_Jakarta_Sans'] ${
                  isBright ? 'text-[#01151d]' : 'text-white'
                }`}
              >
                Caregiver Monitoring
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isBright ? 'text-[#033e56]' : 'text-[#9db4c0]'
                }`}
              >
                A protective telemetry shield establishing a secure link between doctors, family members, and elderly patients with zero breach of privacy.
              </p>
            </div>

            <div
              className={`mt-6 pt-4 border-t space-y-2 ${
                isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs ${
                  isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
                }`}
              >
                <Check className={`w-4 h-4 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`} />
                <span>Instant missed-dose escalation alerts</span>
              </div>
              <div
                className={`flex items-center gap-2 text-xs ${
                  isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
                }`}
              >
                <Check className={`w-4 h-4 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`} />
                <span>End-to-end encrypted medical data sync</span>
              </div>
            </div>
          </GlassCard>

          {/* Showcase 3: Prescription Intelligence */}
          <GlassCard
            variant="border-gradient"
            className="p-6 sm:p-8 flex flex-col justify-between group"
          >
            <div>
              <div
                className={`relative mb-6 rounded-2xl border overflow-hidden shadow-inner ${
                  isBright
                    ? 'bg-white/90 border-[#b9e9fc]'
                    : 'bg-[#161e21] border-[#384146]'
                }`}
              >
                {/* 3D Prescription Scan Scene */}
                <FeatureShowcaseItem variant="prescription" />
                <div
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                    isBright
                      ? 'bg-[#b8f6fe]/80 border-[#028090]/30 text-[#028090]'
                      : 'bg-[#161e21]/80 border-[#384146] text-[#8ac2c9]'
                  }`}
                >
                  Live 3D Render
                </div>
              </div>

              <div
                className={`flex items-center gap-2 text-xs font-semibold mb-2 ${
                  isBright ? 'text-[#028090]' : 'text-[#8ac2c9]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>03 • Vision Engine</span>
              </div>
              <h3
                className={`text-2xl font-bold font-['Plus_Jakarta_Sans'] ${
                  isBright ? 'text-[#01151d]' : 'text-white'
                }`}
              >
                Prescription Intelligence
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isBright ? 'text-[#033e56]' : 'text-[#9db4c0]'
                }`}
              >
                Optical Character Recognition paired with a clinical neural network parses physician handwriting, complex dosages, and warns against contraindications.
              </p>
            </div>

            <div
              className={`mt-6 pt-4 border-t space-y-2 ${
                isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs ${
                  isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
                }`}
              >
                <Check className={`w-4 h-4 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`} />
                <span>Real-time laser OCR coordinate detection</span>
              </div>
              <div
                className={`flex items-center gap-2 text-xs ${
                  isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
                }`}
              >
                <Check className={`w-4 h-4 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`} />
                <span>Cross-verified with National Drug Code (NDC)</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
