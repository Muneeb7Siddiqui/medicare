import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  BarChart3,
  Users,
} from 'lucide-react'
import { Navbar } from '@/components/shared/Navbar'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { StatCards } from '@/components/dashboard/StatCards'
import { TodaySchedule } from '@/components/dashboard/TodaySchedule'
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts'
import { CaregiverView } from '@/components/dashboard/CaregiverView'
import { AddMedicationModal } from '@/components/dashboard/AddMedicationModal'
import { PrescriptionScannerModal } from '@/components/dashboard/PrescriptionScannerModal'
import { CelebrationModal } from '@/components/shared/CelebrationModal'
import { useApp } from '@/context/AppContext'

export const DashboardPage: React.FC = () => {
  const { userRole, theme } = useApp()
  const isBright = theme === 'bright'

  const [activeTab, setActiveTab] = useState<'schedule' | 'analytics' | 'caregiver'>(
    userRole === 'caregiver' ? 'caregiver' : 'schedule'
  )
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isScanModalOpen, setIsScanModalOpen] = useState(false)

  const tabs = [
    { id: 'schedule', label: "Today's Schedule", icon: Calendar },
    { id: 'analytics', label: 'Adherence Analytics', icon: BarChart3 },
    { id: 'caregiver', label: 'Caregiver Telemetry', icon: Users },
  ] as const

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        {/* Header with Greeting & Search */}
        <DashboardHeader
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onOpenScanModal={() => setIsScanModalOpen(true)}
        />

        {/* Top KPI Metrics Cards */}
        <StatCards />

        {/* Dashboard Navigation Tabs */}
        <div
          className={`flex items-center gap-2 border-b pb-px mb-8 ${
            isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
          }`}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? isBright
                      ? 'text-[#05668d]'
                      : 'text-[#32e5eb]'
                    : isBright
                    ? 'text-[#045372] hover:text-[#05668d]'
                    : 'text-[#9db4c0] hover:text-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? isBright
                        ? 'text-[#05668d]'
                        : 'text-[#32e5eb]'
                      : isBright
                      ? 'text-[#045372]'
                      : 'text-[#5c6b73]'
                  }`}
                />
                <span>{tab.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                      isBright
                        ? 'bg-gradient-to-r from-[#05668d] to-[#00a896]'
                        : 'bg-gradient-to-r from-[#32e5eb] to-[#8ac2c9]'
                    }`}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TodaySchedule />
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AnalyticsCharts />
              </motion.div>
            )}

            {activeTab === 'caregiver' && (
              <motion.div
                key="caregiver"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <CaregiverView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modals & Portals */}
      <AddMedicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <PrescriptionScannerModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
      />
      <CelebrationModal />
    </div>
  )
}
export default DashboardPage
