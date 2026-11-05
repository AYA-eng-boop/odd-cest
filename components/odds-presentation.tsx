'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Pause,
  Play,
  Printer,
  Recycle,
  Sun,
  Zap,
} from 'lucide-react'

const presentationContent = {
  ui: {
    deckLabel: 'Informatique responsable · Présentation en binôme',
    durationLabel: 'Durée conseillée',
    startTimer: 'Démarrer le chronomètre',
    pauseTimer: 'Mettre le chronomètre en pause',
    exportPdf: 'Exporter en PDF',
    previous: 'Partie précédente',
    next: 'Partie suivante',
    section: 'Partie',
    of: 'sur',
    keyboard: '← → pour naviguer',
    progress: 'Progression de la présentation',
    presenter: 'Présenté par',
    speakers: ['Membre 1', 'Membre 2'],
    observed: 'Résultat observé',
    announced: 'Objectif annoncé',
    hoped: 'Bénéfice espéré',
    noMeasurement: '[À VÉRIFIER] · aucune mesure de terrain',
    notEndorsed: 'Support pédagogique non approuvé par l’ONU.',
    source: 'Sources',
    sourcePhoto: 'Photographie Unsplash',
    officialVisual: 'Repère ODD 7 · couleur officielle ONU',
    proposed: 'Proposition à tester',
    noRealSite: 'Site pilote à confirmer',
    noTool: 'Aucun outil numérique déployé à ce stade.',
    projectDraft: 'Projet proposé · pas de résultat mesuré',
    statusLegend: 'Nature des informations',
  },
  identity: {
    title: 'ODD 7 · Énergie propre et d’un coût abordable',
    shortTitle: 'Énergie propre et accessible',
    accent: '#FCC30B',
    targetId: '7.1',
    targetTitle: 'Accès universel à l’énergie',
    targetWording: 'D’ici à 2030, garantir l’accès de tous à des services énergétiques fiables, durables et modernes, à un coût abordable.',
    context: 'Maroc · établissement scolaire rural à choisir',
    projectName: 'Un suivi solaire pour une école',
    projectType: 'Proposition à tester',
  },
  slides: [
    {
      id: 'enjeu',
      number: '01',
      title: 'L’enjeu',
      duration: 60,
      kicker: 'Une énergie fiable change le quotidien.',
      heading: 'Quand le courant manque, les usages s’arrêtent.',
      lead: 'Dans une école rurale au Maroc, une alimentation électrique irrégulière pourrait perturber l’éclairage et les équipements. Le site et l’obstacle précis restent à confirmer.',
      problemLabel: 'La question à documenter',
      problem: 'À quel moment l’énergie n’est-elle pas disponible, pour qui, et avec quelles conséquences sur les activités de l’école ?',
      targetLabel: 'Cible officielle',
      target: '7.1',
      targetDescription: 'Garantir à tous un accès à des services énergétiques fiables, durables et modernes, à un coût abordable.',
      sourceCaption: 'ONU · ODD 7, cible 7.1 · portée mondiale ; texte adopté en 2015. Aucun résultat marocain n’est avancé ici.',
      imageAlt: 'Rangées de panneaux solaires sous un ciel dégagé',
      imageCaption: 'Illustration de l’énergie solaire — cette photo n’est pas prise sur le site pilote.',
    },
    {
      id: 'contribution',
      number: '02',
      title: 'La contribution numérique',
      duration: 90,
      kicker: 'Le numérique aide à mieux piloter — il ne produit pas seul le progrès.',
      heading: 'Mesurer. Comprendre. Entretenir.',
      lead: 'La proposition : suivre la production solaire et les usages d’un établissement pilote, puis faire vérifier les alertes par une personne responsable.',
      flow: [
        { label: 'Service électrique irrégulier', detail: 'besoin et site à vérifier' },
        { label: 'Capteurs + journal', detail: 'production, disponibilité, incidents' },
        { label: 'Décision humaine', detail: 'contrôler puis planifier l’entretien' },
        { label: 'Service plus fiable ?', detail: 'bénéfice espéré, à mesurer' },
      ],
      conditions: [
        { title: 'Accès & équipement', text: 'Panneaux, compteur adapté et connexion locale ou relevés hors ligne.' },
        { title: 'Travail humain', text: 'Une personne lit les données, vérifie les alertes et consigne les pannes.' },
        { title: 'Partenaires', text: 'Établissement, commune et technicien solaire définissent qui intervient.' },
        { title: 'Financement & compétences', text: 'Prévoir installation, maintenance, formation et remplacement des pièces.' },
      ],
      sourceCaption: 'ONU · cible 7.1, portée mondiale. Exemple local : proposition, Maroc, établissement et données à confirmer. Photo illustrative Unsplash.',
      imageAlt: 'Installation solaire photovoltaïque photographiée en plein air',
      imageCaption: 'Photo illustrative du matériel solaire ; aucun tableau de bord ni système réel n’est présenté.',
    },
    {
      id: 'interactions',
      number: '03',
      title: 'Les interactions',
      duration: 90,
      kicker: 'Un même choix peut aider ici et créer une autre contrainte.',
      heading: 'Relier les objectifs, nommer les limites.',
      actionLabel: 'Suivi solaire local',
      synergy: {
        goal: 'ODD 4 · Éducation de qualité',
        target: 'Cible 4.a',
        title: 'Synergie possible',
        description: 'Un service électrique plus régulier peut soutenir des conditions d’apprentissage adaptées, si l’école dispose des équipements et de l’accompagnement nécessaires.',
        link: 'https://sdgs.un.org/goals/goal4',
      },
      tension: {
        goal: 'ODD 12 · Consommation responsable',
        target: 'Cible 12.5',
        title: 'Tension à gérer',
        description: 'Capteurs, batteries et appareils en fin de vie peuvent ajouter des déchets électroniques si leur durée de vie et leur reprise ne sont pas organisées.',
        link: 'https://sdgs.un.org/goals/goal12',
      },
      compromise: 'Choix proposé : du matériel réparable, peu nombreux, avec reprise documentée. On privilégie la fiabilité du service ; la limite acceptée est un suivi moins détaillé si l’on réduit les capteurs.',
      sourceCaption: 'ONU · cibles 4.a et 12.5, portée mondiale. Liens de cause à tester dans l’établissement choisi ; aucun effet local n’est observé.',
      imageAlt: 'Panneaux photovoltaïques, illustration du matériel concerné par le projet proposé',
      imageCaption: 'Photo illustrative Unsplash · elle ne documente ni le pilote ni ses impacts.',
    },
    {
      id: 'verification',
      number: '04',
      title: 'La vérification',
      duration: 60,
      kicker: 'Un indicateur utile mesure un résultat, pas une application installée.',
      heading: 'Comment saurons-nous si le service progresse ?',
      indicator: [
        { label: 'Résultat recherché', value: 'Maintenir l’alimentation pendant les heures d’ouverture.' },
        { label: 'Quantité + dénominateur', value: 'Heures avec service disponible ÷ heures d’ouverture planifiées, en %.' },
        { label: 'Population, période, comparaison', value: 'École pilote [À VÉRIFIER] · 4 semaines avant / 4 semaines de test, périodes comparables.' },
        { label: 'Donnée & méthode', value: 'Relevé du compteur ou journal de disponibilité, validé chaque semaine par le personnel.' },
      ],
      officialIndicator: 'Indicateur officiel ONU 7.1.1 : proportion de la population ayant accès à l’électricité. Il mesure l’accès des personnes ; notre indicateur de projet suit les heures de service d’un seul site.',
      limit: 'Cet indicateur local ne prouve ni l’abordabilité pour les familles, ni l’accès national, ni une réduction des émissions. Une amélioration après le pilote ne suffit pas, seule, à prouver que le numérique l’a causée.',
      conclusion: 'Notre solution peut améliorer la continuité du service électrique, mais risque d’ajouter des déchets électroniques, donc nous vérifierons les heures d’alimentation disponibles et la reprise du matériel en fin de vie.',
      sourceCaption: 'ONU · ODD 7, indicateur 7.1.1, cadre mondial. Indicateur de projet proposé : établissement, période et données [À VÉRIFIER]. Aucun chiffre observé.',
    },
  ],
  sources: {
    goal7: { label: 'ONU · ODD 7 et cibles', url: 'https://sdgs.un.org/goals/goal7' },
    goal4: { label: 'ONU · ODD 4', url: 'https://sdgs.un.org/goals/goal4' },
    goal12: { label: 'ONU · ODD 12', url: 'https://sdgs.un.org/goals/goal12' },
    indicators: { label: 'ONU · Métadonnées des indicateurs ODD', url: 'https://unstats.un.org/sdgs/metadata/' },
    unVisuals: { label: 'ONU · Ressources visuelles des ODD', url: 'https://www.un.org/sustainabledevelopment/news/communications-material/' },
    photo: { label: 'Unsplash · photographie solaire', url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276' },
    photoLicense: { label: 'Licence Unsplash', url: 'https://unsplash.com/license' },
  },
} as const

const durations = presentationContent.slides.map((slide) => slide.duration)

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function SpeakerBadge() {
  return (
    <div className="speaker-badge" aria-label="Les deux membres prennent la parole">
      <span>{presentationContent.ui.presenter}</span>
      {presentationContent.ui.speakers.map((speaker) => (
        <strong key={speaker}>{speaker}</strong>
      ))}
    </div>
  )
}

function StatusLegend() {
  return (
    <div className="status-legend" aria-label={presentationContent.ui.statusLegend}>
      <span className="status-tag status-tag--observed">{presentationContent.ui.observed}</span>
      <span className="status-tag status-tag--announced">{presentationContent.ui.announced}</span>
      <span className="status-tag status-tag--hoped">{presentationContent.ui.hoped}</span>
    </div>
  )
}

function SourceFooter({ caption }: { caption: string }) {
  return (
    <footer className="source-footer">
      <p>{caption}</p>
      <p>{presentationContent.ui.notEndorsed}</p>
    </footer>
  )
}

function SlideHeading({
  index,
  kicker,
  heading,
  lead,
}: {
  index: number
  kicker: string
  heading: string
  lead?: string
}) {
  const slide = presentationContent.slides[index]
  return (
    <div className="slide-heading">
      <div className="eyebrow-row">
        <span className="section-number">{slide.number}</span>
        <span className="eyebrow">{slide.title}</span>
        <SpeakerBadge />
      </div>
      <p className="kicker">{kicker}</p>
      <h2 id={`${slide.id}-heading`}>{heading}</h2>
      {lead && <p className="slide-lead">{lead}</p>}
    </div>
  )
}

function ProblemSlide() {
  const slide = presentationContent.slides[0]
  return (
    <div className="slide-layout slide-layout--problem">
      <div className="problem-copy">
        <SlideHeading index={0} kicker={slide.kicker} heading={slide.heading} lead={slide.lead} />
        <div className="target-card">
          <div className="target-heading">
            <span className="target-id">{presentationContent.identity.targetId}</span>
            <div>
              <p className="micro-label">{slide.targetLabel}</p>
              <h3>{presentationContent.identity.targetTitle}</h3>
            </div>
            <a href={presentationContent.sources.goal7.url} target="_blank" rel="noreferrer" aria-label="Ouvrir la page officielle ONU sur l’ODD 7">
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <p className="target-wording">{presentationContent.identity.targetWording}</p>
          <p className="problem-question"><strong>{slide.problemLabel} :</strong> {slide.problem}</p>
        </div>
        <div className="context-line">
          <span className="context-dot" />
          <span>{presentationContent.identity.context}</span>
          <span className="draft-pill">{presentationContent.ui.noRealSite}</span>
        </div>
        <div className="status-row">
          <StatusLegend />
          <span className="pending-note">{presentationContent.ui.noMeasurement}</span>
        </div>
      </div>
      <figure className="photo-panel problem-photo">
        <Image src="/solar-panels.jpg" alt={slide.imageAlt} width={1800} height={1198} priority sizes="(max-width: 760px) 100vw, 48vw" />
        <figcaption>
          <span>{slide.imageCaption}</span>
          <a href={presentationContent.sources.photo.url} target="_blank" rel="noreferrer">{presentationContent.ui.sourcePhoto}</a>
        </figcaption>
      </figure>
    </div>
  )
}

function FlowDiagram() {
  const slide = presentationContent.slides[1]
  const icons = [<Zap key="zap" />, <Sun key="sun" />, <Check key="check" />, <ArrowRight key="right" />]
  return (
    <div className="flow-diagram" aria-label="Chaîne de contribution numérique, du problème au résultat attendu">
      {slide.flow.map((step, index) => (
        <div className="flow-item-wrap" key={step.label}>
          <motion.div
            className={`flow-card ${index === 3 ? 'flow-card--outcome' : ''}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: index * 0.11 }}
          >
            <span className="flow-icon" aria-hidden="true">{icons[index]}</span>
            <strong>{step.label}</strong>
            <span>{step.detail}</span>
          </motion.div>
          {index < slide.flow.length - 1 && (
            <motion.div className="flow-arrow" aria-hidden="true" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowRight />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}

function ContributionSlide() {
  const slide = presentationContent.slides[1]
  return (
    <div className="slide-layout slide-layout--contribution">
      <SlideHeading index={1} kicker={slide.kicker} heading={slide.heading} lead={slide.lead} />
      <FlowDiagram />
      <div className="contribution-bottom">
        <figure className="photo-panel solution-photo">
          <Image src="/solar-panels.jpg" alt={slide.imageAlt} width={1800} height={1198} sizes="(max-width: 760px) 100vw, 32vw" />
          <figcaption>
            <span>{slide.imageCaption}</span>
            <a href={presentationContent.sources.photo.url} target="_blank" rel="noreferrer">{presentationContent.ui.sourcePhoto}</a>
          </figcaption>
        </figure>
        <div className="conditions-block">
          <div className="conditions-heading">
            <div>
              <p className="micro-label">{presentationContent.ui.proposed}</p>
              <h3>{presentationContent.identity.projectName}</h3>
            </div>
            <span className="draft-pill">{presentationContent.ui.projectDraft}</span>
          </div>
          <div className="conditions-grid">
            {slide.conditions.map((condition) => (
              <article className="condition-card" key={condition.title}>
                <span className="condition-check" aria-hidden="true"><Check /></span>
                <div><h4>{condition.title}</h4><p>{condition.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function InteractionsSlide() {
  const slide = presentationContent.slides[2]
  return (
    <div className="slide-layout slide-layout--interactions">
      <SlideHeading index={2} kicker={slide.kicker} heading={slide.heading} />
      <div className="interaction-grid">
        <div className="interaction-visual">
          <div className="interaction-node interaction-node--synergy">
            <span className="interaction-icon"><Sun aria-hidden="true" /></span>
            <span className="micro-label">{slide.synergy.title}</span>
            <strong>{slide.synergy.goal}</strong>
            <a href={slide.synergy.link} target="_blank" rel="noreferrer">{slide.synergy.target} · source ONU <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="interaction-center">
            <span className="center-spark"><Zap aria-hidden="true" /></span>
            <strong>{slide.actionLabel}</strong>
            <span>{presentationContent.ui.proposed}</span>
          </div>
          <div className="interaction-node interaction-node--tension">
            <span className="interaction-icon"><Recycle aria-hidden="true" /></span>
            <span className="micro-label">{slide.tension.title}</span>
            <strong>{slide.tension.goal}</strong>
            <a href={slide.tension.link} target="_blank" rel="noreferrer">{slide.tension.target} · source ONU <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="relation relation--synergy" aria-hidden="true"><span /><ArrowRight /></div>
          <div className="relation relation--tension" aria-hidden="true"><span /><ArrowRight /></div>
        </div>
        <div className="interaction-details">
          <article className="interaction-copy interaction-copy--synergy">
            <span className="detail-label">{slide.synergy.title}</span>
            <p>{slide.synergy.description}</p>
          </article>
          <article className="interaction-copy interaction-copy--tension">
            <span className="detail-label">{slide.tension.title}</span>
            <p>{slide.tension.description}</p>
          </article>
          <div className="compromise-card">
            <span className="micro-label">Adaptation / compromis · sa limite</span>
            <p>{slide.compromise}</p>
          </div>
          <figure className="interaction-photo">
            <Image src="/solar-panels.jpg" alt={slide.imageAlt} width={1800} height={1198} sizes="(max-width: 760px) 100vw, 32vw" />
            <figcaption>
              {slide.imageCaption} <a href={presentationContent.sources.photo.url} target="_blank" rel="noreferrer">Unsplash</a>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}

function VerificationSlide() {
  const slide = presentationContent.slides[3]
  return (
    <div className="slide-layout slide-layout--verification">
      <SlideHeading index={3} kicker={slide.kicker} heading={slide.heading} />
      <div className="verification-main">
        <div className="indicator-table" role="table" aria-label="Indicateur de projet proposé">
          {slide.indicator.map((row, index) => (
            <div className="indicator-row" role="row" key={row.label}>
              <div className="indicator-index" aria-hidden="true">0{index + 1}</div>
              <div className="indicator-label" role="rowheader">{row.label}</div>
              <div className="indicator-value" role="cell">{row.value}</div>
            </div>
          ))}
        </div>
        <aside className="official-indicator-card">
          <div className="official-indicator-icon"><Check aria-hidden="true" /></div>
          <div>
            <span className="micro-label">À ne pas confondre</span>
            <p>{slide.officialIndicator}</p>
            <a href={presentationContent.sources.indicators.url} target="_blank" rel="noreferrer">Métadonnées officielles ONU <ArrowRight aria-hidden="true" /></a>
          </div>
        </aside>
      </div>
      <div className="verification-bottom">
        <div className="limit-card">
          <span className="micro-label">Limite de l’indicateur</span>
          <p>{slide.limit}</p>
        </div>
        <div className="conclusion-card">
          <span className="micro-label">Notre conclusion</span>
          <p>{slide.conclusion}</p>
        </div>
      </div>
      <div className="verification-sources">
        <span className="status-tag status-tag--observed">{presentationContent.ui.noMeasurement}</span>
        <span className="status-tag status-tag--hoped">{presentationContent.ui.hoped} · continuité à vérifier</span>
      </div>
    </div>
  )
}

function ProgressHeader({
  activeIndex,
  remaining,
  isTimerRunning,
  onToggleTimer,
  onNavigate,
}: {
  activeIndex: number
  remaining: number
  isTimerRunning: boolean
  onToggleTimer: () => void
  onNavigate: (index: number) => void
}) {
  const activeSlide = presentationContent.slides[activeIndex]
  const progress = ((activeIndex + 1) / presentationContent.slides.length) * 100
  return (
    <header className="presentation-header">
      <div className="header-main">
        <div className="brand-mark" aria-hidden="true"><Sun /><span>7</span></div>
        <div className="brand-copy">
          <strong>{presentationContent.ui.deckLabel}</strong>
          <span>{presentationContent.identity.shortTitle}</span>
        </div>
        <div className="header-center" aria-label={`${presentationContent.ui.section} ${activeIndex + 1} ${presentationContent.ui.of} 4`}>
          <span className="header-section-number">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="header-section-name">{activeSlide.title}</span>
        </div>
        <div className="timer-wrap">
          <span className="timer-caption"><Clock3 aria-hidden="true" /> {presentationContent.ui.durationLabel}</span>
          <button className={`timer-button ${isTimerRunning ? 'timer-button--running' : ''}`} type="button" onClick={onToggleTimer} aria-label={isTimerRunning ? presentationContent.ui.pauseTimer : presentationContent.ui.startTimer}>
            {isTimerRunning ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            <span>{formatTime(remaining)}</span>
          </button>
        </div>
        <button className="export-button" type="button" onClick={() => window.print()}>
          <Printer aria-hidden="true" /><span>{presentationContent.ui.exportPdf}</span>
        </button>
      </div>
      <div className="progress-track" role="progressbar" aria-label={presentationContent.ui.progress} aria-valuemin={0} aria-valuemax={4} aria-valuenow={activeIndex + 1}>
        <motion.div className="progress-fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.45, ease: 'easeOut' }} />
      </div>
      <nav className="section-nav" aria-label="Navigation entre les quatre parties">
        {presentationContent.slides.map((slide, index) => (
          <button key={slide.id} type="button" aria-current={index === activeIndex ? 'step' : undefined} onClick={() => onNavigate(index)}>
            <span>{slide.number}</span>{slide.title}<small>{formatTime(slide.duration)}</small>
          </button>
        ))}
      </nav>
    </header>
  )
}

export function OddsPresentation() {
  const mainRef = useRef<HTMLElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [remaining, setRemaining] = useState<number>(durations[0])
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const navigateTo = useCallback((index: number) => {
    const safeIndex = Math.max(0, Math.min(index, presentationContent.slides.length - 1))
    const root = mainRef.current
    const section = sectionRefs.current[safeIndex]
    if (!root || !section) return
    const top = section.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop
    root.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }, [prefersReducedMotion])

  useEffect(() => {
    const root = mainRef.current
    if (!root) return
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          const index = Number(entry.target.getAttribute('data-slide-index'))
          setActiveIndex(index)
        }
      }
    }, { root, threshold: [0.55, 0.75] })
    sectionRefs.current.forEach((section) => section && observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setIsTimerRunning(false)
    setRemaining(durations[activeIndex])
  }, [activeIndex])

  useEffect(() => {
    if (!isTimerRunning) return
    if (remaining === 0) {
      setIsTimerRunning(false)
      return
    }
    const interval = window.setInterval(() => setRemaining((value) => Math.max(value - 1, 0)), 1000)
    return () => window.clearInterval(interval)
  }, [isTimerRunning, remaining])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault()
        navigateTo(activeIndex + 1)
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault()
        navigateTo(activeIndex - 1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, navigateTo])

  const toggleTimer = () => {
    if (remaining === 0) setRemaining(durations[activeIndex])
    setIsTimerRunning((running) => !running)
  }

  const renderSlide = (index: number) => {
    switch (index) {
      case 0: return <ProblemSlide />
      case 1: return <ContributionSlide />
      case 2: return <InteractionsSlide />
      default: return <VerificationSlide />
    }
  }

  return (
    <div className="presentation-shell" style={{ '--odd-accent': presentationContent.identity.accent } as CSSProperties}>
      <ProgressHeader activeIndex={activeIndex} remaining={remaining} isTimerRunning={isTimerRunning} onToggleTimer={toggleTimer} onNavigate={navigateTo} />
      <main ref={mainRef} className="presentation-scroll" id="presentation">
        {presentationContent.slides.map((slide, index) => (
          <section
            className={`presentation-slide presentation-slide--${slide.id}`}
            id={slide.id}
            data-slide-index={index}
            aria-labelledby={`${slide.id}-heading`}
            key={slide.id}
            ref={(element) => { sectionRefs.current[index] = element }}
          >
            <div className="slide-content">
              {renderSlide(index)}
              <div className="slide-bottomline">
                <SourceFooter caption={slide.sourceCaption} />
                {index < presentationContent.slides.length - 1 ? (
                  <button className="next-slide-button" type="button" onClick={() => navigateTo(index + 1)}>
                    <span>Continuer</span><ArrowDown aria-hidden="true" />
                  </button>
                ) : (
                  <span className="endnote">{presentationContent.ui.keyboard}</span>
                )}
              </div>
            </div>
          </section>
        ))}
      </main>
      <div className="side-controls" aria-label="Contrôles de présentation">
        <button type="button" aria-label={presentationContent.ui.previous} onClick={() => navigateTo(activeIndex - 1)} disabled={activeIndex === 0}><ChevronLeft aria-hidden="true" /></button>
        <span>{String(activeIndex + 1).padStart(2, '0')}<i>/</i>04</span>
        <button type="button" aria-label={presentationContent.ui.next} onClick={() => navigateTo(activeIndex + 1)} disabled={activeIndex === 3}><ChevronRight aria-hidden="true" /></button>
      </div>
      <div className="print-deck-label">{presentationContent.identity.title} · {presentationContent.identity.projectType}</div>
    </div>
  )
}
