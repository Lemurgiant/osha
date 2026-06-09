import type { ReactNode } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Activity, Target, TrendingUp } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import type { WeekPoint } from '../../types'

export interface AnalyticsViewProps {
  weekly: WeekPoint[]
  formName: string
}

const OSHA_TARGET = 90

function average(values: number[]): number {
  if (values.length === 0) return 0
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length)
}

interface KpiCardProps {
  icon: typeof TrendingUp
  label: string
  value: string
  sub: string
  color: string
  bg: string
}

function KpiCard({ icon: Icon, label, value, sub, color, bg }: KpiCardProps) {
  const C = useTheme()
  return (
    <div style={{
      flex: 1,
      padding: '18px 20px',
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      background: C.panel,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12.5, color: C.textFaint, fontWeight: 600 }}>{label}</span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: 8,
          background: bg,
          color,
        }}>
          <Icon size={16} />
        </div>
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: C.text, marginTop: 10, letterSpacing: -0.5 }}>{value}</div>
      <div style={{ fontSize: 12, color: C.textFaint, marginTop: 4 }}>{sub}</div>
    </div>
  )
}

export function AnalyticsView({ weekly, formName }: AnalyticsViewProps) {
  const C = useTheme()

  const scores = weekly.map((w) => w.score)
  const subs = weekly.map((w) => w.subs)
  const latest = weekly[weekly.length - 1]
  const first = weekly[0]
  const avgScore = average(scores)
  const totalSubs = subs.reduce((sum, v) => sum + v, 0)
  const trendDelta = latest && first ? latest.score - first.score : 0
  const aboveTarget = latest ? latest.score >= OSHA_TARGET : false

  return (
    <div style={{ padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <KpiCard
          icon={Activity}
          label="Avg. Compliance (5wk)"
          value={`${avgScore}%`}
          sub={aboveTarget ? 'Currently meeting OSHA target' : 'Trending toward OSHA target'}
          color={C.accent}
          bg={C.accentBg}
        />
        <KpiCard
          icon={TrendingUp}
          label="Trend vs. 5 Weeks Ago"
          value={`${trendDelta >= 0 ? '+' : ''}${trendDelta} pts`}
          sub={trendDelta >= 0 ? 'Compliance improving week over week' : 'Compliance declining — review needed'}
          color={trendDelta >= 0 ? C.success : C.danger}
          bg={trendDelta >= 0 ? C.successBg : C.dangerBg}
        />
        <KpiCard
          icon={Target}
          label="Total Submissions (5wk)"
          value={String(totalSubs)}
          sub={`${formName} program activity`}
          color={C.info}
          bg={C.infoBg}
        />
      </div>

      <ChartPanel title="Weekly Submission Volume">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={weekly}>
            <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="wk" tick={{ fill: C.textFaint, fontSize: 11.5 }} axisLine={{ stroke: C.border }} tickLine={false} />
            <YAxis tick={{ fill: C.textFaint, fontSize: 11.5 }} axisLine={{ stroke: C.border }} tickLine={false} />
            <Tooltip
              contentStyle={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12.5 }}
              labelStyle={{ color: C.text }}
            />
            <Bar dataKey="subs" name="Submissions" fill={C.accent} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartPanel>

      <ChartPanel title="Compliance Trend vs. 90% OSHA Target">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={weekly}>
            <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="wk" tick={{ fill: C.textFaint, fontSize: 11.5 }} axisLine={{ stroke: C.border }} tickLine={false} />
            <YAxis domain={[60, 100]} tick={{ fill: C.textFaint, fontSize: 11.5 }} axisLine={{ stroke: C.border }} tickLine={false} />
            <Tooltip
              contentStyle={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12.5 }}
              labelStyle={{ color: C.text }}
            />
            <Legend wrapperStyle={{ fontSize: 12.5, color: C.textDim }} />
            <ReferenceLine y={OSHA_TARGET} stroke={C.danger} strokeDasharray="6 4" label={{ value: 'OSHA Target (90%)', fill: C.danger, fontSize: 11.5, position: 'insideTopRight' }} />
            <Line type="monotone" dataKey="score" name="Compliance Score" stroke={C.accent} strokeWidth={2.5} dot={{ r: 4, fill: C.accent }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartPanel>
    </div>
  )
}

interface ChartPanelProps {
  title: string
  children: ReactNode
}

function ChartPanel({ title, children }: ChartPanelProps) {
  const C = useTheme()
  return (
    <div style={{
      padding: '18px 20px',
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      background: C.panel,
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  )
}
