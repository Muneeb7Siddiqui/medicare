import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  Cell,
} from 'recharts'
import {
  WEEKLY_ADHERENCE,
  MONTHLY_TREND,
  TIME_SLOT_COMPLIANCE,
} from '@/data/mockData'
import { TrendingUp, Calendar, Clock } from 'lucide-react'
import { useApp } from '@/context/AppContext'

// Custom theme-aware sleek tooltip
const CustomTooltip = ({ active, payload, label, isBright }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`rounded-xl border p-3 shadow-2xl text-xs ${
          isBright
            ? 'bg-white border-[#b9e9fc] text-[#01151d]'
            : 'bg-[#161e21] border-[#384146] text-white'
        }`}
      >
        <p className={`font-bold mb-1 ${isBright ? 'text-[#05668d]' : 'text-[#32e5eb]'}`}>
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className={isBright ? 'text-[#033e56] capitalize' : 'text-[#c2dfe3] capitalize'}>
              {entry.name}:
            </span>
            <span className="font-semibold">{entry.value}%</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export const AnalyticsCharts: React.FC = () => {
  const { theme } = useApp()
  const isBright = theme === 'bright'

  const cardStyle = isBright
    ? 'bg-white/95 border-[#b9e9fc] shadow-sm'
    : 'bg-[#161e21]/80 border-[#384146] shadow-lg shadow-black/20'

  const axisColor = isBright ? '#045372' : '#9db4c0'
  const gridColor = isBright ? '#f0f3bd' : '#253237'
  const primaryBarColor = isBright ? '#05668d' : '#32e5eb'
  const secondaryBarColor = isBright ? '#028090' : '#11a7ad'
  const areaStrokeColor = isBright ? '#00a896' : '#32e5eb'

  return (
    <div className="space-y-8">
      {/* 2-Column Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Adherence Completion Bar Chart */}
        <div className={`p-6 rounded-2xl border backdrop-blur-md ${cardStyle}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className={`w-4 h-4 ${isBright ? 'text-[#05668d]' : 'text-[#32e5eb]'}`} />
                <h3
                  className={`text-base font-bold font-['Plus_Jakarta_Sans'] ${
                    isBright ? 'text-[#01151d]' : 'text-white'
                  }`}
                >
                  Weekly Dose Adherence
                </h3>
              </div>
              <p className={`text-xs mt-1 ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
                Completed vs scheduled doses across the current week
              </p>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                isBright
                  ? 'bg-[#bbfff8]/50 border-[#00a896]/30 text-[#00a896]'
                  : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
              }`}
            >
              Avg: 97.1%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_ADHERENCE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke={axisColor}
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                />
                <YAxis
                  stroke={axisColor}
                  fontSize={12}
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip content={<CustomTooltip isBright={isBright} />} />
                <Bar
                  dataKey="adherencePercentage"
                  name="Adherence"
                  radius={[6, 6, 0, 0]}
                  animationDuration={1500}
                >
                  {WEEKLY_ADHERENCE.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.adherencePercentage === 100 ? primaryBarColor : secondaryBarColor}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Adherence Trend Area Chart */}
        <div className={`p-6 rounded-2xl border backdrop-blur-md ${cardStyle}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className={`w-4 h-4 ${isBright ? 'text-[#00a896]' : 'text-[#11a7ad]'}`} />
                <h3
                  className={`text-base font-bold font-['Plus_Jakarta_Sans'] ${
                    isBright ? 'text-[#01151d]' : 'text-white'
                  }`}
                >
                  Monthly Adherence Velocity
                </h3>
              </div>
              <p className={`text-xs mt-1 ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
                Trajectory compared to clinical target (95%)
              </p>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                isBright
                  ? 'bg-[#b9e9fc]/40 border-[#05668d]/30 text-[#05668d]'
                  : 'bg-[#161e21] border-[#384146] text-[#32e5eb]'
              }`}
            >
              +6% vs Last Month
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={areaStrokeColor}
                      stopOpacity={isBright ? 0.35 : 0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor={areaStrokeColor}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="week"
                  stroke={axisColor}
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                />
                <YAxis
                  stroke={axisColor}
                  fontSize={12}
                  domain={[80, 100]}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip content={<CustomTooltip isBright={isBright} />} />
                <Area
                  type="monotone"
                  dataKey="rate"
                  name="Adherence"
                  stroke={areaStrokeColor}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRate)"
                  animationDuration={1800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Time-of-Day Compliance Breakdown */}
      <div className={`p-6 rounded-2xl border backdrop-blur-md ${cardStyle}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${isBright ? 'text-[#05668d]' : 'text-[#8ac2c9]'}`} />
            <h3
              className={`text-base font-bold font-['Plus_Jakarta_Sans'] ${
                isBright ? 'text-[#01151d]' : 'text-white'
              }`}
            >
              Compliance by Time Slot
            </h3>
          </div>
          <span className={`text-xs ${isBright ? 'text-[#045372]' : 'text-[#9db4c0]'}`}>
            30-day historical window
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {TIME_SLOT_COMPLIANCE.map((item) => (
            <div
              key={item.slot}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                isBright
                  ? 'bg-[#fcfdf2] border-[#b9e9fc]'
                  : 'bg-[#070a0b]/60 border-[#384146]/80'
              }`}
            >
              <span
                className={`text-xs font-semibold ${
                  isBright ? 'text-[#033e56]' : 'text-[#c2dfe3]'
                }`}
              >
                {item.slot}
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span
                  className={`text-2xl font-bold font-['Plus_Jakarta_Sans'] ${
                    isBright ? 'text-[#01151d]' : 'text-white'
                  }`}
                >
                  {item.completed}%
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isBright ? 'text-[#00a896]' : 'text-[#32e5eb]'
                  }`}
                >
                  On Time
                </span>
              </div>
              <div
                className={`w-full h-1.5 rounded-full mt-3 overflow-hidden ${
                  isBright ? 'bg-[#b9e9fc]/50' : 'bg-[#253237]'
                }`}
              >
                <div
                  className={`h-full rounded-full ${
                    isBright
                      ? 'bg-gradient-to-r from-[#05668d] to-[#00a896]'
                      : 'bg-gradient-to-r from-[#11a7ad] to-[#32e5eb]'
                  }`}
                  style={{ width: `${item.completed}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
