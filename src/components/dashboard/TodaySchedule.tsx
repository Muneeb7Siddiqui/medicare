import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { MedicationCard } from './MedicationCard'
import { useApp } from '@/context/AppContext'
import { Filter, AlertCircle } from 'lucide-react'

export const TodaySchedule: React.FC = () => {
  const {
    medications,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    theme,
  } = useApp()

  const isBright = theme === 'bright'
  const categories = ['All', 'Cardiovascular', 'Endocrine', 'Neurology', 'Vitamins', 'Respiratory']

  // Filter medications
  const filteredMeds = medications.filter((med) => {
    const matchesCategory =
      selectedCategory === 'All' || med.category === selectedCategory
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.prescriber.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const morningMeds = filteredMeds.filter((m) =>
    m.times.some((t) => t.includes('AM'))
  )
  const eveningMeds = filteredMeds.filter((m) =>
    m.times.some((t) => t.includes('PM'))
  )

  return (
    <div className="space-y-6">
      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div
          className={`flex items-center gap-1.5 text-xs mr-2 shrink-0 ${
            isBright ? 'text-[#045372]' : 'text-[#9db4c0]'
          }`}
        >
          <Filter className={`w-3.5 h-3.5 ${isBright ? 'text-[#05668d]' : 'text-[#32e5eb]'}`} />
          <span>Category:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? isBright
                  ? 'bg-[#05668d] text-white border-[#05668d] shadow-sm'
                  : 'bg-[#32e5eb] text-[#070a0b] border-[#32e5eb] font-bold shadow-sm'
                : isBright
                ? 'bg-white border-[#b9e9fc] text-[#033e56] hover:bg-[#b9e9fc]/20'
                : 'bg-[#161e21] border-[#384146] text-[#9db4c0] hover:text-white hover:bg-[#253237]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Schedule Sections */}
      {filteredMeds.length === 0 ? (
        <div
          className={`p-12 text-center rounded-2xl border ${
            isBright
              ? 'bg-white/80 border-[#b9e9fc]'
              : 'bg-[#161e21]/40 border-[#384146]'
          }`}
        >
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-60" />
          <h4
            className={`text-base font-bold ${
              isBright ? 'text-[#01151d]' : 'text-white'
            }`}
          >
            No medications match your filter
          </h4>
          <p className={`text-xs mt-1 ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
            Try adjusting your search query or selecting a different category.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Morning Doses Section */}
          {morningMeds.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                  <h3
                    className={`text-sm font-bold uppercase tracking-wider ${
                      isBright ? 'text-[#01151d]' : 'text-white'
                    }`}
                  >
                    Morning Schedule (07:00 AM – 11:59 AM)
                  </h3>
                </div>
                <span className={`text-xs ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
                  {morningMeds.filter((m) => m.takenToday).length} of {morningMeds.length} Taken
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {morningMeds.map((med) => (
                    <MedicationCard key={med.id} medication={med} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Evening & Night Doses Section */}
          {eveningMeds.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isBright
                        ? 'bg-[#05668d] shadow-[0_0_8px_#05668d]'
                        : 'bg-[#32e5eb] shadow-[0_0_8px_#32e5eb]'
                    }`}
                  />
                  <h3
                    className={`text-sm font-bold uppercase tracking-wider ${
                      isBright ? 'text-[#01151d]' : 'text-white'
                    }`}
                  >
                    Evening & Bedtime Schedule (12:00 PM – 11:59 PM)
                  </h3>
                </div>
                <span className={`text-xs ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
                  {eveningMeds.filter((m) => m.takenToday).length} of {eveningMeds.length} Taken
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {eveningMeds.map((med) => (
                    <MedicationCard key={med.id} medication={med} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
