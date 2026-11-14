import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useApp } from '@/context/AppContext'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useApp()
  const isBright = theme === 'bright'

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isBright ? 'Dark' : 'Bright'} Mode`}
      title={`Switch to ${isBright ? 'Dark' : 'Bright'} Mode`}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl transition-all duration-300 ${
        isBright
          ? 'bg-slate-100 hover:bg-slate-200/80 text-[#05668d] border border-[#b9e9fc] shadow-sm'
          : 'bg-[#161e21] hover:bg-[#253237] text-[#32e5eb] border border-[#384146] shadow-sm'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          {isBright ? (
            <Sun className="w-4 h-4 text-[#05668d]" />
          ) : (
            <Moon className="w-4 h-4 text-[#32e5eb]" />
          )}
        </motion.div>
      </div>

      {showLabel && (
        <span className="text-xs font-semibold capitalize pr-1">
          {theme} Mode
        </span>
      )}
    </button>
  )
}
