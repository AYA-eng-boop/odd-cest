'use client'

import { motion } from 'framer-motion'
import { BellRing } from 'lucide-react'
import { content } from '@/lib/content'

const hourly = [22, 20, 18, 18, 19, 26, 42, 66, 86, 96, 99, 97, 91, 93, 97, 95, 82, 62, 44, 38, 70, 78, 74, 58]
const width = 480
const height = 150

const points = hourly.map((value, index) => {
  const x = 8 + (index / (hourly.length - 1)) * (width - 16)
  const y = height - 12 - (value / 100) * (height - 28)
  return { x, y }
})
const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ')
const anomalyStart = points[20]
const anomalyEnd = points[23]

export function DashboardMock() {
  const { dashboard } = content.contribution
  return (
    <figure className="overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_50px_-24px_rgba(11,31,58,0.35)]">
      <div className="flex items-center gap-2 border-b border-navy/10 bg-paper-deep px-4 py-3">
        <span className="size-3 rounded-full bg-tension/70" aria-hidden="true" />
        <span className="size-3 rounded-full bg-sun" aria-hidden="true" />
        <span className="size-3 rounded-full bg-synergy/70" aria-hidden="true" />
        <span className="ml-3 truncate rounded-full bg-white px-4 py-1 text-xs font-semibold text-ink-soft">{dashboard.url}</span>
        <span className="ml-auto rounded-full bg-tension-soft px-3 py-1 text-xs font-extrabold text-tension">{dashboard.fake}</span>
      </div>
      <div className="p-5 sm:p-6" role="img" aria-label={`${dashboard.title}. ${dashboard.caption}`}>
        <div className="flex items-center justify-between">
          <p className="text-lg font-extrabold">{dashboard.site}</p>
          <span className="flex items-center gap-2 text-sm font-bold text-synergy">
            <span className="size-2 animate-pulse rounded-full bg-synergy" aria-hidden="true" />
            En direct
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {dashboard.kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-2xl bg-sun-soft p-3">
              <p className="text-xs font-semibold text-ink-soft">{kpi.label}</p>
              <p className="mt-1 text-xl font-extrabold">{kpi.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-navy/10 p-4">
          <p className="text-sm font-bold">{dashboard.chartTitle}</p>
          <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 w-full" aria-hidden="true">
            <rect
              x={anomalyStart.x - 6}
              y={6}
              width={anomalyEnd.x - anomalyStart.x + 12}
              height={height - 20}
              rx={10}
              fill="#e0482f"
              opacity={0.12}
            />
            <line x1="8" y1={height - 12} x2={width - 8} y2={height - 12} stroke="#0b1f3a" strokeOpacity={0.15} />
            <motion.path
              d={linePath}
              fill="none"
              stroke="#0b1f3a"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <circle cx={points[21].x} cy={points[21].y} r={6} fill="#e0482f" />
            <text x={anomalyStart.x - 118} y={26} fontSize={13} fontWeight={700} fill="#e0482f">
              {dashboard.anomaly}
            </text>
          </svg>
        </div>
        <div className="mt-5">
          <p className="flex items-center gap-2 text-sm font-extrabold">
            <BellRing className="size-4 text-tension" aria-hidden="true" />
            {dashboard.alertsTitle}
          </p>
          <ul className="mt-2 flex flex-col gap-2">
            {dashboard.alerts.map((alert) => (
              <li key={alert} className="rounded-xl bg-paper px-3 py-2 text-sm leading-snug">
                {alert}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="border-t border-navy/10 p-5 text-[15px] leading-relaxed text-ink-soft">
        <span className="block font-semibold text-navy">{dashboard.caption}</span>
        <span className="mt-1 inline-block">{dashboard.credit}</span>
      </figcaption>
    </figure>
  )
}
