import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ScanLine, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react'
import { useApp } from '@/context/AppContext'

interface PrescriptionScannerModalProps {
  isOpen: boolean
  onClose: () => void
}

export const PrescriptionScannerModal: React.FC<PrescriptionScannerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addMedication, theme, doctorName } = useApp()
  const isBright = theme === 'bright'

  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)

  if (!isOpen) return null

  const handleStartScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setScanComplete(true)
    }, 2200)
  }

  const handleApplyExtracted = () => {
    addMedication({
      name: 'CardioSafe XR',
      genericName: 'Atorvastatin Calcium',
      dosage: '20mg',
      frequency: 'Once Daily',
      times: ['08:00 AM'],
      instructions: 'Take 1 capsule by mouth daily with morning meal.',
      shape: 'capsule',
      color: 'Sky & White',
      colorHex: isBright ? '#05668d' : '#32e5eb',
      accentColor: isBright ? '#00a896' : '#8ac2c9',
      remainingPills: 30,
      totalPills: 30,
      nextDose: '08:00 AM',
      rxNumber: 'RX-992144',
      prescriber: `Dr. ${doctorName}`,
      pharmacy: 'MediCare Central Express',
      category: 'Cardiovascular',
      warnings: ['Avoid grapefruit juice', 'Verify with primary GP'],
    })
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className={`relative w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl z-10 ${
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
                    ? 'bg-[#bbfff8]/50 border-[#00a896]/30 text-[#00a896]'
                    : 'bg-[#11a7ad]/20 border-[#32e5eb]/30 text-[#32e5eb]'
                }`}
              >
                <ScanLine className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans']">
                  AI Prescription Scanner
                </h3>
                <p className={`text-xs ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
                  Instant optical character recognition & safety verification
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

          {/* Scanner Viewport */}
          <div
            className={`mt-6 relative h-64 rounded-2xl border flex flex-col items-center justify-center overflow-hidden p-6 text-center ${
              isBright ? 'bg-[#fcfdf2] border-[#b9e9fc]' : 'bg-[#070a0b] border-[#384146]'
            }`}
          >
            {/* Prescription mock sheet */}
            <div
              className={`w-48 h-52 rounded-xl border p-4 shadow-xl flex flex-col justify-between text-left relative ${
                isBright
                  ? 'bg-white border-[#b9e9fc]'
                  : 'bg-[#161e21] border-[#384146]'
              }`}
            >
              <div>
                <div
                  className={`flex items-center justify-between border-b pb-2 mb-2 ${
                    isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
                  }`}
                >
                  <span className={`text-[10px] font-bold ${isBright ? 'text-[#05668d]' : 'text-[#32e5eb]'}`}>
                    RX SCRIPT #992144
                  </span>
                  <span className={`text-[8px] ${isBright ? 'text-[#045372]' : 'text-[#5c6b73]'}`}>
                    STANFORD HEALTH
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className={`h-2 rounded w-3/4 ${isBright ? 'bg-[#b9e9fc]' : 'bg-[#253237]'}`} />
                  <div className={`h-1.5 rounded w-1/2 ${isBright ? 'bg-[#b9e9fc]/60' : 'bg-[#253237]/60'}`} />
                  <div className={`h-1.5 rounded w-5/6 ${isBright ? 'bg-[#b9e9fc]/60' : 'bg-[#253237]/60'}`} />
                </div>
              </div>

              <div className={`text-[9px] border-t pt-2 ${isBright ? 'border-[#b9e9fc] text-[#033e56]' : 'border-[#384146] text-[#9db4c0]'}`}>
                Sig: 1 Cap Daily in AM
              </div>

              {/* Bounding box highlight if scan finished */}
              {scanComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`absolute inset-2 border-2 rounded-lg pointer-events-none flex items-center justify-center ${
                    isBright
                      ? 'border-[#00a896] bg-[#00a896]/10'
                      : 'border-[#32e5eb] bg-[#32e5eb]/10'
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      isBright
                        ? 'bg-white text-[#00a896] border-[#00a896]'
                        : 'bg-[#070a0b] text-[#32e5eb] border-[#32e5eb]'
                    }`}
                  >
                    100% MATCH
                  </span>
                </motion.div>
              )}
            </div>

            {/* Sweeping Laser Line while scanning */}
            {isScanning && (
              <motion.div
                className={`absolute inset-x-0 h-1 z-20 pointer-events-none ${
                  isBright
                    ? 'bg-gradient-to-r from-transparent via-[#05668d] to-transparent shadow-[0_0_15px_#05668d]'
                    : 'bg-gradient-to-r from-transparent via-[#32e5eb] to-transparent shadow-[0_0_15px_#32e5eb]'
                }`}
                animate={{ top: ['5%', '90%', '5%'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>

          {/* Results feedback */}
          <div className="mt-4">
            {isScanning ? (
              <div
                className={`p-3 rounded-xl border text-center ${
                  isBright
                    ? 'bg-[#b9e9fc]/30 border-[#05668d]/30 text-[#05668d]'
                    : 'bg-[#32e5eb]/10 border-[#32e5eb]/30 text-[#32e5eb]'
                }`}
              >
                <span className="text-xs font-semibold flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning prescription text and checking FDA drug database...</span>
                </span>
              </div>
            ) : scanComplete ? (
              <div
                className={`p-3.5 rounded-xl border ${
                  isBright
                    ? 'bg-[#bbfff8]/30 border-[#00a896]/30'
                    : 'bg-[#11a7ad]/20 border-[#32e5eb]/30'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-xs font-bold mb-1 ${
                    isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Prescription Identified Successfully</span>
                </div>
                <p className={`text-xs ${isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'}`}>
                  <strong>CardioSafe XR 20mg</strong> (Atorvastatin Calcium) • Once Daily • Dr. {doctorName}
                </p>
              </div>
            ) : (
              <p className={`text-xs text-center ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
                Click below to run computer vision OCR extraction on sample doctor script.
              </p>
            )}
          </div>

          {/* Footer Controls */}
          <div
            className={`mt-6 pt-4 border-t flex items-center justify-between ${
              isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
            }`}
          >
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                isBright ? 'text-[#045372] hover:text-[#01151d]' : 'text-[#9db4c0] hover:text-white'
              }`}
            >
              Cancel
            </button>

            {!scanComplete ? (
              <button
                disabled={isScanning}
                onClick={handleStartScan}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md disabled:opacity-50 ${
                  isBright
                    ? 'bg-gradient-to-r from-[#05668d] to-[#00a896] text-white shadow-[#05668d]/20'
                    : 'bg-gradient-to-r from-[#11a7ad] to-[#32e5eb] text-[#070a0b] shadow-[#32e5eb]/20'
                }`}
              >
                <ScanLine className="w-4 h-4" />
                <span>{isScanning ? 'Analyzing...' : 'Simulate Camera Scan'}</span>
              </button>
            ) : (
              <button
                onClick={handleApplyExtracted}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md ${
                  isBright
                    ? 'bg-gradient-to-r from-[#00a896] to-[#02c39a] shadow-[#00a896]/20'
                    : 'bg-gradient-to-r from-[#11a7ad] to-[#32e5eb] text-[#070a0b] shadow-[#32e5eb]/20'
                }`}
              >
                <span>Add Extracted Rx to Regimen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
