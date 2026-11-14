import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Pill } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Medication } from '@/data/mockData'

interface AddMedicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddMedicationModal: React.FC<AddMedicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addMedication, theme, doctorName } = useApp()
  const isBright = theme === 'bright'

  const [name, setName] = useState('')
  const [genericName, setGenericName] = useState('')
  const [dosage, setDosage] = useState('20mg')
  const [frequency, setFrequency] = useState('Once Daily')
  const [time, setTime] = useState('08:00 AM')
  const [instructions, setInstructions] = useState('Take with food and water.')
  const [shape, setShape] = useState<'capsule' | 'tablet' | 'softgel'>('capsule')
  const [colorHex, setColorHex] = useState(isBright ? '#05668d' : '#32e5eb')
  const [category, setCategory] = useState<Medication['category']>('Cardiovascular')
  const [totalPills, setTotalPills] = useState(30)
  const [prescriber, setPrescriber] = useState(`Dr. ${doctorName}`)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    addMedication({
      name,
      genericName: genericName || name,
      dosage,
      frequency,
      times: [time],
      instructions,
      shape,
      color: 'Custom Blend',
      colorHex,
      accentColor: isBright ? '#00a896' : '#8ac2c9',
      remainingPills: totalPills,
      totalPills,
      nextDose: time,
      rxNumber: `RX-${Math.floor(100000 + Math.random() * 900000)}`,
      prescriber,
      pharmacy: 'MediCare Central Express',
      category,
      warnings: ['Keep stored in cool, dry place'],
    })

    onClose()
  }

  // Exact custom palette swatches
  const colors = isBright
    ? [
        { hex: '#05668d', label: 'Baltic Blue' },
        { hex: '#028090', label: 'Teal' },
        { hex: '#00a896', label: 'Verdigris' },
        { hex: '#02c39a', label: 'Mint Leaf' },
        { hex: '#d0d82c', label: 'Cream Lime' },
      ]
    : [
        { hex: '#32e5eb', label: 'Light Cyan' },
        { hex: '#8ac2c9', label: 'Light Blue' },
        { hex: '#9db4c0', label: 'Cool Steel' },
        { hex: '#5c6b73', label: 'Blue Slate' },
        { hex: '#465f69', label: 'Jet Black Accent' },
      ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className={`relative w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto ${
            isBright
              ? 'bg-white border-[#b9e9fc] text-[#01151d]'
              : 'bg-[#161e21] border-[#384146] text-white'
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between pb-4 border-b ${
              isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                  isBright
                    ? 'bg-[#b9e9fc]/40 border-[#05668d]/20 text-[#05668d]'
                    : 'bg-[#32e5eb]/10 border-[#32e5eb]/20 text-[#32e5eb]'
                }`}
              >
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans']">
                  Add New Medication
                </h3>
                <p className={`text-xs ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
                  Configure digital twin and schedule parameters
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${
                isBright ? 'text-[#045372] hover:bg-slate-100' : 'text-[#9db4c0] hover:bg-[#253237]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'}`}>
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CardioSafe XR"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                    isBright
                      ? 'bg-[#fcfdf2] border-[#b9e9fc] text-[#01151d] focus:border-[#05668d]'
                      : 'bg-[#070a0b] border-[#384146] text-white focus:border-[#32e5eb]'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'}`}>
                  Dosage / Strength
                </label>
                <input
                  type="text"
                  placeholder="e.g. 20mg or 500IU"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                    isBright
                      ? 'bg-[#fcfdf2] border-[#b9e9fc] text-[#01151d] focus:border-[#05668d]'
                      : 'bg-[#070a0b] border-[#384146] text-white focus:border-[#32e5eb]'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'}`}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                    isBright
                      ? 'bg-[#fcfdf2] border-[#b9e9fc] text-[#01151d] focus:border-[#05668d]'
                      : 'bg-[#070a0b] border-[#384146] text-white focus:border-[#32e5eb]'
                  }`}
                >
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Endocrine">Endocrine</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Vitamins">Vitamins</option>
                  <option value="Respiratory">Respiratory</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'}`}>
                  Scheduled Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 08:00 AM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                    isBright
                      ? 'bg-[#fcfdf2] border-[#b9e9fc] text-[#01151d] focus:border-[#05668d]'
                      : 'bg-[#070a0b] border-[#384146] text-white focus:border-[#32e5eb]'
                  }`}
                />
              </div>
            </div>

            {/* Pill Shape & Color Selection */}
            <div>
              <label className={`block text-xs font-semibold mb-2 ${isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'}`}>
                Pill Visual Appearance (3D Twin)
              </label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {(['capsule', 'tablet', 'softgel'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setShape(s)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                      shape === s
                        ? isBright
                          ? 'bg-[#05668d] text-white border-[#05668d]'
                          : 'bg-[#32e5eb] text-[#070a0b] border-[#32e5eb]'
                        : isBright
                        ? 'bg-[#fcfdf2] border-[#b9e9fc] text-[#045372]'
                        : 'bg-[#070a0b] border-[#384146] text-[#9db4c0]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Color swatches using custom palette */}
              <div className="flex items-center gap-3">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setColorHex(c.hex)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      colorHex === c.hex ? 'scale-125 border-white shadow-md' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'}`}>
                Doctor Instructions
              </label>
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none ${
                  isBright
                    ? 'bg-[#fcfdf2] border-[#b9e9fc] text-[#01151d] focus:border-[#05668d]'
                    : 'bg-[#070a0b] border-[#384146] text-white focus:border-[#32e5eb]'
                }`}
              />
            </div>

            {/* Action buttons */}
            <div
              className={`pt-4 flex items-center justify-end gap-3 border-t ${
                isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
              }`}
            >
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isBright ? 'text-[#045372] hover:bg-slate-100' : 'text-[#9db4c0] hover:bg-[#253237]'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                  isBright
                    ? 'bg-gradient-to-r from-[#05668d] to-[#00a896] hover:from-[#089bd5] hover:to-[#02c39a] text-white shadow-[#05668d]/25'
                    : 'bg-gradient-to-r from-[#11a7ad] to-[#32e5eb] hover:from-[#32e5eb] hover:to-[#88f0f3] text-[#070a0b] shadow-[#32e5eb]/20'
                }`}
              >
                Add Prescription
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
