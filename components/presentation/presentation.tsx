'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { Printer } from 'lucide-react'
import { content } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Hero } from './hero'
import { SectionEnjeu } from './section-enjeu'
import { SectionContribution } from './section-contribution'
import { SectionInteractions } from './section-interactions'
import { SectionVerification } from './section-verification'
import { PrintPages } from './print-pages'

const ids = content.nav.map((item) => item.id)

function isTypingOrTabbing(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return target.closest('input, textarea, select, [role="tablist"], [contenteditable="true"]') !== null
}

export function Presentation() {
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = ids.indexOf(entry.target.id)
          if (index >= 0) setActive(index)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(ids.length - 1, index))
    document.getElementById(ids[clamped])?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || isTypingOrTabbing(event.target)) return
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goTo(activeRef.current + 1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goTo(activeRef.current - 1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goTo])

  return (
    <MotionConfig reducedMotion="user">
      <div className="print:hidden">
        <motion.div
          className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-sun"
          style={{ scaleX }}
          role="progressbar"
          aria-label={content.ui.progressLabel}
          aria-valuemin={0}
          aria-valuemax={100}
        />

        <button
          type="button"
          onClick={() => window.print()}
          className="glass fixed right-4 top-4 z-40 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-navy transition-transform hover:-translate-y-0.5 sm:right-6 sm:top-6"
        >
          <Printer className="size-4" aria-hidden="true" />
          {content.ui.exportPdf}
        </button>

        <nav
          aria-label={content.ui.navLabel}
          className="fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col items-end gap-3 sm:right-5"
        >
          {content.nav.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={item.label}
              aria-current={active === index ? 'true' : undefined}
              className="group flex items-center gap-3 py-1"
            >
              <span className="glass pointer-events-none hidden rounded-full px-3 py-1 text-xs font-bold text-navy opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
                {item.label}
              </span>
              <span
                className={cn(
                  'block rounded-full border-2 border-navy transition-all',
                  active === index ? 'size-4 bg-sun' : 'size-3 bg-paper group-hover:bg-sun-soft',
                )}
              />
            </button>
          ))}
          <p className="sr-only">{content.ui.navHint}</p>
        </nav>

        <main>
          <Hero />
          <SectionEnjeu />
          <SectionContribution />
          <SectionInteractions />
          <SectionVerification />
        </main>
      </div>
      <PrintPages />
    </MotionConfig>
  )
}
