import type { Translation } from './type'
import NuxtLink from './NuxtLink.vue'

export const fr: Partial<Translation> = {
  meta: {
    title: 'CodeTime - Suivez votre temps de codage',
    description: 'CodeTime est une application conçue pour les développeurs pour vous aider à suivre, analyser et améliorer vos compétences en matière de gestion du temps de codage.',
    ogTitle: 'CodeTime - Suivez votre temps de codage',
    ogDescription: 'CodeTime est une application conçue pour les développeurs pour vous aider à suivre, analyser et améliorer vos compétences en matière de gestion du temps de codage.',
    twitterTitle: 'CodeTime - Suivez votre temps de codage',
    twitterDescription: 'CodeTime est une application conçue pour les développeurs pour vous aider à suivre, analyser et améliorer vos compétences en matière de gestion du temps de codage.',
  },
  general: {
    cancel: 'Annuler',
    confirm: 'Confirmer',
  },
  landing: {
    login: 'Se connecter',
    description: 'CodeTime est une application conçue pour les développeurs pour vous aider à suivre et analyser votre temps de codage.',
    toDashboard: 'Aller au tableau de bord',
    alreadyStatistical: 'Temps de codage déjà suivi',
    minutes: 'minutes',
    loginWithGithub: 'Se connecter avec GitHub',
    freeMessage: 'Actuellement complètement gratuit, aucune carte de crédit requise',
    demo: 'Démo',
    features: {
      visualization: {
        title: 'Visualisation des données',
        description: 'Nous nous engageons à fournir le tableau de bord moderne le plus esthétique pour vous aider à mieux comprendre votre temps de codage.',
      },
      save: {
        title: 'Sauvegardez vos données de temps de codage pour toujours.',
        description: 'Nous connaissons la beauté des données historiques. Rien n\'est plus frustrant que d\'avoir votre propre dur labeur effacé. Afin que tous les utilisateurs puissent revoir leur historique de croissance même après de nombreuses années, nous sauvegarderons vos données pour toujours, jusqu\'à ce que vous les détruisez activement, même si vous n\'avez jamais payé.',
      },
      export: {
        title: 'Prise en charge de l\'exportation de données.',
        description: 'L\'endroit le plus sûr au monde est votre propre disque dur. Par conséquent, nous prenons en charge l\'exportation de données, vous pouvez quitter à tout moment, et vous connecter à d\'autres plateformes ou services auto-construits.',
      },
      editor: {
        title: 'Prise en charge de plusieurs éditeurs.',
        description: 'Nous sommes une très petite équipe. Cela signifie que nous ne pouvons pas prendre en charge tous les IDE ou éditeurs de code. Cependant, nous prenons actuellement en charge VSCode et JetBrain séries IDE. Nous pensons qu\'ils couvrent la plupart des besoins des utilisateurs. Nous ferons de notre mieux pour prendre en charge plus de plates-formes et profiter à plus de gens.',
      },
    },
    pricing: {
      title: 'Tarification',
      description: 'Choisissez le plan qui vous convient.',
    },
  },
  plan: {
    monthly: 'Mensuel',
    yearly: 'Annuel',
    save25: 'Économisez 25%',
    oneTime: 'One-time',
    mostFlexible: 'Le plus flexible',
    mostPopular: 'Le plus populaire',
    bestValue: 'Meilleur rapport qualité-prix',
    modal: {
      title: 'Mise à niveau de l\'abonnement',
      p1: 'Nous avons besoin de votre soutien pour maintenir notre enthousiasme pour le développement, afin de fournir des rapports de données plus riches et une meilleure expérience utilisateur.',
      p2: 'Vous pouvez choisir de passer à un abonnement Pro pour déverrouiller plus de fonctionnalités.',
      p3: 'Si vous rencontrez des problèmes lors du processus de paiement, veuillez nous contacter par e-mail.',
    },
    status(str: 'active' | 'cancelled' | 'expired' | 'on-trial' | 'paused' | 'past-due' | 'unpaid'): string {
      switch (str) {
        case 'active':
          return 'Actif'
        case 'cancelled':
          return 'Annulé'
        case 'expired':
          return 'Expiré'
        case 'on-trial':
          return 'En cours'
        case 'paused':
          return 'En pause'
        case 'past-due':
          return 'En souffrance'
        case 'unpaid':
          return 'Non payé'
      }
    },
    basic: {
      title: 'Base',
      forever: 'Pour toujours',
      features: {
        title: 'Fonctionnalités',
        item: {
          saveHistory: 'Sauvegarder les données historiques pour toujours',
          browseRecent: 'Parcourir les données des 90 derniers jours',
          codetimeTrend: 'Rapport de tendance du temps de codage',
          codetimeLanguaeTrend: 'Rapport de tendance de langage de programmation',
          codetimeProjectTrend: 'Rapport de tendance de projet',
          badge: 'Générer des badges pour l\'affichage',
          export: 'Export de données',
          import: 'Importation de données',
          more: 'Plus de rapports',
        },
      },
      button: 'Gratuit pour toujours',
    },
    pro: {
      title: 'Pro',
      preMonth: '/ mois',
      preYear: '/ an',
      features: {
        item: {
          include: 'Inclut toutes les fonctionnalités du plan de base',
          browseAll: 'Parcourir toutes les données historiques',
          rule: 'Traitement des données basé sur des règles',
          tag: 'Système de balises',
        },
      },
      notYet: 'signifie pas encore disponible',
      button: 'Souscrire maintenant',
    },
    needLogin: 'Besoin de se connecter',
  },
  dashboard: {
    loginRequired: 'Bienvenue dans le tableau de bord CodeTime! Veuillez vous connecter pour afficher vos données de temps de codage, ou cliquez sur le bouton de démonstration ci-dessous pour découvrir le tableau de bord de démonstration.',
    projectSelector: {
      placeholder: 'Sélectionnez un espace de travail',
      noneText: 'Entrez le nom de l\'espace de travail',
    },
    pageHeader: {
      userLatestEvent(project: string) {
        return `Travailler sur ${project}`
      },
      title: {
        overview: 'Aperçu',
        badge: 'Badges',
        settings: 'Paramètres',
        leaderboard: 'Classement',
        workspace: 'Espace de travail',
      },
      description: {
        overview: 'Affichez toutes vos données CodeTime.',
        badge: 'Affichez votre temps de codage dans vos projets avec des badges concis, cohérents et clairs.',
        settings: 'Gérez vos paramètres CodeTime, y compris l\'apparence, la langue, les données, etc.',
        leaderboard: 'Afficher le classement CodeTime de tous les utilisateurs.',
        workspace: 'Affichez les données d\'un espace de travail spécifique.',
      },
    },
    overview: {
      codetimeTrendTitle: 'Tendance du temps de codage',
      codetimeLanguaeTrendTitle: 'Tendance des langages de programmation',
      codetimeProjectTrendTitle: 'Tendance du projet',
      dailyCodingDistributionTitle: 'Répartition quotidienne du codage',
      dataRange: {
        title(days: number) {
          return `Les ${days} derniers jours`
        },
        allTime: 'Tout le temps',
      },
      statistic: {
        timeTotal: 'Temps/Total',
        timeToday: 'Temps/Aujourd\'hui',
        timeAverage: 'Temps/Moyenne',
        longestStreak: 'Série/La plus grande',
        currentStreak: 'Série/Actuelle',
      },
      top: {
        language: 'Langage',
        project: 'Projet',
        platform: 'Plateforme',
      },
      noData: {
        notice: {
          title: 'Aucune donnée pour le moment',
          body: defineComponent({
            components: {
              NuxtLink,
            },
            setup() {
              return () => (
                <div class="text-sm">
                  <span class="text-surface-dimmed">
                    Actuellement, nous n\'avons pas encore traité avec succès vos données de temps de codage. Cette application dépend du plugin pour votre éditeur de code ou environnement de développement intégré (comme VSCode, JetBrains IDE). Veuillez visiter le
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="text-primary-on px-2"
                  >
                    [ Paramètres ]
                  </NuxtLink>
                  <span class="text-surface-dimmed">
                    page et configurez les paramètres nécessaires dans l\'éditeur de code qui prend en charge le plugin que vous utilisez. Après avoir reçu vos données, nous avons besoin d\'environ deux minutes pour les traiter. Merci pour votre coopération.
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
        title: 'Aperçu',
      },
      style: {
        flat: 'Plat',
        flatSquare: 'Plat Carré',
        forTheBadge: 'Pour le Badge',
        plastic: 'Plastique',
        social: 'Social',
      },
      placeholder: {
        style: 'Style',
        language: 'Langage',
        days: 'Jours',
        project: 'Projet',
        color: 'Couleur',
      },
    },
    settings: {
      token: {
        title: 'Jeton',
        tip: 'Votre jeton est utilisé pour accéder à l\'API CodeTime. Gardez-le privé.',
        refresh: 'Rafraîchir',
        refreshTip: 'Si vous soupçonnez que votre jeton a été divulgué, vous pouvez en générer un nouveau ici.',
        refreshToken: 'Actualiser le jeton',
        confirmRefresh: 'Êtes-vous sûr de vouloir actualiser le jeton? Cela invalidera le jeton que vous avez appliqué au plugin de l\'éditeur. Vous devez saisir un nouveau jeton.',
        getPlugin: defineComponent({
          components: {
            NuxtLink,
          },
          setup() {
            return () => (
              <div class="text-surface-dimmed">
                <span>
                  Pour que CodeTime fonctionne correctement, vous devez installer notre plugin et configurer le jeton dans votre environnement de développement. Actuellement, nous prenons en charge
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
                  et
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
        title: 'Langue',
        tip: 'Choisissez la langue pour votre interface utilisateur Web CodeTime.',
      },
      export: {
        title: 'Exportation',
        button: 'Exportation en un clic',
        buttonExporting: 'Exportation...',
        buttonSucceed: 'Exportation réussie',
        buttonFailed: 'Exportation échouée',
        download: 'Télécharger',
        description: 'Nous prenons en charge l\'exportation des données du site Web pour assurer une sauvegarde sécurisée, une migration pratique, une analyse approfondie et la conformité, tout en vous donnant un contrôle complet et une transparence sur vos données.',
        tip: 'Exportez vos données vers un fichier CSV.',
      },
      theme: {
        title: 'Thème',
        tip: 'Choisissez le thème de votre interface Web CodeTime.',
        dark: 'Sombre',
        light: 'Lumière',
        system: 'Système',
      },
      dangerZone: {
        title: 'Zone de danger',
        description: 'Ces paramètres affecteront définitivement vos données et ne pourront pas être annulés. Veuillez procéder avec prudence.',
        button: {
          removeAllData: 'Supprimer toutes les données',
          modal: {
            p1: 'Êtes-vous sûr de vouloir supprimer toutes vos données? Cette opération ne peut pas être annulée.',
            p2: 'Vos données sont très importantes, vous pouvez d\'abord exporter les données, puis supprimer les données.',
            p3: 'Si vous souhaitez supprimer toutes les données, veuillez saisir DELETE ci-dessous, puis cliquez sur Confirmer.',
          },
        },
      },
      account: {
        title: 'Compte',
        description: 'Paramètres du compte.',
        expiresIn: 'Expire dans',
        manageSubscription: 'Gérer l\'abonnement',
        subscribe: 'Souscrire',
      },
      other: {
        title: 'Autre',
        description: 'Autres paramètres.',
        logout: 'Déconnexion',
      },
    },
    workspace: {
      select: {
        placeholder: 'Sélectionnez un espace de travail',
        none: 'Entrez le nom de l\'espace de travail',
      },
      flameGraph: {
        title: 'Graphique en flammes',
        noData: 'Pas de données',
      },
      fileList: {
        title: 'Liste de fichiers',
      },
    },
    leaderboard: {
      title(days: number) {
        return `Classement du temps de codage des ${days} derniers jours`
      },
      delta(string: string) {
        return `${string} derrière`
      },
    },
  },
  button: {
    copy: 'Copier',
    copied: 'Copié',
  },
  plot: {
    label: {
      project: 'Projet',
      timeHour: 'Temps (heures)',
      language: 'Langage',
      date: 'Date',
      duration: 'Durée',
      other: 'Autre',
      unknown: 'Inconnu',
    },
  },
}
