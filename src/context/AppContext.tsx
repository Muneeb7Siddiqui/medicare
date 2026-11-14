import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  Medication,
  Patient,
  NotificationItem,
  INITIAL_MEDICATIONS,
  CONNECTED_PATIENTS,
  INITIAL_NOTIFICATIONS,
} from '@/data/mockData'

export type ThemeMode = 'dark' | 'bright'

interface AppContextType {
  medications: Medication[]
  markAsTaken: (id: string) => void
  addMedication: (med: Omit<Medication, 'id' | 'takenToday' | 'streakDays' | 'adherenceRate'>) => void
  userRole: 'patient' | 'caregiver'
  setUserRole: (role: 'patient' | 'caregiver') => void
  selectedPatient: Patient
  setSelectedPatient: (patient: Patient) => void
  patients: Patient[]
  notifications: NotificationItem[]
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void
  unreadNotificationsCount: number
  celebrationMed: Medication | null
  clearCelebration: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  userName: string
  setUserName: (name: string) => void
  doctorName: string
  setDoctorName: (name: string) => void
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS)
  const [userRole, setUserRole] = useState<'patient' | 'caregiver'>('patient')
  const [patients] = useState<Patient[]>(CONNECTED_PATIENTS)
  const [selectedPatient, setSelectedPatient] = useState<Patient>(CONNECTED_PATIENTS[0])
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)
  const [celebrationMed, setCelebrationMed] = useState<Medication | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [userName, setUserName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('medicare_user_name')
      if (saved) return saved
    }
    return 'Samee'
  })

  useEffect(() => {
    localStorage.setItem('medicare_user_name', userName)
  }, [userName])

  const [doctorName, setDoctorName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('medicare_doctor_name')
      if (saved) return saved
    }
    return 'Rehan Shaik [K.K]'
  })

  useEffect(() => {
    localStorage.setItem('medicare_doctor_name', doctorName)
  }, [doctorName])

  // Theme mode: 'dark' or 'bright'
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('medicare_theme') as ThemeMode
      if (saved === 'bright' || saved === 'dark') return saved
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'bright') {
      root.classList.remove('dark')
      root.classList.add('bright')
      root.setAttribute('data-theme', 'bright')
    } else {
      root.classList.remove('bright')
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    }
    localStorage.setItem('medicare_theme', theme)
  }, [theme])

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'bright' : 'dark'))
  }

  const markAsTaken = (id: string) => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          const isNowTaken = !med.takenToday
          if (isNowTaken) {
            setCelebrationMed(med)
            // Add a notification
            const newNotif: NotificationItem = {
              id: `notif-${Date.now()}`,
              title: `${med.name} Verified Taken`,
              message: `Dose recorded at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Adherence streak: ${med.streakDays + 1} days!`,
              timestamp: 'Just now',
              type: 'success',
              read: false,
              medicationId: med.id,
            }
            setNotifications((n) => [newNotif, ...n])
          }
          return {
            ...med,
            takenToday: isNowTaken,
            takenAt: isNowTaken ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
            remainingPills: isNowTaken ? Math.max(0, med.remainingPills - 1) : med.remainingPills,
            streakDays: isNowTaken ? med.streakDays + 1 : Math.max(0, med.streakDays - 1),
          }
        }
        return med
      })
    )
  }

  const clearCelebration = () => setCelebrationMed(null)

  const addMedication = (newMedData: Omit<Medication, 'id' | 'takenToday' | 'streakDays' | 'adherenceRate'>) => {
    const newMed: Medication = {
      ...newMedData,
      id: `med-${Date.now()}`,
      takenToday: false,
      streakDays: 0,
      adherenceRate: 100,
    }
    setMedications((prev) => [newMed, ...prev])
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length

  return (
    <AppContext.Provider
      value={{
        medications,
        markAsTaken,
        addMedication,
        userRole,
        setUserRole,
        selectedPatient,
        setSelectedPatient,
        patients,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        celebrationMed,
        clearCelebration,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        userName,
        setUserName,
        doctorName,
        setDoctorName,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
