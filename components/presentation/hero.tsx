'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Zap } from 'lucide-react'
import { content } from '@/lib/content'

const columns = 4
const rows = 6
const lit = [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0]
const waste = new Set([5, 14, 17])
const chipPositions = [
  'right-0 top-[24%] sm:-right-6',
  '-left-2 top-[50%] sm:-left-12',
  'right-2 top-[70%] sm:-right-4',
]

function GlowingBuilding() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <svg viewBox="0 0 420 470" role="img" aria-label="Un bâtiment dont certaines fenêtres restent allumées pour rien" className="w-full">
        <ellipse cx="210" cy="448" rx="190" ry="14" fill="#0b1f3a" opacity="0.07" />
        <rect x="60" y="50" width="300" height="390" rx="22" fill="#ffffff" stroke="#0b1f3a" strokeOpacity="0.12" strokeWidth="2" />
        <rect x="60" y="50" width="300" height="46" rx="22" fill="#0b1f3a" opacity="0.06" />
        {lit.map((isLit, index) => {
          const column = index % columns
          const row = Math.floor(index / columns)
          const x = 88 + column * 62
          const y = 112 + row * 52
          const isWaste = waste.has(index)
          return (
            <g key={index}>
              <motion.rect
                x={x}
                y={y}
                width="46"
                height="36"
                rx="8"
                fill={isLit ? '#fcc30b' : '#ece6d4'}
                animate={isWaste ? { opacity: [1, 0.35, 1] } : undefined}
                transition={isWaste ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : undefined}
              />
              {isWaste && (
                <>
                  <circle cx={x + 23} cy={y + 18} r="6" fill="none" stroke="#e0482f" strokeWidth="2.5" className="ripple" />
                  <circle cx={x + 23} cy={y + 18} r="4" fill="#0b1f3a" />
                </>
              )}
            </g>
          )
        })}
        <rect x="180" y="400" width="60" height="40" rx="10" fill="#0b1f3a" opacity="0.85" />
      </svg>
      {content.hero.alertChips.map((chip, index) => (
        <motion.span
          key={chip}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + index * 0.35, duration: 0.5 }}
          className={`glass absolute whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold text-navy ${chipPositions[index]}`}
        >
          <span className="mr-2 inline-block size-2 rounded-full bg-tension align-middle" aria-hidden="true" />
          {chip}
        </motion.span>
      ))}
    </div>
  )
}

export function Hero() {
  const { hero } = content
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative flex min-h-svh items-center px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-full bg-sun px-5 py-2 text-sm font-extrabold uppercase tracking-[0.14em] text-navy"
          >
            <Zap className="size-4" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-balance text-6xl font-extrabold leading-[0.98] tracking-tight text-navy sm:text-7xl lg:text-[5.5rem]"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 max-w-2xl text-pretty text-2xl font-semibold leading-snug text-navy lg:text-3xl"
          >
            {hero.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-ink-soft"
          >
            {hero.hook}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="glass mt-8 max-w-2xl rounded-2xl px-5 py-4 text-base leading-relaxed text-navy"
          >
            {hero.project}
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
          <GlowingBuilding />
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-sm font-semibold text-ink-soft">
        {content.ui.scrollCue}
        <ArrowDown className="size-5 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  )
}
