import React from 'react'
import {
  Users,
  PhoneCall,
  Activity,
  Send,
  AlertTriangle,
} from 'lucide-react'
import { useApp } from '@/context/AppContext'

export const CaregiverView: React.FC = () => {
  const { patients, selectedPatient, setSelectedPatient, theme } = useApp()
  const isBright = theme === 'bright'

  return (
    <div className="space-y-8">
      {/* Patient Switcher Tabs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className={`w-4 h-4 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`} />
            <h3
              className={`text-sm font-bold uppercase tracking-wider ${
                isBright ? 'text-[#01151d]' : 'text-slate-300'
              }`}
            >
              Connected Family Members & Patients
            </h3>
          </div>
          <span className={`text-xs ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
            {patients.length} Active Telemetry Links
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patients.map((patient) => {
            const isSelected = patient.id === selectedPatient.id
            const isWarning = patient.status === 'warning'

            return (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? isBright
                      ? 'bg-white border-[#00a896] shadow-md shadow-[#00a896]/15'
                      : 'bg-[#161e21] border-[#32e5eb] shadow-lg shadow-[#32e5eb]/10'
                    : isBright
                    ? 'bg-white/80 border-[#b9e9fc] hover:border-[#05668d]/40'
                    : 'bg-[#161e21]/70 border-[#384146] hover:border-[#5c6b73]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={patient.avatar}
                      alt={patient.name}
                      className={`w-12 h-12 rounded-full object-cover border-2 ${
                        isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
                      }`}
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 ${
                        isBright ? 'border-white' : 'border-[#161e21]'
                      } ${isWarning ? 'bg-amber-500 animate-pulse' : 'bg-[#02c39a]'}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold truncate font-['Plus_Jakarta_Sans'] ${
                          isBright ? 'text-[#01151d]' : 'text-white'
                        }`}
                      >
                        {patient.name}
                      </h4>
                      <span
                        className={`text-[11px] font-semibold ${
                          isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'
                        }`}
                      >
                        {patient.relation}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate mt-0.5 ${
                        isBright ? 'text-[#045372]' : 'text-[#9db4c0]'
                      }`}
                    >
                      Age {patient.age} • {patient.condition}
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
                    isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
                  }`}
                >
                  <div>
                    <span className={isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}>
                      Adherence Score:
                    </span>{' '}
                    <span
                      className={`font-bold ${
                        isWarning
                          ? 'text-amber-500'
                          : isBright
                          ? 'text-[#00a896]'
                          : 'text-[#32e5eb]'
                      }`}
                    >
                      {patient.adherenceScore}%
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      isWarning
                        ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                        : isBright
                        ? 'bg-[#bbfff8]/50 text-[#00a896] border-[#00a896]/30'
                        : 'bg-[#11a7ad]/20 text-[#32e5eb] border-[#32e5eb]/30'
                    }`}
                  >
                    {patient.status}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected Patient Live Telemetry Overview */}
      <div
        className={`p-6 rounded-2xl border backdrop-blur-md ${
          isBright
            ? 'bg-white/95 border-[#b9e9fc] shadow-sm'
            : 'bg-[#161e21]/80 border-[#384146] shadow-lg shadow-black/20'
        }`}
      >
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${
            isBright ? 'border-[#b9e9fc]' : 'border-[#384146]'
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <Activity className={`w-5 h-5 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`} />
              <h3
                className={`text-lg font-bold font-['Plus_Jakarta_Sans'] ${
                  isBright ? 'text-[#01151d]' : 'text-white'
                }`}
              >
                Live Telemetry: {selectedPatient.name}
              </h3>
            </div>
            <p className={`text-xs mt-1 ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
              Smart Pill Bottle IoT sync • {selectedPatient.lastActive}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${selectedPatient.emergencyContact}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                isBright
                  ? 'bg-slate-100 hover:bg-[#b9e9fc]/40 text-[#033e56] border-[#b9e9fc]'
                  : 'bg-[#253237] hover:bg-[#384146] text-[#c2dfe3] border-[#384146]'
              }`}
            >
              <PhoneCall className={`w-3.5 h-3.5 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`} />
              <span>Call Patient</span>
            </a>

            <button
              onClick={() =>
                alert(
                  `A gentle nudge reminder was sent to ${selectedPatient.name}'s phone and smart dispenser.`
                )
              }
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all ${
                isBright
                  ? 'bg-gradient-to-r from-[#05668d] to-[#00a896] text-white shadow-[#05668d]/20'
                  : 'bg-gradient-to-r from-[#11a7ad] to-[#32e5eb] text-[#070a0b] shadow-[#32e5eb]/20'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Nudge Ping</span>
            </button>
          </div>
        </div>

        {/* Warning Alert if needed */}
        {selectedPatient.status === 'warning' && (
          <div className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-600 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
            <div>
              <strong className="font-semibold">Action Recommended:</strong>{' '}
              {selectedPatient.name} has missed 2 scheduled doses this week. The afternoon
              Glucorid Balance 500mg dose is currently 2 hours overdue.
            </div>
          </div>
        )}

        {/* Key Patient Vitals / Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div
            className={`p-4 rounded-xl border ${
              isBright
                ? 'bg-[#fcfdf2] border-[#b9e9fc]'
                : 'bg-[#070a0b]/60 border-[#384146]/80'
            }`}
          >
            <span className={`text-xs font-semibold ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
              Current Adherence
            </span>
            <div
              className={`text-2xl font-bold mt-1 font-['Plus_Jakarta_Sans'] ${
                isBright ? 'text-[#01151d]' : 'text-white'
              }`}
            >
              {selectedPatient.adherenceScore}%
            </div>
            <p className={`text-[11px] mt-1 ${isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'}`}>
              30-day compliance rolling index
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isBright
                ? 'bg-[#fcfdf2] border-[#b9e9fc]'
                : 'bg-[#070a0b]/60 border-[#384146]/80'
            }`}
          >
            <span className={`text-xs font-semibold ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
              Active Prescriptions
            </span>
            <div
              className={`text-2xl font-bold mt-1 font-['Plus_Jakarta_Sans'] ${
                isBright ? 'text-[#01151d]' : 'text-white'
              }`}
            >
              {selectedPatient.activeMedsCount} Rx
            </div>
            <p className={`text-[11px] mt-1 ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
              Zero known drug interactions
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isBright
                ? 'bg-[#fcfdf2] border-[#b9e9fc]'
                : 'bg-[#070a0b]/60 border-[#384146]/80'
            }`}
          >
            <span className={`text-xs font-semibold ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
              Emergency Contact
            </span>
            <div
              className={`text-sm font-bold mt-2 font-mono ${
                isBright ? 'text-[#01151d]' : 'text-white'
              }`}
            >
              {selectedPatient.emergencyContact}
            </div>
            <p className={`text-[11px] mt-1 ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
              Primary designated caregiver
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
