/**
 * TOUT LE TEXTE DE LA PRÉSENTATION EST ICI.
 * Pour modifier un texte, changez-le dans cet objet : pas besoin de toucher à la mise en page.
 * Tout ce qui est marqué [À VÉRIFIER] doit être confirmé avant la présentation.
 */
export const content = {
  meta: {
    title: 'Économiser l’énergie avec le numérique · ODD 7',
    description:
      'ODD 7 : comment des capteurs et l’IA peuvent aider un bâtiment à gaspiller moins d’énergie. Proposition à tester pour un bâtiment ou un campus au Maroc.',
  },

  ui: {
    exportPdf: 'Exporter en PDF',
    sources: 'Sources',
    scrollCue: 'Faire défiler',
    navLabel: 'Navigation dans la présentation',
    navHint: '← → pour changer de partie',
    progressLabel: 'Progression de lecture',
    proposal: 'Proposition à tester',
    flipHint: 'Cliquer pour voir le détail',
    flipBack: 'Cliquer pour revenir',
    clickHint: 'Cliquez sur une bulle pour lire l’explication.',
    stepsHint: 'Cliquez sur une étape pour la découvrir.',
    officialPage: 'Voir la page officielle ONU',
    figureLabels: {
      organisme: 'Organisme',
      date: 'Date',
      territoire: 'Territoire',
      perimetre: 'Périmètre',
    },
    notEndorsed: 'Support pédagogique réalisé par des étudiants. Il n’est pas approuvé par l’ONU.',
    legendTitle: 'Trois types d’information',
  },

  tags: {
    observed: 'Résultat observé',
    announced: 'Objectif annoncé',
    hoped: 'Bénéfice espéré',
  },

  nav: [
    { id: 'hero', label: 'Introduction' },
    { id: 'enjeu', label: 'L’enjeu' },
    { id: 'contribution', label: 'La contribution numérique' },
    { id: 'interactions', label: 'Les interactions' },
    { id: 'verification', label: 'La vérification' },
  ],

  sources: {
    un_energy: {
      label: 'ONU · Objectif 7 : énergie',
      org: 'Organisation des Nations Unies',
      url: 'https://www.un.org/sustainabledevelopment/energy/',
      note: 'Page officielle de l’ODD 7.',
    },
    un_goal7: {
      label: 'ONU · ODD 7, cibles et indicateurs',
      org: 'Organisation des Nations Unies',
      url: 'https://sdgs.un.org/goals/goal7',
      note: 'Texte officiel de la cible 7.3.',
    },
    un_db: {
      label: 'ONU · Base de données des indicateurs des ODD',
      org: 'Division de statistique de l’ONU',
      url: 'https://unstats.un.org/sdgs/dataportal/database',
      note: 'Chiffres officiels par indicateur et par pays.',
    },
    un_meta: {
      label: 'ONU · Métadonnées des indicateurs des ODD',
      org: 'Division de statistique de l’ONU',
      url: 'https://unstats.un.org/sdgs/metadata/',
      note: 'Définition officielle de l’indicateur 7.3.1.',
    },
    un_goal13: {
      label: 'ONU · ODD 13, lutte contre le changement climatique',
      org: 'Organisation des Nations Unies',
      url: 'https://sdgs.un.org/goals/goal13',
      note: '[À VÉRIFIER] : confirmer que cette page correspond bien à la cible choisie.',
    },
    un_goal12: {
      label: 'ONU · ODD 12, consommation et production responsables',
      org: 'Organisation des Nations Unies',
      url: 'https://sdgs.un.org/goals/goal12',
      note: 'Page officielle de l’ODD 12.',
    },
    photo_night: {
      label: 'Photo : Casablanca by Night',
      org: 'Patrick Nouhailler · Wikimedia Commons · CC BY-SA 3.0',
      url: 'https://commons.wikimedia.org/wiki/File:Casablanca_By_Night_-_panoramio.jpg',
      note: 'Photo sous licence libre, utilisée avec mention de l’auteur.',
    },
    photo_meter: {
      label: 'Photo : compteur électrique communicant Logarex',
      org: 'RobbieIanMorrison · Wikimedia Commons · CC BY 4.0',
      url: 'https://commons.wikimedia.org/wiki/File:Logarex_smart_household_electricity_meter_build_year_2023.jpg',
      note: 'Photo sous licence libre, utilisée avec mention de l’auteur.',
    },
    photo_ewaste: {
      label: 'Photo : tri de déchets électroniques',
      org: 'Syced · Wikimedia Commons · CC0 (domaine public)',
      url: 'https://commons.wikimedia.org/wiki/File:Electronic_junk_separation_in_view_of_recycling_2.jpg',
      note: 'Photo de domaine public.',
    },
    mockup: {
      label: 'Maquette du tableau de bord',
      org: 'Créée pour cette présentation · données fictives',
      url: null,
      note: 'Ce n’est pas une capture d’un vrai système.',
    },
  },

  hero: {
    eyebrow: 'ODD 7 · Énergie propre et d’un coût abordable',
    title: 'Économiser l’énergie avec le numérique',
    subtitle: 'ODD 7 : comment des capteurs et l’IA peuvent aider un bâtiment à gaspiller moins',
    hook: 'Dans un bâtiment, de l’énergie se perd chaque jour sans que personne ne le voie. Et si des capteurs pouvaient nous le montrer ?',
    project: 'Proposition à tester : un système de suivi intelligent de l’énergie pour un bâtiment ou un campus scolaire au Maroc.',
    alertChips: ['Clim allumée, salle vide', 'Lumière oubliée', 'Conso anormale'],
  },

  enjeu: {
    id: 'enjeu',
    number: '1',
    title: 'Pourquoi l’énergie est un problème ?',
    intro:
      'Chaque jour, nous utilisons de l’électricité sans y penser : lumière, ordinateurs, climatisation. Quand elle est gaspillée, tout le monde y perd.',
    odd7: {
      title: 'C’est quoi l’ODD 7 ?',
      official:
        'Titre officiel : « Garantir l’accès de tous à des services énergétiques fiables, durables et modernes, à un coût abordable ».',
      simple:
        'En mots simples : tout le monde doit avoir de l’énergie (électricité, cuisson). Elle doit être fiable, propre et pas trop chère.',
      words: [
        { label: 'Accessible', text: 'Chacun peut en avoir : électricité, cuisson.' },
        { label: 'Propre', text: 'Elle pollue le moins possible.' },
        { label: 'Abordable', text: 'Son prix reste raisonnable.' },
      ],
    },
    problem: {
      title: 'Le problème, en mots simples',
      text: 'Dans beaucoup de bâtiments (écoles, bureaux, logements), de l’énergie est gaspillée. La facture monte, la pollution aussi. Et personne ne voit où se trouve le gaspillage.',
      examplesTitle: 'Des exemples très courants',
      examples: [
        { label: 'Lumière oubliée', text: 'Des lampes restent allumées dans des salles vides.' },
        { label: 'Climatisation oubliée', text: 'La clim tourne alors que la pièce est vide ou qu’une fenêtre est ouverte.' },
        { label: 'Équipements en veille', text: 'Ordinateurs et écrans restent branchés toute la nuit.' },
      ],
      examplesNote: 'Ce sont des situations courantes, pas des mesures.',
      consequences: ['Facture plus élevée', 'Plus de pollution', 'Gaspillage invisible'],
    },
    affected: {
      title: 'Qui est concerné ?',
      items: [
        { label: 'Les gestionnaires du bâtiment', text: 'Ils paient la facture.' },
        { label: 'Les étudiants', text: 'Ils étudient dans le bâtiment.' },
        { label: 'Le personnel', text: 'Il y travaille chaque jour.' },
        { label: 'La planète', text: 'Elle reçoit la pollution.' },
      ],
    },
    target: {
      id: '7.3',
      title: 'Cible officielle',
      wording: 'D’ici à 2030, multiplier par deux le taux mondial d’amélioration de l’efficacité énergétique.',
      simple:
        'Efficacité énergétique, c’est faire la même chose avec moins d’énergie. Exemple : bien s’éclairer avec moins d’électricité.',
      figure: {
        organisme: 'Organisation des Nations Unies (ONU)',
        date: '[À VÉRIFIER : date de la version consultée]',
        territoire: 'Monde',
        perimetre: 'Texte de la cible 7.3 de l’ODD 7 (à comparer avec la page officielle)',
      },
      sourceKey: 'un_goal7',
    },
    globalFigure: {
      title: 'Dans le monde',
      label: 'Personnes sans électricité',
      // Mettre un nombre ici (par exemple 1000000) quand la valeur est vérifiée : il s’animera tout seul.
      value: null as number | null,
      unit: 'personnes',
      placeholder: '[À VÉRIFIER : valeur, organisme, date, périmètre]',
      figure: {
        organisme: '[À VÉRIFIER]',
        date: '[À VÉRIFIER]',
        territoire: 'Monde',
        perimetre: '[À VÉRIFIER] (à chercher dans la base de données des indicateurs de l’ONU)',
      },
    },
    photo: {
      src: '/photos/night.jpg',
      alt: 'Immeubles modernes éclairés la nuit, avec des palmiers, sur une promenade à Casablanca au Maroc',
      caption: 'Un bâtiment éclairé la nuit à Casablanca. Quelle part de cette lumière est vraiment utile ?',
      credit: 'Photo : Patrick Nouhailler · CC BY-SA 3.0 · Wikimedia Commons',
      creditKey: 'photo_night',
    },
    sourceKeys: ['un_energy', 'un_goal7', 'un_db', 'photo_night'] as const,
  },

  contribution: {
    id: 'contribution',
    number: '2',
    title: 'Comment le numérique aide ?',
    intro:
      'Le numérique ne fabrique pas d’énergie. Il aide à voir où on en perd, pour agir plus vite.',
    flowTitle: 'Du problème au résultat',
    flow: [
      {
        label: 'Problème',
        items: ['Consommation invisible', 'Gaspillage : personne ne voit où part l’énergie'],
      },
      {
        label: 'Fonction numérique',
        items: ['Des capteurs IoT mesurent', 'L’IA repère les anomalies', 'Un tableau de bord alerte'],
      },
      {
        label: 'Changement attendu',
        items: ['Les responsables agissent :', 'éteindre, régler, planifier'],
      },
      {
        label: 'Résultat',
        items: ['Moins d’énergie gaspillée', 'Facture plus basse', 'Moins de CO₂'],
      },
    ],
    flowNote: 'Le résultat est un bénéfice espéré, pas un résultat mesuré. C’est une proposition à tester.',
    stepsTitle: 'Comment ça marche ?',
    steps: [
      {
        label: 'Mesurer',
        tech: 'IoT',
        text: 'Des compteurs intelligents (capteurs IoT) notent la consommation de chaque zone du bâtiment.',
        example: 'Exemple : le compteur de la salle B12 envoie un relevé toutes les 15 minutes.',
      },
      {
        label: 'Envoyer les données',
        tech: 'Traitement de données',
        text: 'Les mesures voyagent par Wi-Fi ou par réseau local jusqu’à un ordinateur central, qui les range et les nettoie.',
        example: 'Exemple : toutes les mesures arrivent dans un même tableau, avec la date et l’heure.',
      },
      {
        label: 'Analyser',
        tech: 'Apprentissage automatique (ML)',
        text: 'Un modèle d’IA simple apprend la consommation normale de chaque salle. Quand ça sort de l’ordinaire, il le signale.',
        example: 'Exemple : une salle consomme beaucoup à 22 h alors qu’elle est vide.',
      },
      {
        label: 'Décider',
        tech: 'Décision humaine obligatoire',
        text: 'La personne responsable lit l’alerte et choisit quoi faire. L’IA conseille, mais c’est l’humain qui décide.',
        example: 'Exemple : le gardien éteint la clim, puis règle un horaire automatique.',
      },
    ],
    meterPhoto: {
      src: '/photos/meter.jpg',
      alt: 'Compteur électrique communicant avec écran affichant la consommation en kilowattheures',
      caption: 'Un compteur électrique communicant : il mesure la consommation et peut envoyer les données.',
      credit: 'Photo : RobbieIanMorrison · CC BY 4.0 · Wikimedia Commons',
      creditKey: 'photo_meter',
    },
    dashboard: {
      title: 'Exemple de tableau de bord',
      caption: 'Maquette illustrative pour comprendre l’idée. Les valeurs sont fictives.',
      credit: 'Maquette créée pour cette présentation',
      url: 'tableau-de-bord-energie.local',
      site: 'Campus · Bâtiment B',
      kpis: [
        { label: 'Aujourd’hui', value: '1 240 kWh' },
        { label: 'Alertes ouvertes', value: '3' },
        { label: 'Salles suivies', value: '24' },
      ],
      chartTitle: 'Consommation sur 24 h',
      anomaly: 'Anomalie de nuit',
      alertsTitle: 'Conseils envoyés',
      alerts: [
        'Salle B12 : lumières allumées depuis 22 h 10.',
        'Amphi A : clim active, salle vide.',
        'Labo info : consommation de nuit anormale.',
      ],
      fake: 'Données fictives',
    },
    requirementsTitle: 'Ce qu’il faut pour que ça marche',
    requirements: [
      { label: 'Équipement', front: 'Capteurs et réseau', back: 'Des compteurs intelligents, une connexion fiable et un ordinateur pour garder les données.' },
      { label: 'Compétences', front: 'Technicien et données', back: 'Quelqu’un pour installer les capteurs et quelqu’un pour comprendre les données.' },
      { label: 'Financement', front: 'Acheter et entretenir', back: 'Il faut payer les capteurs, l’installation, la maintenance et leur remplacement.' },
      { label: 'Partenaires', front: 'Gestionnaire et fournisseur', back: 'Le gestionnaire du bâtiment et le fournisseur d’énergie doivent être d’accord et partager l’accès aux relevés.' },
      { label: 'Travail humain', front: 'Quelqu’un agit', back: 'Une personne doit lire les alertes et agir. Sans elle, les données ne servent à rien.' },
    ],
    warning: {
      title: 'À retenir',
      text: 'Le logiciel seul ne réduit pas la consommation : ce sont les personnes qui agissent grâce aux données.',
    },
    alternative: {
      title: 'Solution plus simple à comparer',
      text: 'Avant d’acheter des capteurs, on peut essayer des solutions sans IA :',
      items: ['Sensibiliser les utilisateurs', 'Installer des minuteries', 'Poser des détecteurs de présence'],
      note: 'L’IA n’est pas toujours le meilleur choix. Si une solution simple suffit, elle coûte moins cher et produit moins de déchets électroniques.',
    },
    sourceKeys: ['un_energy', 'photo_meter', 'mockup'] as const,
  },

  interactions: {
    id: 'interactions',
    number: '3',
    title: 'Ce que ça change ailleurs',
    intro:
      'Une action peut aider un objectif et en gêner un autre. Les flèches vertes montrent les aides, les flèches orange-rouge les tensions.',
    center: {
      label: 'Notre action',
      text: 'Suivre et réduire la consommation d’énergie du bâtiment',
    },
    nodes: [
      {
        id: 'climat',
        kind: 'synergy' as const,
        goal: 'ODD 13',
        name: 'Lutte contre le changement climatique',
        summary: 'Moins d’énergie utilisée, donc moins de CO₂.',
        detail:
          'Si le bâtiment consomme moins d’énergie, il y a moins d’émissions de CO₂. Attention : cela marche à condition que l’énergie évitée vienne d’une source qui émet du CO₂ (par exemple le charbon ou le gaz). Si l’électricité est déjà très propre, le gain sera plus petit.',
        sourceKey: 'un_goal13',
        linkLabel: 'Page officielle ONU de l’ODD 13 [lien à vérifier]',
      },
      {
        id: 'dechets',
        kind: 'tension' as const,
        goal: 'ODD 12',
        name: 'Consommation et production responsables',
        summary: 'Les capteurs créent des déchets électroniques.',
        detail:
          'Fabriquer des capteurs demande des matières et de l’énergie. À la fin de leur vie, ils deviennent des déchets électroniques. Plus on installe de capteurs, plus cet impact grandit.',
        sourceKey: 'un_goal12',
        linkLabel: 'Page officielle ONU de l’ODD 12',
      },
      {
        id: 'acces',
        kind: 'tension' as const,
        goal: 'Accès et inclusion',
        name: 'Qui en profite ?',
        summary: 'Seuls les bâtiments équipés en profitent.',
        detail:
          'Si seuls les bâtiments qui peuvent acheter des capteurs font des économies, les autres restent à l’écart. L’écart entre bâtiments équipés et non équipés peut grandir. [À VÉRIFIER : choisir l’ODD ou la cible liée à l’inégalité d’accès.]',
        sourceKey: null,
        linkLabel: '',
      },
    ],
    compromise: {
      title: 'Le compromis',
      decisionLabel: 'Notre décision',
      decision:
        'Installer peu de capteurs, bien placés, durables et réparables, avec un recyclage en fin de vie. Partager aussi les conseils simples avec les bâtiments non équipés.',
      favoredLabel: 'Ce qu’on favorise',
      favored: 'Réduire le gaspillage sans multiplier les déchets électroniques.',
      limitLabel: 'La limite acceptée',
      limit: 'On mesure moins précisément, mais on réduit l’impact du matériel.',
    },
    photo: {
      src: '/photos/ewaste.jpg',
      alt: 'Gros plan sur des composants électroniques et des cartes de circuits imprimés triés en vue du recyclage',
      caption: 'Composants électroniques triés avant recyclage : voilà ce que des capteurs peuvent devenir.',
      credit: 'Photo : Syced · CC0 · Wikimedia Commons',
      creditKey: 'photo_ewaste',
    },
    sourceKeys: ['un_goal13', 'un_goal12', 'photo_ewaste'] as const,
  },

  verification: {
    id: 'verification',
    number: '4',
    title: 'Comment savoir que ça marche ?',
    intro:
      'On ne juge pas un projet sur le nombre d’alertes, mais sur l’énergie réellement consommée.',
    table: {
      title: 'Notre indicateur de projet',
      columns: [
        'Résultat recherché',
        'Quantité, unité, dénominateur',
        'Population, période, comparaison',
        'Donnée à recueillir et méthode',
      ],
      values: [
        'Consommer moins d’énergie dans le bâtiment équipé.',
        'kWh consommés par mois, divisés par les m² du bâtiment (ou par personne).',
        'Le bâtiment équipé de capteurs, chaque mois, comparé au même mois de l’année précédente.',
        'Relevé des compteurs chaque mois, avec la surface (ou le nombre de personnes) du bâtiment.',
      ],
    },
    chart: {
      title: 'Avant / Après',
      label: 'Illustration, pas un résultat réel',
      unit: 'kWh par m² et par mois (exemple inventé)',
      before: { label: 'Avant', value: 100 },
      after: { label: 'Après', value: 82 },
      stamp: 'Exemple fictif',
      figure: {
        organisme: 'Aucun : valeurs inventées pour expliquer',
        date: 'Sans objet',
        territoire: 'Sans objet',
        perimetre: 'Illustration seulement, à ne pas citer comme résultat',
      },
    },
    official: {
      title: 'Indicateur officiel ONU ou indicateur de notre projet ?',
      officialLabel: 'Indicateur officiel ONU 7.3.1',
      official:
        'Intensité énergétique, mesurée en fonction de l’énergie primaire et du PIB. Il compare l’énergie utilisée à la richesse produite, à l’échelle d’un pays.',
      projectLabel: 'Notre indicateur de projet',
      project:
        'kWh par m² (ou par personne) dans un seul bâtiment. Ce n’est pas l’indicateur officiel : il sert seulement à tester notre idée.',
      figure: {
        organisme: 'Organisation des Nations Unies (ONU)',
        date: '[À VÉRIFIER]',
        territoire: 'Monde (calculé par pays)',
        perimetre: 'Indicateur 7.3.1 du cadre mondial des ODD',
      },
    },
    limits: {
      title: 'Ce que cet indicateur ne prouve pas',
      items: [
        'La baisse peut venir de la météo : un été moins chaud demande moins de clim.',
        'La baisse peut venir d’un changement d’occupation : moins de personnes dans le bâtiment.',
        'Le nombre d’alertes ne prouve pas un progrès. Ce qui compte, c’est la consommation réelle.',
      ],
    },
    conclusionLabel: 'Notre conclusion',
    conclusion:
      'Notre solution peut améliorer l’efficacité énergétique, mais risque de produire des déchets électroniques et de ne profiter qu’aux bâtiments équipés, donc nous vérifierons la consommation réelle et l’impact des capteurs.',
    sourceKeys: ['un_energy', 'un_db', 'un_meta'] as const,
  },
}

export type SourceKey = keyof typeof content.sources
export type TagKind = keyof typeof content.tags
export type FigureInfo = {
  organisme: string
  date: string
  territoire: string
  perimetre: string
}
