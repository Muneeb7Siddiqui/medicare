import React from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  Info,
  Flame,
} from 'lucide-react'
import { Medication } from '@/data/mockData'
import { AnimatedCheckmark } from '@/components/ui/AnimatedCheckmark'
import { useApp } from '@/context/AppContext'

interface MedicationCardProps {
  medication: Medication
  onSelect?: (med: Medication) => void
}

export const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
}) => {
  const { markAsTaken, theme } = useApp()
  const isBright = theme === 'bright'
  const isLowStock = medication.remainingPills <= 14

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className={`relative rounded-2xl p-5 border transition-all ${
        isBright
          ? medication.takenToday
            ? 'bg-slate-50/80 border-[#b9e9fc] opacity-80'
            : 'bg-white/95 border-[#b9e9fc] hover:border-[#05668d]/50 shadow-md shadow-black/5'
          : medication.takenToday
          ? 'bg-[#161e21]/40 border-[#384146]/60 opacity-80'
          : 'bg-[#161e21]/90 border-[#384146] hover:border-[#32e5eb]/40 shadow-lg shadow-black/20'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: Shape/Color Visual Badge + Pill Details */}
        <div className="flex items-start gap-3.5">
          {/* Pill Visual Badge */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-white/20 shadow-inner relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${medication.colorHex}22 0%, ${medication.colorHex}55 100%)`,
            }}
          >
            {/* 3D-style stylized miniature pill */}
            <div
              className={`w-6 h-3 rounded-full border border-white/40 shadow-sm flex overflow-hidden ${
                medication.shape === 'capsule'
                  ? 'rotate-45'
                  : medication.shape === 'softgel'
                  ? 'rounded-full scale-90'
                  : 'rounded-sm'
              }`}
            >
              <div
                className="w-1/2 h-full"
                style={{ backgroundColor: medication.colorHex }}
              />
              <div className="w-1/2 h-full bg-white/90" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3
                className={`text-base font-bold tracking-tight font-['Plus_Jakarta_Sans'] ${
                  isBright ? 'text-[#01151d]' : 'text-white'
                }`}
              >
                {medication.name}
              </h3>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                  isBright
                    ? 'bg-[#b9e9fc]/40 text-[#05668d] border-[#05668d]/20'
                    : 'bg-[#253237] text-[#c2dfe3] border-[#384146]'
                }`}
              >
                {medication.dosage}
              </span>
            </div>
            <p
              className={`text-xs mt-0.5 font-medium ${
                isBright ? 'text-[#033e56]' : 'text-[#9db4c0]'
              }`}
            >
              {medication.genericName} • {medication.category}
            </p>
          </div>
        </div>

        {/* Right: Satisfying Mark Taken Button */}
        <button
          onClick={() => markAsTaken(medication.id)}
          className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-semibold select-none ${
            medication.takenToday
              ? isBright
                ? 'bg-[#bbfff8]/50 border-[#00a896]/30 text-[#00a896]'
                : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
              : isBright
              ? 'bg-slate-100 hover:bg-[#b9e9fc]/30 border-[#b9e9fc] text-[#033e56]'
              : 'bg-[#253237] hover:bg-[#384146] border-[#384146] text-[#c2dfe3] hover:text-white'
          }`}
          title={medication.takenToday ? 'Click to unmark' : 'Click to confirm taken'}
        >
          <AnimatedCheckmark checked={medication.takenToday} size={18} />
          <span>{medication.takenToday ? 'Taken' : 'Mark Dose'}</span>
        </button>
      </div>

      {/* Middle Schedule / Instructions */}
      <div
        className={`mt-4 pt-3 border-t grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
          isBright ? 'border-[#b9e9fc] text-[#033e56]' : 'border-[#384146]/60 text-[#c2dfe3]'
        }`}
      >
        <div className="flex items-center gap-2">
          <Clock className={`w-3.5 h-3.5 shrink-0 ${isBright ? 'text-[#05668d]' : 'text-[#32e5eb]'}`} />
          <span>
            {medication.frequency} at{' '}
            <strong className={isBright ? 'text-[#01151d]' : 'text-white'}>
              {medication.times.join(', ')}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>
            Streak:{' '}
            <strong className={isBright ? 'text-amber-700' : 'text-amber-300'}>
              {medication.streakDays} days
            </strong>{' '}
            on schedule
          </span>
        </div>
      </div>

      {/* Instructions Note */}
      <div
        className={`mt-3 text-xs rounded-xl p-2.5 border flex items-start gap-2 ${
          isBright
            ? 'bg-[#fcfdf2] border-[#b9e9fc] text-[#045372]'
            : 'bg-[#070a0b]/50 border-[#384146]/50 text-[#9db4c0]'
        }`}
      >
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" />
        <span className="leading-relaxed">{medication.instructions}</span>
      </div>

      {/* Footer Pill: Stock status & Warnings */}
      <div className="mt-3 flex items-center justify-between text-[11px] pt-1">
        <div className="flex items-center gap-2">
          <span
            className={`font-semibold ${
              isLowStock
                ? 'text-amber-500'
                : isBright
                ? 'text-[#045372]'
                : 'text-[#9db4c0]'
            }`}
          >
            {medication.remainingPills} / {medication.totalPills} doses left
          </span>
          {isLowStock && (
            <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold">
              Refill Soon
            </span>
          )}
        </div>

        <span className={`font-mono text-[10px] ${isBright ? 'text-[#045372]' : 'text-[#5c6b73]'}`}>
          {medication.rxNumber}
        </span>
      </div>
    </motion.div>
  )
}
