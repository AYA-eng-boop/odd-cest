import type { CSSProperties, ReactNode } from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { content, type FigureInfo, type SourceKey, type TagKind } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

const tagStyles: Record<TagKind, { box: string; dot: string }> = {
  observed: { box: 'bg-[#e3edff] text-tag-blue ring-[#b9cff7]', dot: 'bg-tag-blue' },
  announced: { box: 'bg-[#efe6ff] text-tag-purple ring-[#d3c2f5]', dot: 'bg-tag-purple' },
  hoped: { box: 'bg-synergy-soft text-[#0f6b47] ring-[#a9deC5]', dot: 'bg-synergy' },
}

export function Tag({ kind, className }: { kind: TagKind; className?: string }) {
  const style = tagStyles[kind]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ring-1 ring-inset',
        style.box,
        className,
      )}
    >
      <span className={cn('size-2 rounded-full', style.dot)} aria-hidden="true" />
      {content.tags[kind]}
    </span>
  )
}

export function TagLegend({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)} aria-label={content.ui.legendTitle}>
      <Tag kind="observed" />
      <Tag kind="announced" />
      <Tag kind="hoped" />
    </div>
  )
}

export function FigureFooter({ data, className }: { data: FigureInfo; className?: string }) {
  const labels = content.ui.figureLabels
  return (
    <p className={cn('mt-4 border-t border-navy/10 pt-3 text-[13px] leading-relaxed text-ink-soft', className)}>
      <span className="font-bold text-navy">{labels.organisme} :</span> {data.organisme} ·{' '}
      <span className="font-bold text-navy">{labels.date} :</span> {data.date} ·{' '}
      <span className="font-bold text-navy">{labels.territoire} :</span> {data.territoire} ·{' '}
      <span className="font-bold text-navy">{labels.perimetre} :</span> {data.perimetre}
    </p>
  )
}

export function SourcesBlock({ keys }: { keys: readonly SourceKey[] }) {
  return (
    <Reveal className="mt-20">
      <footer className="rounded-3xl border border-navy/10 bg-white/70 p-6 sm:p-8">
        <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-navy">{content.ui.sources}</h3>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {keys.map((key) => {
            const source = content.sources[key]
            return (
              <li key={key} className="text-[15px] leading-relaxed text-ink-soft">
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-navy underline decoration-sun decoration-2 underline-offset-4"
                  >
                    {source.label}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="font-bold text-navy">{source.label}</span>
                )}
                <br />
                {source.org}. {source.note}
              </li>
            )
          })}
        </ul>
        <p className="mt-5 text-[13px] text-ink-soft">{content.ui.notEndorsed}</p>
      </footer>
    </Reveal>
  )
}

type SectionProps = {
  id: string
  number: string
  title: string
  intro: string
  children: ReactNode
  sourceKeys: readonly SourceKey[]
}

export function Section({ id, number, title, intro, children, sourceKeys }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative px-5 py-24 sm:px-10 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-sun text-3xl font-extrabold text-navy shadow-[0_10px_24px_-10px_rgba(252,195,11,0.9)]">
              {number}
            </span>
            <span className="h-px w-20 bg-navy/20" aria-hidden="true" />
          </div>
          <h2
            id={`${id}-title`}
            className="mt-6 max-w-4xl text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-navy sm:text-6xl lg:text-7xl"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-3xl text-pretty text-xl leading-relaxed text-ink-soft lg:text-2xl">{intro}</p>
          <TagLegend className="mt-6" />
        </Reveal>
        <div className="mt-14 flex flex-col gap-10 lg:mt-20 lg:gap-14">{children}</div>
        <SourcesBlock keys={sourceKeys} />
      </div>
    </section>
  )
}

type ArrowProps = {
  direction?: 'right' | 'left' | 'down'
  tone?: 'navy' | 'green' | 'red'
  size?: number
  className?: string
}

const toneClass = { navy: 'text-navy', green: 'text-synergy', red: 'text-tension' }

export function AnimatedArrow({ direction = 'right', tone = 'navy', size = 72, className }: ArrowProps) {
  const vertical = direction === 'down'
  const wrapperStyle: CSSProperties = vertical ? { width: 28, height: size } : { width: size, height: 28 }
  const packetStyle = { '--len': `${size - 16}px` } as CSSProperties
  return (
    <span
      className={cn('relative inline-block shrink-0', toneClass[tone], className)}
      style={wrapperStyle}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={28}
        viewBox={`0 0 ${size} 28`}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          vertical && 'rotate-90',
          direction === 'left' && '-scale-x-100',
        )}
      >
        <path d={`M3 14 H${size - 10}`} strokeDasharray="7 7" className="arrow-dash" />
        <path d={`M${size - 17} 6 L${size - 4} 14 L${size - 17} 22`} />
        <circle cx={0} cy={14} r={4.5} fill="currentColor" stroke="none" className="arrow-packet" style={packetStyle} />
      </svg>
    </span>
  )
}

type PhotoProps = {
  src: string
  alt: string
  caption: string
  credit: string
  creditUrl: string | null
  aspect?: string
  sizes?: string
  priority?: boolean
  className?: string
  imageClassName?: string
}

export function Photo({
  src,
  alt,
  caption,
  credit,
  creditUrl,
  aspect = 'aspect-[4/3]',
  sizes = '(min-width: 1024px) 560px, 100vw',
  priority,
  className,
  imageClassName,
}: PhotoProps) {
  return (
    <figure className={cn('overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_50px_-24px_rgba(11,31,58,0.35)]', className)}>
      <div className={cn('relative w-full', aspect)}>
        <Image
          src={src || '/placeholder.svg'}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn('object-cover', imageClassName)}
        />
      </div>
      <figcaption className="p-5 text-[15px] leading-relaxed text-ink-soft">
        <span className="block font-semibold text-navy">{caption}</span>
        {creditUrl ? (
          <a href={creditUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block underline underline-offset-4">
            {credit}
          </a>
        ) : (
          <span className="mt-1 inline-block">{credit}</span>
        )}
      </figcaption>
    </figure>
  )
}
