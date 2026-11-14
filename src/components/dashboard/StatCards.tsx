import React from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Pill,
  Flame,
  TrendingUp,
} from 'lucide-react'
import { ProgressRing } from '@/components/ui/ProgressRing'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { useApp } from '@/context/AppContext'

export const StatCards: React.FC = () => {
  const { medications, theme } = useApp()
  const isBright = theme === 'bright'

  const totalMeds = medications.length
  const takenCount = medications.filter((m) => m.takenToday).length
  const adherenceRate = Math.round((takenCount / (totalMeds || 1)) * 100)
  const maxStreak = Math.max(...medications.map((m) => m.streakDays), 0)
  const refillsNeeded = medications.filter((m) => m.remainingPills <= 14).length

  const { count: animatedTaken } = useAnimatedCounter(takenCount, { duration: 1200 })
  const { count: animatedStreak } = useAnimatedCounter(maxStreak, { duration: 1400 })

  const cardBaseStyle = isBright
    ? 'bg-white/90 border-[#b9e9fc] shadow-sm hover:border-[#05668d]/40 hover:shadow-md'
    : 'bg-[#161e21]/80 border-[#384146] hover:border-[#32e5eb]/40 shadow-lg shadow-black/20'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {/* Card 1: Today's Adherence Rate with circular ProgressRing */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className={`p-5 rounded-2xl border backdrop-blur-md flex items-center justify-between transition-all group ${cardBaseStyle}`}
      >
        <div>
          <span
            className={`text-[11px] font-bold uppercase tracking-wider ${
              isBright ? 'text-[#045372]' : 'text-[#9db4c0]'
            }`}
          >
            Today's Adherence
          </span>
          <div
            className={`text-3xl font-extrabold mt-1 font-['Plus_Jakarta_Sans'] ${
              isBright ? 'text-[#01151d]' : 'text-white'
            }`}
          >
            {adherenceRate}%
          </div>
          <div
            className={`flex items-center gap-1.5 mt-2 text-xs font-medium ${
              isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Optimal Range</span>
          </div>
        </div>

        <ProgressRing
          progress={adherenceRate}
          size={72}
          strokeWidth={7}
          color={isBright ? '#05668d' : '#32e5eb'}
          trackColor={isBright ? '#b9e9fc' : 'rgba(56, 65, 70, 0.5)'}
          showLabel={false}
        />
      </motion.div>

      {/* Card 2: Doses Completed Today */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`p-5 rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all group ${cardBaseStyle}`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider ${
              isBright ? 'text-[#045372]' : 'text-[#9db4c0]'
            }`}
          >
            Doses Taken Today
          </span>
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
              isBright
                ? 'bg-[#bbfff8]/50 border-[#00a896]/30 text-[#00a896]'
                : 'bg-[#11a7ad]/20 border-[#32e5eb]/30 text-[#32e5eb]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div
            className={`text-3xl font-extrabold font-['Plus_Jakarta_Sans'] ${
              isBright ? 'text-[#01151d]' : 'text-white'
            }`}
          >
            <span>{animatedTaken}</span>
            <span
              className={`text-xl font-normal ${
                isBright ? 'text-[#045372]' : 'text-[#5c6b73]'
              }`}
            >
              {' '}
              / {totalMeds}
            </span>
          </div>
          <p
            className={`text-xs mt-1 ${
              isBright ? 'text-[#033e56]' : 'text-[#9db4c0]'
            }`}
          >
            {totalMeds - takenCount > 0
              ? `${totalMeds - takenCount} doses remaining for this evening`
              : 'All daily doses completed!'}
          </p>
        </div>
      </motion.div>

      {/* Card 3: Max Adherence Streak */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className={`p-5 rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all group ${cardBaseStyle}`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider ${
              isBright ? 'text-[#045372]' : 'text-[#9db4c0]'
            }`}
          >
            Consecutive Streak
          </span>
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
              isBright
                ? 'bg-amber-100 border-amber-300 text-amber-600'
                : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
            }`}
          >
            <Flame className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div
            className={`text-3xl font-extrabold font-['Plus_Jakarta_Sans'] flex items-baseline gap-1.5 ${
              isBright ? 'text-[#01151d]' : 'text-white'
            }`}
          >
            <span>{animatedStreak}</span>
            <span
              className={`text-sm font-semibold ${
                isBright ? 'text-amber-600' : 'text-amber-400'
              }`}
            >
              Days
            </span>
          </div>
          <p
            className={`text-xs mt-1 ${
              isBright ? 'text-[#033e56]' : 'text-[#9db4c0]'
            }`}
          >
            Top 2% of compliant patients on MediCare
          </p>
        </div>
      </motion.div>

      {/* Card 4: Inventory & Upcoming Refills */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className={`p-5 rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all group ${cardBaseStyle}`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider ${
              isBright ? 'text-[#045372]' : 'text-[#9db4c0]'
            }`}
          >
            Refill Pipeline
          </span>
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
              isBright
                ? 'bg-[#b9e9fc]/50 border-[#05668d]/30 text-[#05668d]'
                : 'bg-[#50a3ae]/20 border-[#8ac2c9]/30 text-[#8ac2c9]'
            }`}
          >
            <Pill className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div
            className={`text-3xl font-extrabold font-['Plus_Jakarta_Sans'] flex items-baseline gap-2 ${
              isBright ? 'text-[#01151d]' : 'text-white'
            }`}
          >
            <span>{refillsNeeded}</span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                isBright
                  ? 'bg-[#b9e9fc]/60 text-[#05668d] border-[#05668d]/30'
                  : 'bg-[#161e21] text-[#8ac2c9] border-[#384146]'
              }`}
            >
              Low Stock
            </span>
          </div>
          <p
            className={`text-xs mt-1 ${
              isBright ? 'text-[#033e56]' : 'text-[#9db4c0]'
            }`}
          >
            Auto-refills scheduled with pharmacy
          </p>
        </div>
      </motion.div>
    </div>
  )
}
