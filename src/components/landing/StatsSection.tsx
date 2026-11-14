import React from 'react'
import { motion } from 'framer-motion'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { Activity, ShieldCheck, HeartPulse, Award } from 'lucide-react'
import { useApp } from '@/context/AppContext'

interface StatCounterProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  sublabel: string
  icon: React.ComponentType<{ className?: string }>
  isBright: boolean
}

const StatCounter: React.FC<StatCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  label,
  sublabel,
  icon: Icon,
  isBright,
}) => {
  const { count, ref } = useAnimatedCounter(value, { duration: 1800, decimals })

  return (
    <div
      ref={ref}
      className={`p-8 rounded-3xl border backdrop-blur-md flex flex-col items-center text-center group transition-all ${
        isBright
          ? 'bg-white/90 border-[#b9e9fc] hover:border-[#05668d]/50 shadow-sm hover:shadow-md'
          : 'bg-[#161e21]/80 border-[#384146] hover:border-[#32e5eb]/40'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform border ${
          isBright
            ? 'bg-[#b9e9fc]/40 border-[#05668d]/20 text-[#05668d]'
            : 'bg-[#32e5eb]/10 border-[#32e5eb]/20 text-[#32e5eb]'
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>

      <div
        className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] ${
          isBright ? 'text-[#01151d]' : 'text-white'
        }`}
      >
        {prefix}
        <span>{count.toLocaleString()}</span>
        {suffix}
      </div>

      <h4
        className={`mt-3 text-base font-bold ${
          isBright ? 'text-[#01151d]' : 'text-[#c2dfe3]'
        }`}
      >
        {label}
      </h4>
      <p
        className={`mt-1 text-xs max-w-[200px] ${
          isBright ? 'text-[#045372]' : 'text-[#9db4c0]'
        }`}
      >
        {sublabel}
      </p>
    </div>
  )
}

export const StatsSection: React.FC = () => {
  const { theme } = useApp()
  const isBright = theme === 'bright'

  return (
    <section id="stats" className="py-24 relative overflow-hidden mesh-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border ${
              isBright
                ? 'bg-[#b9e9fc]/40 border-[#05668d]/30 text-[#05668d]'
                : 'bg-[#161e21] border-[#384146] text-[#32e5eb]'
            }`}
          >
            Clinical Efficacy
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] ${
              isBright ? 'text-[#01151d]' : 'text-white'
            }`}
          >
            Proven Outcomes at National Scale
          </h2>
          <p
            className={`mt-4 text-base sm:text-lg ${
              isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
            }`}
          >
            Documented reductions in hospital readmissions and medication non-compliance across health systems.
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCounter
            value={10400}
            suffix="+"
            label="Active Patients"
            sublabel="Managing chronic prescriptions daily"
            icon={Activity}
            isBright={isBright}
          />
          <StatCounter
            value={99.2}
            suffix="%"
            decimals={1}
            label="Adherence Rate"
            sublabel="Versus the 50% national average"
            icon={ShieldCheck}
            isBright={isBright}
          />
          <StatCounter
            value={580000}
            prefix=""
            suffix="+"
            label="Doses Recorded"
            sublabel="Verified via smart notifications"
            icon={HeartPulse}
            isBright={isBright}
          />
          <StatCounter
            value={4.9}
            suffix="/5"
            decimals={1}
            label="Physician Rating"
            sublabel="From leading cardiologists & GPs"
            icon={Award}
            isBright={isBright}
          />
        </div>
      </div>
    </section>
  )
}
