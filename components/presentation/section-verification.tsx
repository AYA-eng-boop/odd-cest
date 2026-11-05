'use client'

import { motion } from 'framer-motion'
import { BellRing, CloudSun, Users, type LucideIcon } from 'lucide-react'
import { content } from '@/lib/content'
import { Reveal } from './reveal'
import { CountUp } from './count-up'
import { FigureFooter, Section, Tag } from './ui'

const limitIcons: LucideIcon[] = [CloudSun, Users, BellRing]

function IndicatorTable() {
  const { table } = content.verification
  return (
    <Reveal>
      <div className="glass overflow-hidden rounded-[2rem]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 p-6 sm:px-9">
          <h3 className="text-3xl font-extrabold tracking-tight">{table.title}</h3>
          <span className="rounded-full bg-sun px-4 py-1.5 text-sm font-extrabold">{content.ui.proposal}</span>
        </div>
        <table className="block w-full lg:table">
          <thead className="hidden lg:table-header-group">
            <tr>
              {table.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="bg-navy px-6 py-4 text-left text-sm font-extrabold uppercase tracking-[0.12em] text-paper first:pl-9 last:pr-9"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block lg:table-row-group">
            <tr className="block lg:table-row">
              {table.values.map((value, index) => (
                <motion.td
                  key={value}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.15 }}
                  className="block border-b border-navy/10 px-6 py-5 align-top text-lg font-semibold leading-relaxed first:pl-9 last:border-b-0 last:pr-9 lg:table-cell lg:border-b-0 lg:py-8"
                >
                  <span className="mb-1 block text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft lg:hidden">
                    {table.columns[index]}
                  </span>
                  {value}
                </motion.td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}

function BeforeAfterChart() {
  const { chart } = content.verification
  const bars = [
    { ...chart.before, className: 'bg-navy/80' },
    { ...chart.after, className: 'bg-synergy' },
  ]
  const change = Math.round(((chart.before.value - chart.after.value) / chart.before.value) * 100)
  return (
    <article className="glass relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-3xl font-extrabold tracking-tight">{chart.title}</h3>
        <Tag kind="hoped" />
      </div>
      <p className="mt-3 rounded-xl bg-tension-soft px-4 py-2 text-base font-extrabold text-tension">{chart.label}</p>
      <div
        className="relative mt-6 flex h-72 items-end justify-center gap-10 border-b-2 border-navy/20 px-4"
        role="img"
        aria-label={`${chart.label}. ${chart.before.label} : ${chart.before.value}. ${chart.after.label} : ${chart.after.value}. ${chart.unit}.`}
      >
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-xl border-4 border-tension/50 px-5 py-2 text-3xl font-extrabold uppercase tracking-widest text-tension/50"
          aria-hidden="true"
        >
          {chart.stamp}
        </span>
        {bars.map((bar, index) => (
          <div key={bar.label} className="flex h-full w-28 flex-col items-center justify-end">
            <p className="mb-2 text-3xl font-extrabold">
              <CountUp value={bar.value} />
            </p>
            <motion.div
              className={`w-full rounded-t-2xl ${bar.className}`}
              initial={{ height: 0 }}
              whileInView={{ height: `${bar.value * 0.72}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.2 + index * 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 8px, transparent 8px 16px)' }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-10 px-4">
        {bars.map((bar) => (
          <p key={bar.label} className="w-28 text-center text-lg font-extrabold">
            {bar.label}
          </p>
        ))}
      </div>
      <p className="mt-4 text-center text-base text-ink-soft">
        {chart.unit} · écart : −{change} %
      </p>
      <FigureFooter data={chart.figure} className="mt-auto" />
    </article>
  )
}

function OfficialVsProject() {
  const { official } = content.verification
  const unMetaUrl = content.sources.un_meta.url
  return (
    <article className="glass flex h-full flex-col rounded-[2rem] p-7 sm:p-9">
      <h3 className="text-2xl font-extrabold leading-snug tracking-tight">{official.title}</h3>
      <div className="mt-6 rounded-3xl bg-[#efe6ff] p-5">
        <Tag kind="announced" />
        <p className="mt-3 text-sm font-extrabold uppercase tracking-[0.14em] text-tag-purple">{official.officialLabel}</p>
        <p className="mt-1 text-lg leading-relaxed">{official.official}</p>
        <a href={unMetaUrl ?? undefined} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-bold underline underline-offset-4">
          {content.sources.un_meta.label}
        </a>
      </div>
      <div className="mt-4 rounded-3xl bg-sun-soft p-5">
        <span className="inline-flex rounded-full bg-sun px-3 py-1 text-sm font-extrabold">{content.ui.proposal}</span>
        <p className="mt-3 text-sm font-extrabold uppercase tracking-[0.14em]">{official.projectLabel}</p>
        <p className="mt-1 text-lg leading-relaxed">{official.project}</p>
      </div>
      <FigureFooter data={official.figure} className="mt-auto" />
    </article>
  )
}

function Limits() {
  const { limits } = content.verification
  return (
    <div>
      <Reveal>
        <h3 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{limits.title}</h3>
      </Reveal>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {limits.items.map((item, index) => {
          const Icon = limitIcons[index]
          return (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="glass rounded-3xl p-6"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-tension-soft text-tension">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-4 text-xl font-semibold leading-snug">{item}</p>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

export function SectionVerification() {
  const v = content.verification
  return (
    <Section id={v.id} number={v.number} title={v.title} intro={v.intro} sourceKeys={v.sourceKeys}>
      <IndicatorTable />
      <div className="grid items-stretch gap-8 lg:grid-cols-2">
        <Reveal>
          <BeforeAfterChart />
        </Reveal>
        <Reveal delay={0.1}>
          <OfficialVsProject />
        </Reveal>
      </div>
      <Limits />
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sun via-[#ffd84d] to-[#ffe9a0] p-8 shadow-[0_30px_70px_-30px_rgba(252,195,11,0.9)] sm:p-12 lg:p-16">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-navy/70">{v.conclusionLabel}</p>
          <p className="mt-5 max-w-5xl text-balance text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl">
            {v.conclusion}
          </p>
          <Tag kind="hoped" className="mt-8 bg-white/80" />
        </div>
      </Reveal>
    </Section>
  )
}
