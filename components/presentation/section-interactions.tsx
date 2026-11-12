'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Gauge, Scale, ThumbsUp, TriangleAlert } from 'lucide-react'
import { content } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { AnimatedArrow, Photo, Section, Tag } from './ui'

type Node = (typeof content.interactions.nodes)[number]

function NodeButton({ node, selected, onSelect }: { node: Node; selected: boolean; onSelect: () => void }) {
  const isSynergy = node.kind === 'synergy'
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'glass w-full rounded-3xl border-2 p-5 text-left transition-all hover:-translate-y-1',
        isSynergy ? 'border-synergy/40' : 'border-tension/40',
        selected && (isSynergy ? 'border-synergy bg-synergy-soft ring-4 ring-synergy/20' : 'border-tension bg-tension-soft ring-4 ring-tension/20'),
      )}
    >
      <span
        className={cn(
          'inline-flex rounded-full px-3 py-1 text-sm font-extrabold text-white',
          isSynergy ? 'bg-synergy' : 'bg-tension',
        )}
      >
        {node.goal}
      </span>
      <span className="mt-3 block text-xl font-extrabold leading-snug">{node.name}</span>
      <span className="mt-1 block text-base leading-relaxed text-ink-soft">{node.summary}</span>
    </button>
  )
}

function InteractionMap() {
  const { nodes, center } = content.interactions
  const [selectedId, setSelectedId] = useState<string>(nodes[0].id)
  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0]
  const synergies = nodes.filter((node) => node.kind === 'synergy')
  const tensions = nodes.filter((node) => node.kind === 'tension')
  const isSynergy = selected.kind === 'synergy'
  const linkSource = selected.sourceKey ? content.sources[selected.sourceKey as 'un_goal13'] : null

  return (
    <div>
      <Reveal>
        <p className="text-lg font-semibold text-ink-soft">{content.ui.clickHint}</p>
      </Reveal>
      <Reveal className="mt-6">
        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:gap-3">
          <div className="order-2 flex flex-col items-center gap-3 lg:order-1 lg:flex-1 lg:flex-row-reverse">
            <div className="flex w-full flex-col gap-3">
              {synergies.map((node) => (
                <NodeButton key={node.id} node={node} selected={selectedId === node.id} onSelect={() => setSelectedId(node.id)} />
              ))}
            </div>
            <AnimatedArrow direction="left" tone="green" size={64} className="hidden lg:block" />
            <AnimatedArrow direction="down" tone="green" size={44} className="lg:hidden" />
          </div>

          <div className="order-1 mx-auto flex w-full max-w-xs flex-col items-center rounded-[2rem] bg-navy p-6 text-center text-paper shadow-[0_24px_50px_-20px_rgba(11,31,58,0.7)] lg:order-2 lg:w-64 lg:max-w-none lg:shrink-0">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-sun text-navy">
              <Gauge className="size-7" aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-extrabold uppercase tracking-[0.16em] text-sun">{center.label}</p>
            <p className="mt-2 text-xl font-bold leading-snug">{center.text}</p>
          </div>

          <div className="order-3 flex flex-col gap-4 lg:flex-1">
            {tensions.map((node) => (
              <div key={node.id} className="flex flex-col items-center gap-3 lg:flex-row">
                <AnimatedArrow direction="right" tone="red" size={64} className="hidden lg:block" />
                <AnimatedArrow direction="down" tone="red" size={44} className="lg:hidden" />
                <NodeButton node={node} selected={selectedId === node.id} onSelect={() => setSelectedId(node.id)} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div aria-live="polite" className="mt-8 min-h-48">
        <AnimatePresence mode="wait">
          <motion.article
            key={selected.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'rounded-[2rem] border-2 p-7 sm:p-9',
              isSynergy ? 'border-synergy bg-synergy-soft' : 'border-tension bg-tension-soft',
            )}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className={cn('rounded-full px-4 py-1.5 text-sm font-extrabold text-white', isSynergy ? 'bg-synergy' : 'bg-tension')}>
                {isSynergy ? 'Synergie' : 'Tension'} · {selected.goal}
              </span>
              {isSynergy && <Tag kind="hoped" />}
            </div>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight">{selected.name}</h3>
            <p className="mt-3 max-w-4xl text-xl leading-relaxed">{selected.detail}</p>
            {linkSource?.url && (
              <a
                href={linkSource.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-base font-bold text-paper"
              >
                {selected.linkLabel}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            )}
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  )
}

function CompromiseCard() {
  const { compromise } = content.interactions
  const rows = [
    { icon: Scale, label: compromise.decisionLabel, text: compromise.decision, tone: 'bg-sun text-navy' },
    { icon: ThumbsUp, label: compromise.favoredLabel, text: compromise.favored, tone: 'bg-synergy text-white' },
    { icon: TriangleAlert, label: compromise.limitLabel, text: compromise.limit, tone: 'bg-tension text-white' },
  ]
  return (
    <div className="glass rounded-[2rem] p-7 sm:p-9">
      <h3 className="text-3xl font-extrabold tracking-tight">{compromise.title}</h3>
      <ul className="mt-6 flex flex-col gap-5">
        {rows.map((row, index) => (
          <motion.li
            key={row.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: index * 0.15 }}
            className="flex items-start gap-4"
          >
            <span className={cn('flex size-12 shrink-0 items-center justify-center rounded-2xl', row.tone)}>
              <row.icon className="size-6" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-extrabold uppercase tracking-[0.16em] text-ink-soft">{row.label}</span>
              <span className="mt-1 block text-xl font-semibold leading-snug">{row.text}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export function SectionInteractions() {
  const i = content.interactions
  const photoUrl = content.sources[i.photo.creditKey as 'photo_ewaste'].url
  return (
    <Section id={i.id} number={i.number} title={i.title} intro={i.intro} sourceKeys={i.sourceKeys}>
      <InteractionMap />
      <div className="grid items-stretch gap-8 lg:grid-cols-2">
        <Reveal>
          <CompromiseCard />
        </Reveal>
        <Reveal delay={0.1}>
          <Photo
            src={i.photo.src}
            alt={i.photo.alt}
            caption={i.photo.caption}
            credit={i.photo.credit}
            creditUrl={photoUrl}
            aspect="aspect-[4/3]"
            imageClassName="object-center"
          />
        </Reveal>
      </div>
    </Section>
  )
}
