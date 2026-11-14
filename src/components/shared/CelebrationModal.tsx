import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Flame } from 'lucide-react'
import { AnimatedCheckmark } from '@/components/ui/AnimatedCheckmark'
import { useApp } from '@/context/AppContext'

export const CelebrationModal: React.FC = () => {
  const { celebrationMed, clearCelebration, theme } = useApp()
  const isBright = theme === 'bright'

  if (!celebrationMed) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={clearCelebration}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className={`relative w-full max-w-sm rounded-3xl border p-6 text-center z-10 overflow-hidden shadow-2xl ${
            isBright
              ? 'bg-white border-[#b9e9fc] text-[#01151d]'
              : 'bg-[#161e21] border-[#384146] text-white shadow-[#32e5eb]/20'
          }`}
        >
          {/* Confetti Ambient Flare */}
          <div
            className={`absolute -top-12 -left-12 w-32 h-32 rounded-full blur-2xl pointer-events-none ${
              isBright ? 'bg-[#02c39a]/20' : 'bg-[#32e5eb]/20'
            }`}
          />
          <div
            className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none ${
              isBright ? 'bg-[#05668d]/20' : 'bg-[#11a7ad]/20'
            }`}
          />

          {/* Close button */}
          <button
            onClick={clearCelebration}
            className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${
              isBright ? 'text-[#045372] hover:bg-slate-100' : 'text-[#9db4c0] hover:bg-[#253237]'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Animated Big Checkmark */}
          <div className="flex justify-center mb-4 mt-2">
            <AnimatedCheckmark checked={true} size={68} />
          </div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`text-xl font-bold font-['Plus_Jakarta_Sans'] ${
              isBright ? 'text-[#01151d]' : 'text-white'
            }`}
          >
            Dose Recorded On Time!
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-sm mt-1 ${isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'}`}
          >
            <span className="font-semibold">{celebrationMed.name}</span> ({celebrationMed.dosage})
          </motion.p>

          {/* Streak indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-semibold ${
              isBright
                ? 'bg-[#bbfff8]/50 border-[#00a896]/30 text-[#00a896]'
                : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
            <span>Streak increased to {celebrationMed.streakDays} consecutive days!</span>
          </motion.div>

          <div className="mt-6">
            <button
              onClick={clearCelebration}
              className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-opacity shadow-md ${
                isBright
                  ? 'bg-gradient-to-r from-[#05668d] to-[#00a896] text-white shadow-[#05668d]/25'
                  : 'bg-gradient-to-r from-[#11a7ad] to-[#32e5eb] text-[#070a0b] shadow-[#32e5eb]/25 font-bold'
              }`}
            >
              Continue
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
