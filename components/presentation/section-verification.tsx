'use client'

import { motion } from 'framer-motion'
import { BellRing, CloudSun, Users, type LucideIcon } from 'lucide-react'
import { content } from '@/lib/content'
import { Reveal } from './reveal'
import { Section, Tag } from './ui'

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
