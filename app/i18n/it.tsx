import type { Translation } from './type'
import NuxtLink from './NuxtLink.vue'

export const it: Partial<Translation> = {
  annualReport: {
    shareMyReport: 'Condividi il mio report',
    reviewAnnualReport: 'Controlla il report annuale',
    userNotFound: 'Utente non trovato.',
    noData: 'Nessun dato disponibile.',
    noDataAvailableFor: (year: number | string) => `Nessun dato disponibile per ${year}.`,
    annualCodeTimeReport: (year: number | string) => `Report annuale del tempo di codice per ${year}`,
    weekendCodingTimeRatio: 'Rapporto del tempo di codifica del fine settimana',
    averageDailyCodingTime: 'Tempo medio di codifica giornaliero',
    busiestDayOfTheYear: 'Giorno più impegnativo dell\'anno',
    busiestMonthOfTheYear: 'Mese più impegnativo dell\'anno',
    theMostProductiveHourOfTheYear: 'L\'ora più produttiva dell\'anno',
    month: 'Mese',
    hour: 'Ora',
    minutes: 'Minuti',
    theMostUsedLanguageOfTheYear: 'Linguaggio più utilizzato dell\'anno',
    totalCodingTimeOfTheYear: 'Tempo totale di codifica dell\'anno',
    priodOfDay: {
      morning: 'Mattina',
      afternoon: 'Pomeriggio',
      evening: 'Sera',
      midnight: 'Mezzanotte',
    },
  },
  meta: {
    title: 'CodeTime - Registra il tuo tempo di programmazione',
    description: 'CodeTime è un\'applicazione progettata per gli sviluppatori che ti aiuta a tenere traccia, analizzare e migliorare le tue abilità di gestione del tempo di programmazione.',
    ogTitle: 'CodeTime - Registra il tuo tempo di programmazione',
    ogDescription: 'CodeTime è un\'applicazione progettata per gli sviluppatori che ti aiuta a tenere traccia, analizzare e migliorare le tue abilità di gestione del tempo di programmazione.',
    twitterTitle: 'CodeTime - Registra il tuo tempo di programmazione',
    twitterDescription: 'CodeTime è un\'applicazione progettata per gli sviluppatori che ti aiuta a tenere traccia, analizzare e migliorare le tue abilità di gestione del tempo di programmazione.',
  },
  general: {
    cancel: 'Annulla',
    confirm: 'Conferma',
  },
  landing: {
    login: 'Accedi',
    description: 'CodeTime è un\'applicazione progettata per gli sviluppatori che ti aiuta a tenere traccia e analizzare il tuo tempo di programmazione.',
    toDashboard: 'Vai alla Dashboard',
    alreadyStatistical: 'Tempo di programmazione già registrato',
    minutes: 'minuti',
    loginWithGithub: 'Accedi con GitHub',
    freeMessage: 'Attualmente completamente gratuito, non è richarta la carta di credito',
    demo: 'Demo',
    features: {
      visualization: {
        title: 'Visualizzazione dei dati',
        description: 'Ci impegniamo a fornire il dashboard moderno più piacevole alla vista per aiutarti a capire meglio il tuo tempo di programmazione.',
      },
      save: {
        title: 'Salva i tuoi dati di tempo di programmazione per sempre.',
        description: 'Sappiamo la bellezza dei dati storici. Niente è più frustrante che cancellare il tuo duro lavoro. Per consentire a tutti gli utenti di poter rivedere la loro storia di crescita anche dopo molti anni, salveremo i tuoi dati per sempre, fino a quando non li distruggerai attivamente, anche se non hai mai pagato.',
      },
      export: {
        title: 'Supporta l\'esportazione dei dati.',
        description: 'Il posto più sicuro al mondo è il tuo hard disk. Pertanto, supportiamo l\'esportazione dei dati, puoi smettere in qualsiasi momento e connetterti ad altre piattaforme o servizi self-built.',
      },
      editor: {
        title: 'Supporta più editor.',
        description: 'Siamo un team molto piccolo. Ciò significa che non possiamo supportare tutti gli IDE o gli editor di codice. Tuttavia, attualmente supportiamo gli IDE della serie VSCode e JetBrain. Crediamo che coprano la maggior parte delle esigenze degli utenti. Faremo del nostro meglio per supportare più piattaforme e beneficiare più persone.',
      },
    },
    pricing: {
      title: 'Prezzi',
      description: 'Scegli il piano che fa per te.',
    },
  },
  plan: {
    monthly: 'Mensile',
    yearly: 'Annuale',
    save25: 'Risparmia il 25%',
    oneTime: 'Una tantum',
    mostFlexible: 'Più flessibile',
    mostPopular: 'Più popolare',
    bestValue: 'Miglior valore',
    modal: {
      title: 'Aggiorna l\'abbonamento',
      p1: 'Abbiamo bisogno del tuo supporto per mantenere il nostro entusiasmo per lo sviluppo, in modo da fornire report di dati più ricchi e una migliore esperienza utente.',
      p2: 'Puoi scegliere di aggiornare a un abbonamento Pro per sbloccare più funzionalità.',
      p3: 'Se incontri problemi durante il processo di pagamento, contattaci via email.',
    },
    status(str:string): string {
      switch (str) {
        case 'active': {
          return 'Attivo'
        }
        case 'cancelled': {
          return 'Annullato'
        }
        case 'expired': {
          return 'Scaduto'
        }
        case 'on-trial': {
          return 'In prova'
        }
        case 'paused': {
          return 'In pausa'
        }
        case 'past-due': {
          return 'Scaduto'
        }
        case 'unpaid': {
          return 'Non pagato'
        }
        default: {
          return 'Sconosciuto'
        }
      }
    },
    basic: {
      title: 'Base',
      forever: 'Per sempre',
      features: {
        title: 'Funzionalità',
        item: {
          saveHistory: 'Salva i dati storici per sempre',
          browseRecent: 'Sfoglia i dati degli ultimi 90 giorni',
          codetimeTrend: 'Report sulla tendenza del tempo di programmazione',
          codetimeLanguaeTrend: 'Report sulla tendenza del linguaggio di programmazione',
          codetimeProjectTrend: 'Report sulla tendenza del progetto',
          badge: 'Genera badge per la visualizzazione',
          export: 'Esporta dati',
          import: 'Importa dati',
          more: 'Altri report',
        },
      },
      button: 'Gratis per sempre',
    },
    pro: {
      title: 'Pro',
      preMonth: '/ mese',
      preYear: '/ anno',
      features: {
        item: {
          include: 'Include tutte le funzionalità del piano Basic',
          browseAll: 'Sfoglia tutti i dati storici',
          rule: 'Elaborazione dati basata su regole',
          tag: 'Sistema di tag',
        },
      },
      notYet: 'significa non ancora disponibile',
      button: 'Abbonati ora',
    },
    needLogin: 'Devi effettuare l\'accesso',
  },
  dashboard: {
    loginRequired: 'Benvenuto nella dashboard di CodeTime! Accedi per visualizzare i tuoi dati di tempo di programmazione, o fai clic sul pulsante demo qui sotto per provare la dashboard demo.',
    projectSelector: {
      placeholder: 'Seleziona uno spazio di lavoro',
      noneText: 'Inserisci il nome dello spazio di lavoro',
    },
    pageHeader: {
      userLatestEvent(project: string) {
        return `Lavorando su ${project}`
      },
      title: {
        overview: 'Panoramica',
        badge: 'Badge',
        settings: 'Impostazioni',
        leaderboard: 'Classifica',
        workspace: 'Spazio di lavoro',
      },
      description: {
        overview: 'Visualizza tutti i tuoi dati di CodeTime.',
        badge: 'Visualizza il tuo tempo di programmazione nei tuoi progetti con badge concisi, coerenti e chiari.',
        settings: 'Gestisci le tue impostazioni di CodeTime, inclusi aspetto, lingua, dati, ecc.',
        leaderboard: 'Visualizza la classifica di CodeTime di tutti gli utenti.',
        workspace: 'Visualizza i tuoi dati di CodeTime per uno spazio di lavoro specifico.',
      },
    },
    overview: {
      codetimeTrendTitle: 'Tendenza del tempo di programmazione',
      codetimeLanguaeTrendTitle: 'Tendenza del linguaggio di programmazione',
      codetimeProjectTrendTitle: 'Tendenza del progetto',
      dailyCodingDistributionTitle: 'Distribuzione giornaliera del tempo di programmazione',
      dataRange: {
        title(days: number): string {
          return `Ultimi ${days} giorni`
        },
        allTime: 'Sempre',
      },
      statistic: {
        timeTotal: 'Tempo/Totali',
        timeToday: 'Tempo/Oggi',
        timeAverage: 'Tempo/Media',
        longestStreak: 'Streak/Più lungo',
        currentStreak: 'Streak/Corrente',
      },
      top: {
        language: 'Linguaggio',
        project: 'Progetto',
        platform: 'Piattaforma',
        workspace: 'Area di lavoro',
      },
      noData: {
        notice: {
          title: 'Ancora nessun dato',
          body: defineComponent({
            components: {
              NuxtLink,
            },
            setup() {
              return () => (
                <div class="text-sm">
                  <span class="text-surface-dimmed">
                    Al momento non abbiamo ancora elaborato correttamente i tuoi dati di codetime. Questa applicazione si basa sul plugin per il tuo editor di codice o ambiente di sviluppo integrato (come VSCode, IDE JetBrains). Visita la
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="text-primary-on px-2"
                  >
                    [ Impostazioni ]
                  </NuxtLink>
                  <span class="text-surface-dimmed">
                    pagina e configura le impostazioni necessarie nell\'editor di codice che supporta il plugin che stai utilizzando. Dopo aver ricevuto i tuoi dati, abbiamo bisogno di circa due minuti per elaborarli. Grazie per la collaborazione.
                  </span>
                </div>
              )
            },
          }),
        },
      },
    },
    badge: {
      preview: {
        title: 'Anteprima',
      },
      style: {
        flat: 'Flat',
        flatSquare: 'Flat Square',
        forTheBadge: 'For the Badge',
        plastic: 'Plastic',
        social: 'Social',
      },
      placeholder: {
        style: 'Stile',
        language: 'Linguaggio',
        days: 'Giorni',
        project: 'Progetto',
        color: 'Colore',
      },
    },
    settings: {
      token: {
        title: 'Token',
        tip: 'Il tuo token viene utilizzato per l\'accesso all\'API CodeTime. Tienilo privato.',
        refresh: 'Aggiorna',
        refreshTip: 'Se sospetti che il tuo token sia stato divulgato, puoi rigenerare un nuovo token qui.',
        refreshToken: 'Aggiorna Token',
        confirmRefresh: 'Sei sicuro di voler aggiornare il token? Questo renderà non valido il token che hai applicato al plugin dell\'editor. Devi inserire un nuovo token.',
        getPlugin: defineComponent({
          components: {
            NuxtLink,
          },
          setup() {
            return () => (
              <div class="text-surface-dimmed">
                <span>
                  Per far funzionare CodeTime correttamente, è necessario installare il nostro plugin e configurare il token nel tuo ambiente di sviluppo. Attualmente supportiamo
                </span>
                <NuxtLink
                  to="https://marketplace.visualstudio.com/items?itemName=jannchie.codetime"
                  class="text-primary-on inline-flex items-center gap-1 px-2"
                  style="baseline-source: last;"
                >
                  <i class="i-tabler-brand-vscode" />
                  <span>
                    VSCode
                  </span>
                </NuxtLink>
                <span>
                  e
                </span>
                <NuxtLink
                  to="https://plugins.jetbrains.com/plugin/25617-codetime"
                  class="text-primary-on inline-flex items-center gap-1 px-2"
                  style="baseline-source: last;"
                >
                  <i class="i-devicon-plain-jetbrains pr-2" />
                  <span>
                    Jetbrains
                  </span>
                </NuxtLink>
                .
              </div>
            )
          },
        }),
      },
      language: {
        title: 'Lingua',
        tip: 'Scegli la lingua per la tua interfaccia utente Web CodeTime.',
      },
      export: {
        title: 'Esporta',
        button: 'Esporta con un clic',
        buttonExporting: 'Esportazione in corso...',
        buttonSucceed: 'Esportazione riuscita',
        buttonFailed: 'Esportazione fallita',
        download: 'Scarica',
        description: 'Supportiamo l\'esportazione dei dati del sito Web per garantire il backup sicuro, la migrazione conveniente, l\'analisi approfondita e la conformità, garantendo al contempo il controllo e la trasparenza completi sui dati.',
        tip: 'Esporta i tuoi dati in un file CSV.',
      },
      theme: {
        title: 'Tema',
        tip: 'Scegli il tema per la tua interfaccia utente Web CodeTime.',
        dark: 'Scuro',
        light: 'Chiaro',
        system: 'Sistema',
      },
      dangerZone: {
        title: 'Zona pericolosa',
        description: 'Queste impostazioni influenzeranno permanentemente i tuoi dati e non potranno essere annullate. Procedere con cautela.',
        button: {
          removeAllData: 'Rimuovi tutti i dati',
          removeAllDataModal: {
            p1: 'Sei sicuro di voler eliminare tutti i tuoi dati? Questa operazione non può essere annullata.',
            p2: 'I tuoi dati sono molto importanti, puoi prima esportare i dati e quindi cancellarli.',
            p3: 'Se vuoi eliminare tutti i dati, inserisci DELETE di seguito e fai clic su Conferma.',
          },
        },
        subTitle: {
          removeData: 'Rimuovi tutti i dati',
          privacy: 'Privacy',
        },
      },
      account: {
        title: 'Account',
        description: 'Impostazioni dell\'account.',
        expiresIn: 'Scade in',
        manageSubscription: 'Gestisci abbonamento',
        subscribe: 'Abbonati',
      },
      other: {
        title: 'Altro',
        description: 'Altre impostazioni.',
        logout: 'Esci',
      },
    },
    workspace: {
      select: {
        placeholder: 'Seleziona uno spazio di lavoro',
        none: 'Inserisci il nome dello spazio di lavoro',
      },
      flameGraph: {
        title: 'Grafico a fiamma',
        noData: 'Nessun dato',
      },
      fileList: {
        title: 'Elenco dei file',
      },
    },
    leaderboard: {
      title(days: number): string {
        return `Classifica del tempo di programmazione degli ultimi ${days} giorni`
      },
      delta(string: string): string {
        return `${string} dietro`
      },
    },
  },
  button: {
    copy: 'Copia',
    copied: 'Copiato',
    cancel: 'Annulla',
    confirm: 'Conferma',
  },
  plot: {
    label: {
      project: 'Progetto',
      timeHour: 'Tempo (ore)',
      language: 'Linguaggio',
      date: 'Data',
      duration: 'Durata',
      other: 'Altro',
      unknown: 'Sconosciuto',
    },
  },
}
