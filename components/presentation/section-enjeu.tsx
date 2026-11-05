'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  ExternalLink,
  GraduationCap,
  Globe,
  Leaf,
  Lightbulb,
  Plug,
  Power,
  Snowflake,
  UserCog,
  Users,
  Wallet,
} from 'lucide-react'
import { content } from '@/lib/content'
import { Reveal } from './reveal'
import { CountUp } from './count-up'
import { FigureFooter, Photo, Section, Tag } from './ui'

const wordIcons = [Plug, Leaf, Wallet]
const exampleIcons = [Lightbulb, Snowflake, Power]
const affectedIcons = [UserCog, GraduationCap, Users, Globe]

function Odd7Card() {
  const { odd7 } = content.enjeu
  return (
    <Reveal>
      <div className="glass rounded-[2rem] p-7 sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="flex size-28 shrink-0 items-center justify-center rounded-3xl bg-sun text-7xl font-extrabold text-navy shadow-[0_18px_36px_-14px_rgba(252,195,11,0.95)]">
            7
          </div>
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{odd7.title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">{odd7.official}</p>
            <p className="mt-3 text-xl font-semibold leading-relaxed text-navy">{odd7.simple}</p>
          </div>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {odd7.words.map((word, index) => {
            const Icon = wordIcons[index]
            return (
              <motion.li
                key={word.label}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.18 }}
                className="rounded-3xl bg-sun-soft p-6"
              >
                <motion.span
                  className="flex size-14 items-center justify-center rounded-2xl bg-sun text-navy"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.5, ease: 'easeInOut' }}
                >
                  <Icon className="size-7" aria-hidden="true" />
                </motion.span>
                <p className="mt-4 text-3xl font-extrabold tracking-tight">{word.label}</p>
                <p className="mt-1 text-lg leading-relaxed text-ink-soft">{word.text}</p>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </Reveal>
  )
}

function ProblemBlock() {
  const { problem, photo } = content.enjeu
  const creditUrl = content.sources[photo.creditKey as 'photo_night'].url
  return (
    <div className="grid items-start gap-10 lg:grid-cols-2">
      <Reveal>
        <Photo
          src={photo.src}
          alt={photo.alt}
          caption={photo.caption}
          credit={photo.credit}
          creditUrl={creditUrl}
          aspect="aspect-[4/3]"
          priority
        />
      </Reveal>
      <Reveal delay={0.1} className="flex flex-col gap-6">
        <h3 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{problem.title}</h3>
        <p className="text-xl leading-relaxed text-ink-soft">{problem.text}</p>
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-navy">{problem.examplesTitle}</p>
          <ul className="mt-3 flex flex-col gap-3">
            {problem.examples.map((example, index) => {
              const Icon = exampleIcons[index]
              return (
                <li key={example.label} className="glass flex items-start gap-4 rounded-2xl p-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-tension-soft text-tension">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-lg font-extrabold">{example.label}</span>
                    <span className="block text-base leading-relaxed text-ink-soft">{example.text}</span>
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="mt-2 text-sm italic text-ink-soft">{problem.examplesNote}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {problem.consequences.map((item, index) => (
            <span key={item} className="flex items-center gap-2">
              <span className="rounded-full bg-tension px-4 py-2 text-base font-bold text-white">{item}</span>
              {index < problem.consequences.length - 1 && <ArrowRight className="size-5 text-tension" aria-hidden="true" />}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  )
}

function AffectedBlock() {
  const { affected } = content.enjeu
  return (
    <div>
      <Reveal>
        <h3 className="text-3xl font-extrabold tracking-tight lg:text-4xl">{affected.title}</h3>
      </Reveal>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {affected.items.map((item, index) => {
          const Icon = affectedIcons[index] ?? Building2
          return (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="glass rounded-3xl p-6"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-navy text-paper">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-4 text-xl font-extrabold leading-snug">{item.label}</p>
              <p className="mt-1 text-base text-ink-soft">{item.text}</p>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

function TargetAndFigures() {
  const { target, globalFigure } = content.enjeu
  const targetUrl = content.sources[target.sourceKey as 'un_goal7'].url
  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
      <Reveal>
        <article className="glass h-full rounded-[2rem] p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-2xl bg-sun px-5 py-2 text-4xl font-extrabold tracking-tight">{target.id}</span>
            <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-ink-soft">{target.title}</span>
            <Tag kind="announced" className="ml-auto" />
          </div>
          <p className="mt-6 text-balance text-2xl font-bold leading-snug lg:text-3xl">« {target.wording} »</p>
          <p className="mt-5 rounded-2xl bg-sun-soft p-4 text-lg leading-relaxed">{target.simple}</p>
          <a
            href={targetUrl ?? undefined}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-base font-bold text-paper transition-transform hover:-translate-y-0.5"
          >
            {content.ui.officialPage}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
          <FigureFooter data={target.figure} />
        </article>
      </Reveal>
      <Reveal delay={0.12}>
        <article className="glass flex h-full flex-col rounded-[2rem] p-7 sm:p-10">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-extrabold">{globalFigure.title}</h3>
            <Tag kind="observed" />
          </div>
          <div className="relative mt-8 overflow-hidden rounded-3xl bg-[#e3edff] px-6 py-8 text-center">
            <p
              className="text-6xl font-extrabold tracking-tight text-tag-blue lg:text-7xl"
              aria-label={globalFigure.value === null ? 'Valeur à vérifier' : undefined}
            >
              {globalFigure.value === null ? (
                <motion.span
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  aria-hidden="true"
                >
                  X XXX XXX
                </motion.span>
              ) : (
                <CountUp value={globalFigure.value} />
              )}
            </p>
            <p className="mt-2 text-lg font-bold text-navy">
              {globalFigure.label} {globalFigure.unit ? `(${globalFigure.unit})` : ''}
            </p>
          </div>
          <p className="mt-5 rounded-2xl border-2 border-dashed border-tension/60 bg-tension-soft p-4 text-base font-bold text-tension">
            {globalFigure.placeholder}
          </p>
          <FigureFooter data={globalFigure.figure} className="mt-auto" />
        </article>
      </Reveal>
    </div>
  )
}

export function SectionEnjeu() {
  const { enjeu } = content
  return (
    <Section id={enjeu.id} number={enjeu.number} title={enjeu.title} intro={enjeu.intro} sourceKeys={enjeu.sourceKeys}>
      <Odd7Card />
      <ProblemBlock />
      <AffectedBlock />
      <TargetAndFigures />
    </Section>
  )
}
