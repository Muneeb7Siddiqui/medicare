import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Bell,
  ScanLine,
  Calendar,
} from 'lucide-react'
import { useApp } from '@/context/AppContext'

interface DashboardHeaderProps {
  onOpenAddModal: () => void
  onOpenScanModal: () => void
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onOpenAddModal,
  onOpenScanModal,
}) => {
  const {
    userRole,
    searchQuery,
    setSearchQuery,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    theme,
    userName,
    doctorName,
  } = useApp()

  const isBright = theme === 'bright'
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false)

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="relative mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Greeting & Current Status */}
        <div>
          <div
            className={`flex items-center gap-2.5 text-xs font-semibold mb-1.5 ${
              isBright ? 'text-[#045372]' : 'text-[#9db4c0]'
            }`}
          >
            <span className="flex items-center gap-1">
              <Calendar className={`w-3.5 h-3.5 ${isBright ? 'text-[#05668d]' : 'text-[#32e5eb]'}`} />
              <span>{currentDate}</span>
            </span>
            <span>•</span>
            <span className={`flex items-center gap-1 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`}>
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  isBright ? 'bg-[#00a896]' : 'bg-[#32e5eb]'
                }`}
              />
              <span>Telemetry Connected</span>
            </span>
          </div>

          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans'] ${
              isBright ? 'text-[#01151d]' : 'text-white'
            }`}
          >
            {userRole === 'patient' ? (
              <>
                Good morning,{' '}
                <span
                  className={`text-transparent bg-clip-text ${
                    isBright
                      ? 'bg-gradient-to-r from-[#05668d] to-[#00a896]'
                      : 'bg-gradient-to-r from-[#32e5eb] to-[#8ac2c9]'
                  }`}
                >
                  {userName}
                </span>
              </>
            ) : (
              <>
                Caregiver Portal —{' '}
                <span
                  className={`text-transparent bg-clip-text ${
                    isBright
                      ? 'bg-gradient-to-r from-[#00a896] to-[#05668d]'
                      : 'bg-gradient-to-r from-[#8ac2c9] to-[#32e5eb]'
                  }`}
                >
                  Dr. {doctorName}
                </span>
              </>
            )}
          </h1>
          <p className={`text-sm mt-1 ${isBright ? 'text-[#033e56]' : 'text-[#9db4c0]'}`}>
            {userRole === 'patient'
              ? 'You have 4 medications scheduled for today. 2 doses verified taken.'
              : 'Monitoring 3 connected family members. 1 reminder requires confirmation.'}
          </p>
        </div>

        {/* Right: Actions and Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1 sm:w-64">
            <Search
              className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                isBright ? 'text-[#045372]' : 'text-[#9db4c0]'
              }`}
            />
            <input
              type="text"
              placeholder="Search medications, doctor, RX..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl border text-sm transition-colors focus:outline-none ${
                isBright
                  ? 'bg-white border-[#b9e9fc] text-[#01151d] placeholder-[#045372]/60 focus:border-[#05668d]'
                  : 'bg-[#161e21] border-[#384146] text-white placeholder-[#5c6b73] focus:border-[#32e5eb]/50'
              }`}
            />
          </div>

          {/* AI Scan Prescription Button */}
          <button
            onClick={onOpenScanModal}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
              isBright
                ? 'bg-white border-[#b9e9fc] text-[#033e56] hover:bg-slate-50'
                : 'bg-[#161e21] border-[#384146] text-[#c2dfe3] hover:text-white hover:bg-[#253237]'
            }`}
            title="Scan paper prescription with AI Vision"
          >
            <ScanLine className={`w-4 h-4 ${isBright ? 'text-[#05668d]' : 'text-[#32e5eb]'}`} />
            <span className="hidden sm:inline">Scan Rx</span>
          </button>

          {/* Add Medication Button */}
          <button
            onClick={onOpenAddModal}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
              isBright
                ? 'bg-gradient-to-r from-[#05668d] to-[#00a896] hover:from-[#089bd5] hover:to-[#02c39a] text-white shadow-[#05668d]/25'
                : 'bg-gradient-to-r from-[#11a7ad] to-[#32e5eb] hover:from-[#32e5eb] hover:to-[#88f0f3] text-[#070a0b] shadow-[#32e5eb]/20'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Medication</span>
          </button>

          {/* Notification Bell with Badge */}
          <div className="relative">
            <button
              onClick={() => setNotifDrawerOpen(!notifDrawerOpen)}
              className={`p-2 rounded-xl border transition-colors relative ${
                isBright
                  ? 'bg-white border-[#b9e9fc] text-[#05668d] hover:bg-slate-50'
                  : 'bg-[#161e21] border-[#384146] text-[#c2dfe3] hover:text-white hover:bg-[#253237]'
              }`}
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse ${
                    isBright ? 'bg-[#00a896] text-white' : 'bg-[#32e5eb] text-[#070a0b]'
                  }`}
                >
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            <AnimatePresence>
              {notifDrawerOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl p-4 z-50 text-left ${
                    isBright
                      ? 'bg-white border-[#b9e9fc] text-[#01151d]'
                      : 'bg-[#161e21] border-[#384146] text-white'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between pb-3 border-b ${
                      isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
                    }`}
                  >
                    <span className="text-sm font-bold">Notifications</span>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className={`text-xs font-semibold ${
                          isBright ? 'text-[#05668d]' : 'text-[#32e5eb]'
                        }`}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div
                    className={`max-h-72 overflow-y-auto divide-y mt-2 ${
                      isBright ? 'divide-[#b9e9fc]/50' : 'divide-[#384146]/50'
                    }`}
                  >
                    {notifications.length === 0 ? (
                      <p className="py-4 text-xs text-center opacity-60">No notifications</p>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`py-3 px-2 rounded-lg cursor-pointer transition-colors ${
                            n.read
                              ? 'opacity-70'
                              : isBright
                              ? 'bg-[#b9e9fc]/20'
                              : 'bg-[#32e5eb]/5'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-semibold">{n.title}</span>
                            <span className="text-[10px] opacity-60 shrink-0">{n.timestamp}</span>
                          </div>
                          <p className="text-xs mt-0.5 opacity-80 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
