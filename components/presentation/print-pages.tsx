import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { content, type FigureInfo, type SourceKey } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Tag } from './ui'

function MiniFigure({ data }: { data: FigureInfo }) {
  const labels = content.ui.figureLabels
  return (
    <p className="mt-2 border-t border-navy/10 pt-1.5 text-[9.5px] leading-snug text-ink-soft">
      {labels.organisme} : {data.organisme} · {labels.date} : {data.date} · {labels.territoire} : {data.territoire} ·{' '}
      {labels.perimetre} : {data.perimetre}
    </p>
  )
}

function Box({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-2xl bg-white p-3.5 shadow-[0_6px_16px_-10px_rgba(11,31,58,0.4)]', className)}>{children}</div>
}

function Heading({ children }: { children: ReactNode }) {
  return <h3 className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-soft">{children}</h3>
}

function Page({
  number,
  title,
  sourceKeys,
  children,
}: {
  number: string
  title: string
  sourceKeys: readonly SourceKey[]
  children: ReactNode
}) {
  return (
    <section className="print-page flex flex-col bg-paper px-12 py-8 text-navy">
      <header className="flex items-center gap-4 border-b-[3px] border-sun pb-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-sun text-3xl font-extrabold">{number}</span>
        <h2 className="text-[32px] font-extrabold leading-none tracking-tight">{title}</h2>
        <div className="ml-auto flex gap-1.5">
          <Tag kind="observed" className="px-2 py-0.5 text-[10px]" />
          <Tag kind="announced" className="px-2 py-0.5 text-[10px]" />
          <Tag kind="hoped" className="px-2 py-0.5 text-[10px]" />
        </div>
      </header>
      <div className="min-h-0 flex-1 pt-4">{children}</div>
      <footer className="border-t border-navy/20 pt-2 text-[9.5px] leading-snug text-ink-soft">
        <p>
          <strong className="text-navy">{content.ui.sources} :</strong>{' '}
          {sourceKeys
            .map((key) => {
              const source = content.sources[key]
              return `${source.label} (${source.org})${source.url ? ` — ${source.url}` : ''}`
            })
            .join(' · ')}
        </p>
        <p className="mt-0.5">{content.ui.notEndorsed}</p>
      </footer>
    </section>
  )
}

function PageEnjeu() {
  const e = content.enjeu
  return (
    <Page number={e.number} title={e.title} sourceKeys={e.sourceKeys}>
      <div className="grid h-full grid-cols-3 gap-4 text-[12.5px] leading-snug">
        <div className="flex flex-col gap-3">
          <Box>
            <Heading>{e.odd7.title}</Heading>
            <p className="font-semibold">{e.odd7.simple}</p>
            <p className="mt-1 text-ink-soft">{e.odd7.official}</p>
            <ul className="mt-2 grid grid-cols-3 gap-1.5">
              {e.odd7.words.map((word) => (
                <li key={word.label} className="rounded-lg bg-sun-soft p-2">
                  <strong className="block text-[13px]">{word.label}</strong>
                  <span className="text-[11px]">{word.text}</span>
                </li>
              ))}
            </ul>
          </Box>
        </div>

        <div className="flex flex-col gap-3">
          <Box>
            <Heading>{e.problem.title}</Heading>
            <p>{e.problem.text}</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {e.problem.examples.map((example) => (
                <li key={example.label} className="rounded-lg bg-tension-soft p-2">
                  <strong>{example.label}</strong> · {example.text}
                </li>
              ))}
            </ul>
            <p className="mt-1 text-[10.5px] italic text-ink-soft">{e.problem.examplesNote}</p>
            <p className="mt-2 flex flex-wrap items-center gap-1 font-bold text-tension">
              {e.problem.consequences.map((item, index) => (
                <span key={item} className="flex items-center gap-1">
                  {item}
                  {index < e.problem.consequences.length - 1 && <ArrowRight className="size-3" aria-hidden="true" />}
                </span>
              ))}
            </p>
          </Box>
        </div>

        <div className="flex flex-col gap-3">
          <Box>
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-sun px-2 py-0.5 text-lg font-extrabold">{e.target.id}</span>
              <Tag kind="announced" className="px-2 py-0.5 text-[10px]" />
            </div>
            <p className="mt-2 text-[14px] font-bold">« {e.target.wording} »</p>
            <p className="mt-1">{e.target.simple}</p>
            <MiniFigure data={e.target.figure} />
          </Box>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={e.photo.src || '/placeholder.svg'} alt={e.photo.alt} className="h-28 w-full rounded-2xl object-cover" />
          <p className="-mt-2 text-[9.5px] text-ink-soft">{e.photo.credit}</p>
        </div>
      </div>
    </Page>
  )
}

function PageContribution() {
  const c = content.contribution
  return (
    <Page number={c.number} title={c.title} sourceKeys={c.sourceKeys}>
      <div className="flex h-full flex-col gap-3 text-[12px] leading-snug">
        <div className="flex items-stretch gap-1.5">
          {c.flow.map((step, index) => (
            <div key={step.label} className="flex flex-1 items-center gap-1.5">
              <Box className="h-full flex-1">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink-soft">{step.label}</p>
                <ul className="mt-1 font-bold">
                  {step.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {index === c.flow.length - 1 && <Tag kind="hoped" className="mt-1.5 px-2 py-0.5 text-[10px]" />}
              </Box>
              {index < c.flow.length - 1 && <ArrowRight className="size-5 shrink-0" aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div>
          <Heading>{c.stepsTitle}</Heading>
          <ol className="grid grid-cols-4 gap-2">
            {c.steps.map((step, index) => (
              <li key={step.label} className="rounded-xl bg-sun-soft p-2.5">
                <p className="font-extrabold">
                  {index + 1}. {step.label}
                </p>
                <p className="text-[10px] font-bold text-ink-soft">{step.tech}</p>
                <p className="mt-0.5 text-[11px]">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1.6fr_0.8fr] gap-3">
          <div className="flex flex-col justify-center rounded-2xl border-2 border-sun bg-sun-soft p-4 text-[16px] font-extrabold">
            {c.warning.text}
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.meterPhoto.src || '/placeholder.svg'} alt={c.meterPhoto.alt} className="h-36 w-full rounded-2xl object-cover object-top" />
            <p className="mt-1 text-[9.5px] text-ink-soft">{c.meterPhoto.credit}</p>
            <p className="mt-1 text-[9.5px] text-ink-soft">{c.dashboard.caption}</p>
          </div>
        </div>
      </div>
    </Page>
  )
}

function PageInteractions() {
  const i = content.interactions
  const synergies = i.nodes.filter((node) => node.kind === 'synergy')
  const tensions = i.nodes.filter((node) => node.kind === 'tension')
  return (
    <Page number={i.number} title={i.title} sourceKeys={i.sourceKeys}>
      <div className="flex h-full flex-col gap-3 text-[12px] leading-snug">
        <div className="grid grid-cols-[1fr_auto_1fr_1.1fr] items-stretch gap-2">
          <div className="flex flex-col justify-center gap-2">
            {synergies.map((node) => (
              <div key={node.id} className="rounded-2xl border-2 border-synergy bg-synergy-soft p-3">
                <span className="rounded-full bg-synergy px-2 py-0.5 text-[10px] font-extrabold text-white">{node.goal}</span>
                <p className="mt-1 text-[13px] font-extrabold">{node.name}</p>
                <p className="mt-1">{node.detail}</p>
                <Tag kind="hoped" className="mt-1.5 px-2 py-0.5 text-[10px]" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <ArrowRight className="size-6 rotate-180 text-synergy" aria-hidden="true" />
          </div>
          <div className="flex flex-col items-center justify-center rounded-3xl bg-navy p-3 text-center text-paper">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-sun">{i.center.label}</p>
            <p className="mt-1 text-[14px] font-bold">{i.center.text}</p>
            <div className="mt-2 flex w-full justify-between text-sun">
              <ArrowRight className="size-5 rotate-180 text-synergy" aria-hidden="true" />
              <ArrowRight className="size-5 text-tension" aria-hidden="true" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {tensions.map((node) => (
              <div key={node.id} className="rounded-2xl border-2 border-tension bg-tension-soft p-3">
                <span className="rounded-full bg-tension px-2 py-0.5 text-[10px] font-extrabold text-white">{node.goal}</span>
                <p className="mt-1 text-[13px] font-extrabold">{node.name}</p>
                <p className="mt-1">{node.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1.4fr_1fr] gap-3">
          <Box>
            <Heading>{i.compromise.title}</Heading>
            <ul className="flex flex-col gap-1.5 text-[12.5px]">
              <li>
                <strong>{i.compromise.decisionLabel} :</strong> {i.compromise.decision}
              </li>
              <li>
                <strong className="text-synergy">{i.compromise.favoredLabel} :</strong> {i.compromise.favored}
              </li>
              <li>
                <strong className="text-tension">{i.compromise.limitLabel} :</strong> {i.compromise.limit}
              </li>
            </ul>
          </Box>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={i.photo.src || '/placeholder.svg'} alt={i.photo.alt} className="h-32 w-full rounded-2xl object-cover" />
            <p className="mt-1 text-[9.5px] text-ink-soft">
              {i.photo.caption} {i.photo.credit}
            </p>
          </div>
        </div>
      </div>
    </Page>
  )
}

function PageVerification() {
  const v = content.verification
  return (
    <Page number={v.number} title={v.title} sourceKeys={v.sourceKeys}>
      <div className="flex h-full flex-col gap-3 text-[12px] leading-snug">
        <div className="overflow-hidden rounded-2xl bg-white">
          <p className="bg-sun px-3 py-1 text-[12px] font-extrabold">
            {v.table.title} · {content.ui.proposal}
          </p>
          <div className="grid grid-cols-4">
            {v.table.columns.map((column) => (
              <p key={column} className="bg-navy px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper">
                {column}
              </p>
            ))}
            {v.table.values.map((value) => (
              <p key={value} className="px-3 py-2 font-semibold">
                {value}
              </p>
            ))}
          </div>
        </div>

        <Box className="min-h-0 flex-1">
          <Heading>{v.limits.title}</Heading>
          <ul className="flex list-disc flex-col gap-1.5 pl-4 text-[13px]">
            {v.limits.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Box>

        <div className="rounded-2xl bg-gradient-to-br from-sun to-[#ffe9a0] px-5 py-3">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-navy/70">{v.conclusionLabel}</p>
          <p className="mt-1 text-[17px] font-extrabold leading-snug">{v.conclusion}</p>
        </div>
      </div>
    </Page>
  )
}

export function PrintPages() {
  return (
    <div className="hidden print:block">
      <PageEnjeu />
      <PageContribution />
      <PageInteractions />
      <PageVerification />
    </div>
  )
}
