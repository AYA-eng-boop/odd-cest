'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Banknote,
  Cpu,
  EyeOff,
  Handshake,
  Leaf,
  Lightbulb,
  Radio,
  TriangleAlert,
  UserCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { content } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { DashboardMock } from './dashboard-mock'
import { AnimatedArrow, Photo, Section, Tag } from './ui'

const flowIcons: LucideIcon[] = [EyeOff, Cpu, UserCheck, Leaf]
const flowStyles = [
  'bg-tension-soft text-tension',
  'bg-sun-soft text-navy',
  'bg-[#e3edff] text-tag-blue',
  'bg-synergy-soft text-synergy',
]
const requirementIcons: LucideIcon[] = [Radio, Wrench, Banknote, Handshake, UserCheck]

function FlowDiagram() {
  const { flow, flowTitle, flowNote } = content.contribution
  return (
    <div>
      <Reveal>
        <h3 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{flowTitle}</h3>
      </Reveal>
      <div className="mt-8 flex flex-col items-center gap-3 lg:flex-row lg:items-stretch lg:gap-2">
        {flow.map((step, index) => {
          const Icon = flowIcons[index]
          return (
            <div key={step.label} className="flex w-full flex-col items-center gap-3 lg:flex-row lg:gap-2">
              <motion.article
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass flex h-full w-full flex-col rounded-3xl p-6"
              >
                <span className={cn('flex size-14 items-center justify-center rounded-2xl', flowStyles[index])}>
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm font-extrabold uppercase tracking-[0.16em] text-ink-soft">{step.label}</p>
                <ul className="mt-3 flex flex-col gap-2 text-lg font-bold leading-snug">
                  {step.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {index === flow.length - 1 && <Tag kind="hoped" className="mt-auto w-fit" />}
              </motion.article>
              {index < flow.length - 1 && (
                <>
                  <AnimatedArrow direction="right" size={44} className="hidden lg:block" />
                  <AnimatedArrow direction="down" size={36} className="lg:hidden" />
                </>
              )}
            </div>
          )
        })}
      </div>
      <p className="mt-5 text-base italic text-ink-soft">{flowNote}</p>
    </div>
  )
}

function StepsExplorer() {
  const { steps, stepsTitle } = content.contribution
  const [active, setActive] = useState(0)
  const current = steps[active]
  return (
    <div>
      <Reveal>
        <h3 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{stepsTitle}</h3>
        <p className="mt-2 text-lg text-ink-soft">{content.ui.stepsHint}</p>
      </Reveal>
      <Reveal className="mt-8">
        <div className="glass rounded-[2rem] p-5 sm:p-8">
          <div role="tablist" aria-label={stepsTitle} className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
            {steps.map((step, index) => (
              <div key={step.label} className="flex flex-1 flex-col items-center gap-2 lg:flex-row">
                <button
                  type="button"
                  role="tab"
                  id={`step-tab-${index}`}
                  aria-selected={active === index}
                  aria-controls="step-panel"
                  onClick={() => setActive(index)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left transition-all',
                    active === index
                      ? 'bg-sun text-navy shadow-[0_14px_28px_-14px_rgba(252,195,11,1)]'
                      : 'bg-white text-navy hover:bg-sun-soft',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-extrabold',
                      active === index ? 'bg-navy text-sun' : 'bg-paper-deep text-navy',
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="text-lg font-extrabold leading-tight">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <>
                    <AnimatedArrow direction="right" size={34} className="hidden lg:block" />
                    <AnimatedArrow direction="down" size={26} className="lg:hidden" />
                  </>
                )}
              </div>
            ))}
          </div>
          <div id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${active}`} className="mt-6 min-h-52">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-white p-6 sm:p-8"
              >
                <span className="inline-flex rounded-full bg-navy px-4 py-1.5 text-sm font-bold text-paper">{current.tech}</span>
                <p className="mt-4 text-2xl font-bold leading-snug">{current.text}</p>
                <p className="mt-4 rounded-2xl bg-sun-soft p-4 text-lg leading-relaxed">{current.example}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function FlipCard({ icon: Icon, label, front, back }: { icon: LucideIcon; label: string; front: string; back: string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      className="group h-64 w-full text-left [perspective:1100px]"
    >
      <span
        className={cn(
          'relative block size-full transition-transform duration-700 [transform-style:preserve-3d]',
          flipped && '[transform:rotateY(180deg)]',
        )}
      >
        <span className="glass absolute inset-0 flex flex-col rounded-3xl p-6 [backface-visibility:hidden]">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-sun text-navy">
            <Icon className="size-7" aria-hidden="true" />
          </span>
          <span className="mt-4 text-2xl font-extrabold">{label}</span>
          <span className="mt-1 text-lg text-ink-soft">{front}</span>
          <span className="mt-auto text-sm font-bold text-navy underline decoration-sun decoration-2 underline-offset-4">
            {content.ui.flipHint}
          </span>
        </span>
        <span className="absolute inset-0 flex flex-col rounded-3xl bg-navy p-6 text-paper [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-sun">{label}</span>
          <span className="mt-3 text-lg leading-relaxed">{back}</span>
          <span className="mt-auto text-sm font-bold text-sun">{content.ui.flipBack}</span>
        </span>
      </span>
    </button>
  )
}

export function SectionContribution() {
  const c = content.contribution
  const meterUrl = content.sources[c.meterPhoto.creditKey as 'photo_meter'].url
  return (
    <Section id={c.id} number={c.number} title={c.title} intro={c.intro} sourceKeys={c.sourceKeys}>
      <FlowDiagram />
      <StepsExplorer />

      <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Photo
            src={c.meterPhoto.src}
            alt={c.meterPhoto.alt}
            caption={c.meterPhoto.caption}
            credit={c.meterPhoto.credit}
            creditUrl={meterUrl}
            aspect="aspect-[4/5]"
            imageClassName="object-top"
            sizes="(min-width: 1024px) 440px, 100vw"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <DashboardMock />
        </Reveal>
      </div>

      <div>
        <Reveal>
          <h3 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{c.requirementsTitle}</h3>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {c.requirements.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.09 }}
            >
              <FlipCard icon={requirementIcons[index]} label={item.label} front={item.front} back={item.back} />
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <aside className="flex h-full gap-5 rounded-[2rem] border-2 border-sun bg-sun-soft p-7 sm:p-9">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-sun text-navy">
              <TriangleAlert className="size-7" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em]">{c.warning.title}</p>
              <p className="mt-2 text-2xl font-extrabold leading-snug lg:text-3xl">{c.warning.text}</p>
            </div>
          </aside>
        </Reveal>
        <Reveal delay={0.1}>
          <aside className="glass h-full rounded-[2rem] p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-navy text-paper">
                <Lightbulb className="size-6" aria-hidden="true" />
              </span>
              <h3 className="text-2xl font-extrabold">{c.alternative.title}</h3>
            </div>
            <p className="mt-4 text-lg text-ink-soft">{c.alternative.text}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {c.alternative.items.map((item) => (
                <li key={item} className="rounded-full bg-sun-soft px-4 py-2 text-base font-bold">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-lg font-semibold leading-relaxed">{c.alternative.note}</p>
          </aside>
        </Reveal>
      </div>
    </Section>
  )
}
