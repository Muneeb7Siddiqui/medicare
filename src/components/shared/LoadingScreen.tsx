import React from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden mesh-bg">
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Animated Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center relative z-10"
      >
        {/* Animated Capsule Graphic */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-8">
          {/* Outer rotating pulse ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-sky-400/30"
          />

          {/* Glowing Pill / Capsule Silhouette */}
          <motion.div
            animate={{
              y: [-6, 6, -6],
              rotate: [15, -15, 15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-14 h-24 rounded-full p-1 bg-gradient-to-b from-sky-400 to-teal-400 shadow-[0_0_35px_rgba(56,189,248,0.4)] flex flex-col items-center justify-between"
          >
            {/* Top Half */}
            <div className="w-full h-1/2 rounded-t-full bg-sky-500 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white/90" />
            </div>
            {/* Divider Band */}
            <div className="w-full h-0.5 bg-white/40 shadow-sm" />
            {/* Bottom Half */}
            <div className="w-full h-1/2 rounded-b-full bg-white/95 flex items-center justify-center">
              <span className="text-[8px] font-bold text-slate-800 tracking-wider">RX</span>
            </div>
          </motion.div>
        </div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight font-['Plus_Jakarta_Sans']">
            Medi<span className="text-sky-400">Care</span>
          </h2>
          <p className="text-xs tracking-widest uppercase font-semibold text-slate-400 mt-1">
            Healthcare, Reimagined
          </p>
        </motion.div>

        {/* Elegant Linear Progress */}
        <div className="w-48 h-1 bg-slate-800/80 rounded-full mt-6 overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-500 via-teal-400 to-sky-400 rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}
