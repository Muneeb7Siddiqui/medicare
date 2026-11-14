export interface Medication {
  id: string
  name: string
  genericName: string
  dosage: string
  frequency: string
  times: string[]
  instructions: string
  shape: 'capsule' | 'tablet' | 'softgel' | 'liquid'
  color: string
  colorHex: string
  accentColor: string
  remainingPills: number
  totalPills: number
  nextDose: string
  takenToday: boolean
  takenAt?: string
  streakDays: number
  rxNumber: string
  prescriber: string
  pharmacy: string
  category: 'Cardiovascular' | 'Endocrine' | 'Neurology' | 'Vitamins' | 'Respiratory'
  warnings: string[]
  adherenceRate: number
}

export interface Patient {
  id: string
  name: string
  age: number
  avatar: string
  relation: string
  condition: string
  adherenceScore: number
  activeMedsCount: number
  missedDosesThisWeek: number
  lastActive: string
  status: 'optimal' | 'warning' | 'critical'
  emergencyContact: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  type: 'reminder' | 'warning' | 'refill' | 'caregiver' | 'success'
  read: boolean
  medicationId?: string
}

export interface AdherenceDay {
  day: string
  date: string
  scheduled: number
  taken: number
  adherencePercentage: number
}

export interface MonthlyAdherence {
  week: string
  rate: number
  target: number
}

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-1',
    name: 'CardioSafe XR',
    genericName: 'Atorvastatin Calcium',
    dosage: '20mg',
    frequency: 'Once Daily',
    times: ['08:00 AM'],
    instructions: 'Take with food and a full glass of water. Avoid grapefruit.',
    shape: 'capsule',
    color: 'Sky & White',
    colorHex: '#0284c7',
    accentColor: '#38bdf8',
    remainingPills: 14,
    totalPills: 30,
    nextDose: '08:00 AM',
    takenToday: false,
    streakDays: 19,
    rxNumber: 'RX-982410',
    prescriber: 'Dr. Rehan Shaik [K.K], MD (Cardiology)',
    pharmacy: 'MediCare Central Express',
    category: 'Cardiovascular',
    warnings: ['Avoid grapefruit juice', 'Report sudden muscle pain'],
    adherenceRate: 97
  },
  {
    id: 'med-2',
    name: 'Glucorid Balance',
    genericName: 'Metformin Hydrochloride',
    dosage: '500mg',
    frequency: 'Twice Daily',
    times: ['08:30 AM', '08:30 PM'],
    instructions: 'Take during or immediately after meals to reduce stomach discomfort.',
    shape: 'tablet',
    color: 'Teal & Mint',
    colorHex: '#0d9488',
    accentColor: '#2dd4bf',
    remainingPills: 26,
    totalPills: 60,
    nextDose: '08:30 AM',
    takenToday: true,
    takenAt: '08:32 AM',
    streakDays: 42,
    rxNumber: 'RX-771920',
    prescriber: 'Dr. Rehan Shaik [K.K], MD (Endocrinology)',
    pharmacy: 'Walgreen Health Hub #42',
    category: 'Endocrine',
    warnings: ['Monitor blood glucose regularly'],
    adherenceRate: 98
  },
  {
    id: 'med-3',
    name: 'NeuroCalm Pro',
    genericName: 'Sertraline HCl',
    dosage: '50mg',
    frequency: 'Once Daily',
    times: ['09:00 PM'],
    instructions: 'Take at bedtime. Do not alter dose without consulting physician.',
    shape: 'capsule',
    color: 'Indigo & Amber',
    colorHex: '#6366f1',
    accentColor: '#818cf8',
    remainingPills: 7,
    totalPills: 30,
    nextDose: '09:00 PM',
    takenToday: false,
    streakDays: 14,
    rxNumber: 'RX-319042',
    prescriber: 'Dr. Sarah Lin, MD (Neuropsych)',
    pharmacy: 'MediCare Central Express',
    category: 'Neurology',
    warnings: ['Refill soon: 7 days remaining', 'May cause mild drowsiness initially'],
    adherenceRate: 94
  },
  {
    id: 'med-4',
    name: 'VitaShield D3 + K2',
    genericName: 'Cholecalciferol & Menaquinone',
    dosage: '5000 IU',
    frequency: 'Once Daily',
    times: ['12:30 PM'],
    instructions: 'Consume with high healthy fat meal for optimal absorption.',
    shape: 'softgel',
    color: 'Gold & Clear',
    colorHex: '#f59e0b',
    accentColor: '#fbbf24',
    remainingPills: 45,
    totalPills: 90,
    nextDose: '12:30 PM',
    takenToday: false,
    streakDays: 30,
    rxNumber: 'OTC-552199',
    prescriber: 'Dr. Rehan Shaik [K.K], MD',
    pharmacy: 'Organic Health Apothecary',
    category: 'Vitamins',
    warnings: ['Fat-soluble: take with food'],
    adherenceRate: 99
  },
  {
    id: 'med-5',
    name: 'PulmoClear Flow',
    genericName: 'Montelukast Sodium',
    dosage: '10mg',
    frequency: 'Nightly',
    times: ['10:00 PM'],
    instructions: 'Take in the evening. Keep blister pack tightly sealed from humidity.',
    shape: 'tablet',
    color: 'Rose & Pearl',
    colorHex: '#f43f5e',
    accentColor: '#fb7185',
    remainingPills: 21,
    totalPills: 30,
    nextDose: '10:00 PM',
    takenToday: false,
    streakDays: 8,
    rxNumber: 'RX-448201',
    prescriber: 'Dr. Harold Thorne, MD (Pulmonology)',
    pharmacy: 'CareFirst Pharmacy',
    category: 'Respiratory',
    warnings: ['Keep away from direct sunlight'],
    adherenceRate: 91
  },
  {
    id: 'med-6',
    name: 'Vasopress Elite',
    genericName: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Every Morning',
    times: ['07:30 AM'],
    instructions: 'Take in the morning with water. Monitor blood pressure weekly.',
    shape: 'tablet',
    color: 'Cyan & Slate',
    colorHex: '#06b6d4',
    accentColor: '#22d3ee',
    remainingPills: 19,
    totalPills: 30,
    nextDose: '07:30 AM',
    takenToday: true,
    takenAt: '07:28 AM',
    streakDays: 61,
    rxNumber: 'RX-884019',
    prescriber: 'Dr. Rehan Shaik [K.K], MD',
    pharmacy: 'MediCare Central Express',
    category: 'Cardiovascular',
    warnings: ['Check BP weekly', 'Stay hydrated'],
    adherenceRate: 100
  }
]

