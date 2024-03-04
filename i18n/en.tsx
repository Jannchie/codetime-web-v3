import NuxtLink from './NuxtLink.vue'

export const en = {
  meta: {
    title: 'CodeTime - Track your coding time automatically',
    description: 'CodeTime is an application designed for developers to help you track, analyze and improve your coding time management skills.',
    ogTitle: 'CodeTime - Track your coding time automatically',
    ogDescription: 'CodeTime is an application designed for developers to help you track, analyze and improve your coding time management skills.',
    twitterTitle: 'CodeTime - Track your coding time automatically',
    twitterDescription: 'CodeTime is an application designed for developers to help you track, analyze and improve your coding time management skills.',
  },
  general: {
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
  landing: {
    login: 'Login',
    description: 'CodeTime is an application designed for developers to help you track and analyze your coding time.',
    toDashboard: 'Go to Dashboard',
    alreadyStatistical: 'Coding time already tracked',
    minutes: 'minutes',
    loginWithGithub: 'Login with GitHub',
    freeMessage: 'Currently completely free, no credit card required',
    demo: 'Demo',
    features: {
      visualization: {
        title: 'Data visualization',
        description: 'We are committed to providing the most visually pleasing modern dashboard to help you better understand your code time.',
      },
      save: {
        title: 'Save your coding time data forever.',
        description: 'We know the beauty of historical data. Nothing is more frustrating than having your own hard work erased. In order for all users to be able to review their growth history even after many years, we will save your data forever, until you actively destroy them, even if you have never paid.',
      },
      export: {
        title: 'Support data export.',
        description: 'The safest place in the world is your own hard drive. Therefore, we support data export, you can quit at any time, and connect to other platforms or self-built services.',
      },
      editor: {
        title: 'Support multiple editors.',
        description: 'We are a very small team. This means that we cannot support all IDEs or code editors. However, we currently support VSCode and JetBrain series IDEs. We believe that they cover most of the user needs. We will try our best to support more platforms and benefit more people.',
      },
    },
    pricing: {
      title: 'Pricing',
      description: 'Choose the plan that suits you.',
    },
  },
  plan: {
    monthly: 'Monthly',
    yearly: 'Yearly',
    save25: 'Save 25%',
    oneTime: 'One-time',
    mostFlexible: 'Most Flexible',
    mostPopular: 'Most Popular',
    bestValue: 'Best Value',
    modal: {
      title: 'Upgrade Subscription',
      p1: 'We need your support to maintain our development enthusiasm, so as to provide richer data reports and better user experience.',
      p2: 'You can choose to upgrade to a Pro subscription to unlock more features.',
      p3: 'If you encounter any problems during the payment process, please contact us by email.',
    },
    status(str: 'active' | 'cancelled' | 'expired' | 'on-trial' | 'paused' | 'past-due' | 'unpaid'): string {
      switch (str) {
        case 'active':
          return 'Active'
        case 'cancelled':
          return 'Cancelled'
        case 'expired':
          return 'Expired'
        case 'on-trial':
          return 'On Trial'
        case 'paused':
          return 'Paused'
        case 'past-due':
          return 'Past Due'
        case 'unpaid':
          return 'Unpaid'
      }
    },
    basic: {
      title: 'Basic',
      forever: 'Forever',
      features: {
        title: 'Features',
        item: {
          saveHistory: 'Save historical data forever',
          browseRecent: 'Browse data for the last 90 days',
          codetimeTrend: 'Coding time trend report',
          codetimeLanguaeTrend: 'Programming language trend report',
          codetimeProjectTrend: 'Project trend report',
          badge: 'Generate badges for display',
          export: 'Data export',
          import: 'Data import',
          more: 'More reports',
        },
      },
      button: 'Free forever',
    },
    pro: {
      title: 'Pro',
      preMonth: '/ month',
      preYear: '/ year',
      features: {
        item: {
          include: 'Includes all features of the Basic plan',
          browseAll: 'Browse all historical data',
          rule: 'Rule-based data processing',
          tag: 'Tag system',
        },
      },
      notYet: 'means not yet available',
      button: 'Subscribe Now',
    },
    needLogin: 'Need to log in',
  },
  dashboard: {
    loginRequired: 'Welcome to the CodeTime dashboard! Please log in to view your coding time data, or click the demo button below to experience the demo dashboard.',
    projectSelector: {
      placeholder: 'Select a project',
      noneText: 'Input your project name',
    },
    pageHeader: {
      title: {
        overview: 'Overview',
        badge: 'Badges',
        settings: 'Settings',
        leaderboard: 'Leaderboard',
        workspace: 'Workspace',
      },
      description: {
        overview: 'View all your CodeTime data.',
        badge: 'Display your coding time in your projects with concise, consistent, and clear badges.',
        settings: 'Manage your CodeTime settings, including appearance, language, data, etc.',
        leaderboard: 'View the CodeTime leaderboard of all users.',
        workspace: 'View your workspace details.',
      },
    },
    overview: {
      codetimeTrendTitle: 'Coding Time Trend',
      codetimeLanguaeTrendTitle: 'Programming Language Trend',
      codetimeProjectTrendTitle: 'Project Trend',
      dailyCodingDistributionTitle: 'Daily Coding Distribution',
      dataRange: {
        title(days: number) {
          return `Past ${days} days`
        },
        allTime: 'All Time',
      },
      statistic: {
        timeTotal: 'Time/Total',
        timeToday: 'Time/Today',
        timeAverage: 'Time/Average',
        longestStreak: 'Streak/Largest',
        currentStreak: 'Streak/Current',
      },
      top: {
        language: 'Language',
        project: 'Project',
        platform: 'Platform',
      },
      noData: {
        notice: {
          title: 'No data yet',
          body: defineComponent({
            components: {
              NuxtLink,
            },
            setup() {
              return () => (
                <div class="text-sm">
                  <span class="text-surface-onlow">
                    Currently, we have not yet successfully processed your codetime data. This application relies on the plugin for your code editor or integrated development environment (such as VSCode, JetBrains IDE). Please visit the
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="px-2 text-primary-on"
                  >
                    [ Settings ]
                  </NuxtLink>
                  <span class="text-surface-onlow">
                    page and configure the necessary settings in the code editor that supports the plugin you are using. After receiving your data, we need about two minutes to process it. Thank you for your cooperation.
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
        title: 'Preview',
      },
      style: {
        flat: 'Flat',
        flatSquare: 'Flat Square',
        forTheBadge: 'For the Badge',
        plastic: 'Plastic',
        social: 'Social',
      },
      placeholder: {
        style: 'Style',
        language: 'Language',
        days: 'Days',
        project: 'Project',
        color: 'Color',
      },
    },
    settings: {
      token: {
        title: 'Token',
        tip: 'Your token is used for access to the CodeTime API. Keep it private.',
        refresh: 'Refresh',
        refreshTip: 'If you suspect that your token has been leaked, you can regenerate a new token here.',
        refreshToken: 'Refresh Token',
        confirmRefresh: 'Are you sure you want to refresh the token? This will invalidate the token you have applied to the editor plugin. You need to enter a new token.',
      },
      language: {
        title: 'Language',
        tip: 'Choose the language for your CodeTime Web UI.',
      },
      export: {
        title: 'Export',
        button: 'One-click Export',
        buttonExporting: 'Exporting...',
        buttonSucceed: 'Export Succeed',
        buttonFailed: 'Export Failed',
        download: 'Download',
        description: 'We support website data export to ensure secure backup, convenient migration, in-depth analysis, and compliance, while giving you complete control and transparency over your data.',
        tip: 'Export your data to a CSV file.',
      },
      theme: {
        title: 'Theme',
        tip: 'Choose the theme for your CodeTime Web UI.',
        dark: 'Dark',
        light: 'Light',
        system: 'System',
      },
      dangerZone: {
        title: 'Danger Zone',
        description: 'These settings will permanently affect your data and cannot be undone. Please proceed with caution.',
        button: {
          removeAllData: 'Remove All Data',
          modal: {
            p1: 'Are you sure you want to delete all your data? This operation cannot be undone.',
            p2: 'Your data is very important, you can export the data first, and then delete the data.',
            p3: 'If you want to delete all data, please enter DELETE below, and then click Confirm.',
          },
        },
      },
      account: {
        title: 'Account',
        description: 'Account settings.',
        expiresIn: 'Expires in',
        manageSubscription: 'Manage Subscription',
        subscribe: 'Subscribe',
      },
      other: {
        title: 'Other',
        description: 'Other settings.',
        logout: 'Logout',
      },
    },
    workspace: {
      select: {
        placeholder: 'Select a workspace',
        none: 'Input a workspace name',
      },
      flameGraph: {
        title: 'Flame Graph',
        noData: 'No data yet',
      },
      fileList: {
        title: 'File List',
      },
    },
    leaderboard: {
      title(days: number) {
        return `Past ${days} Days Coding Time Leaderboard`
      },
      delta(string: string) {
        return `${string} behind`
      },
    },
  },
  button: {
    copy: 'Copy',
    copied: 'Copied',
  },
  plot: {
    label: {
      project: 'Project',
      timeHour: 'Time (hours)',
      language: 'Language',
      date: 'Date',
      duration: 'Duration',
      other: 'Other',
      unknown: 'Unknown',
    },
  },
}
