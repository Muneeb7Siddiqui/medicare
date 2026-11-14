import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useApp } from '@/context/AppContext'

export const CTASection: React.FC = () => {
  const { theme } = useApp()
  const isBright = theme === 'bright'

  return (
    <section className="py-24 relative overflow-hidden mesh-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`relative rounded-3xl p-8 sm:p-14 overflow-hidden border shadow-2xl text-center ${
            isBright
              ? 'bg-gradient-to-b from-white to-[#f0f3bd]/30 border-[#b9e9fc] shadow-[#05668d]/10'
              : 'bg-gradient-to-b from-[#161e21] to-[#070a0b] border-[#384146] shadow-[#32e5eb]/10'
          }`}
        >
          {/* Radial ambient glow */}
          <div
            className={`absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[100px] pointer-events-none ${
              isBright ? 'bg-[#73d4fa]/30' : 'bg-[#32e5eb]/20'
            }`}
          />
          <div
            className={`absolute -bottom-32 right-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none ${
              isBright ? 'bg-[#84fee3]/30' : 'bg-[#11a7ad]/20'
            }`}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border ${
                isBright
                  ? 'bg-[#b9e9fc]/50 border-[#05668d]/30 text-[#05668d]'
                  : 'bg-[#161e21] border-[#384146] text-[#32e5eb]'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isBright ? 'text-[#02c39a]' : 'text-[#88f0f3]'}`} />
              <span>Zero Set-Up Fees • Free for Families</span>
            </div>

            <h2
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] leading-tight ${
                isBright ? 'text-[#01151d]' : 'text-white'
              }`}
            >
              Ready to Upgrade Your Health Security?
            </h2>

            <p
              className={`mt-5 text-base sm:text-lg leading-relaxed ${
                isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
              }`}
            >
              Join thousands of families, patients, and physicians ensuring every prescription is taken safely, correctly, and on time.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton strength={0.3}>
                <Link
                  to="/dashboard"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold shadow-xl transition-all group ${
                    isBright
                      ? 'bg-gradient-to-r from-[#05668d] to-[#00a896] hover:from-[#089bd5] hover:to-[#02c39a] text-white shadow-[#05668d]/30'
                      : 'bg-gradient-to-r from-[#11a7ad] to-[#32e5eb] hover:from-[#32e5eb] hover:to-[#88f0f3] text-[#070a0b] shadow-[#32e5eb]/25'
                  }`}
                >
                  <span>Launch Live Platform</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>

              <Link
                to="/dashboard"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold border transition-colors ${
                  isBright
                    ? 'bg-white hover:bg-slate-50 text-[#033e56] border-[#b9e9fc]'
                    : 'bg-[#161e21] hover:bg-[#253237] text-[#c2dfe3] border-[#384146] hover:text-white'
                }`}
              >
                <HeartHandshake
                  className={`w-4 h-4 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`}
                />
                <span>Caregiver Access</span>
              </Link>
            </div>

            <p
              className={`mt-6 text-xs flex items-center justify-center gap-2 ${
                isBright ? 'text-[#045372]' : 'text-[#9db4c0]'
              }`}
            >
              <ShieldCheck
                className={`w-4 h-4 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`}
              />
              <span>Full HIPAA & GDPR Certified • Instant browser access • No credit card required</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