export const CONNECTED_PATIENTS: Patient[] = [
  {
    id: 'pat-1',
    name: 'Samee',
    age: 28,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    relation: 'Primary Patient',
    condition: 'Cardiovascular Care & Preventive Wellness',
    adherenceScore: 98,
    activeMedsCount: 5,
    missedDosesThisWeek: 0,
    lastActive: '12 min ago (Dose verified)',
    status: 'optimal',
    emergencyContact: '+1 (555) 392-8819'
  },
  {
    id: 'pat-2',
    name: 'Arthur Pendelton',
    age: 81,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    relation: 'Father-in-law',
    condition: 'Post-Op Rehab & Cholesterol',
    adherenceScore: 84,
    activeMedsCount: 4,
    missedDosesThisWeek: 2,
    lastActive: '2 hours ago (Dose overdue)',
    status: 'warning',
    emergencyContact: '+1 (555) 782-9901'
  },
  {
    id: 'pat-3',
    name: 'Clara Hughes',
    age: 68,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    relation: 'Aunt',
    condition: 'Mild Asthma & Osteoporosis',
    adherenceScore: 99,
    activeMedsCount: 3,
    missedDosesThisWeek: 0,
    lastActive: 'Just now (Synced via Smart Bottle)',
    status: 'optimal',
    emergencyContact: '+1 (555) 431-0023'
  }
]

export const WEEKLY_ADHERENCE: AdherenceDay[] = [
  { day: 'Mon', date: 'Nov 09', scheduled: 5, taken: 5, adherencePercentage: 100 },
  { day: 'Tue', date: 'Nov 10', scheduled: 5, taken: 5, adherencePercentage: 100 },
  { day: 'Wed', date: 'Nov 11', scheduled: 5, taken: 4, adherencePercentage: 80 },
  { day: 'Thu', date: 'Nov 12', scheduled: 5, taken: 5, adherencePercentage: 100 },
  { day: 'Fri', date: 'Nov 13', scheduled: 5, taken: 5, adherencePercentage: 100 },
  { day: 'Sat', date: 'Nov 14', scheduled: 5, taken: 5, adherencePercentage: 100 },
  { day: 'Sun', date: 'Nov 15', scheduled: 5, taken: 5, adherencePercentage: 100 }
]

export const MONTHLY_TREND: MonthlyAdherence[] = [
  { week: 'Week 1', rate: 91, target: 95 },
  { week: 'Week 2', rate: 94, target: 95 },
  { week: 'Week 3', rate: 98, target: 95 },
  { week: 'Week 4', rate: 97, target: 95 },
  { week: 'Week 5', rate: 99, target: 95 }
]

export const TIME_SLOT_COMPLIANCE = [
  { slot: 'Morning (07:00 - 10:00)', completed: 98, missed: 2, total: 100 },
  { slot: 'Afternoon (12:00 - 14:00)', completed: 95, missed: 5, total: 100 },
  { slot: 'Evening (18:00 - 20:00)', completed: 96, missed: 4, total: 100 },
  { slot: 'Night (21:00 - 23:00)', completed: 92, missed: 8, total: 100 }
]

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Morning Dose Confirmed',
    message: 'Vasopress Elite (10mg) taken at 07:28 AM. Great job keeping your streak!',
    timestamp: '28 min ago',
    type: 'success',
    read: false,
    medicationId: 'med-6'
  },
  {
    id: 'notif-2',
    title: 'Upcoming Dose in 15 Minutes',
    message: 'CardioSafe XR (20mg) scheduled for 08:00 AM with breakfast.',
    timestamp: '15 min ago',
    type: 'reminder',
    read: false,
    medicationId: 'med-1'
  },
  {
    id: 'notif-3',
    title: 'Prescription Refill Alert',
    message: 'NeuroCalm Pro has only 7 doses remaining. Auto-refill request sent to pharmacy.',
    timestamp: '2 hours ago',
    type: 'refill',
    read: false,
    medicationId: 'med-3'
  },
  {
    id: 'notif-4',
    title: 'Caregiver Update',
    message: 'Eleanor Vance confirmed her morning cardiovascular medication on schedule.',
    timestamp: '4 hours ago',
    type: 'caregiver',
    read: true
  },
  {
    id: 'notif-5',
    title: 'Interaction Check Passed',
    message: 'AI safety engine verified zero hazardous interactions between your 6 active prescriptions.',
    timestamp: 'Yesterday',
    type: 'success',
    read: true
  }
]
