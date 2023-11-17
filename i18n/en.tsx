import NuxtLink from './NuxtLink.vue'

export const en = {
  landing: {
    description: 'CodeTime is an application designed for developers to help you track and analyze your coding time.',
    toDashboard: 'Go to Dashboard',
    alreadyStatistical: 'Coding time already tracked',
    minutes: 'minutes',
    loginWithGithub: 'Login with GitHub',
    freeMessage: 'Currently completely free, no credit card required',
    demo: 'Demo',
  },
  dashboard: {
    loginRequired: 'Welcome to the CodeTime dashboard! Please log in to view your coding time data, or click the demo button below to experience the demo dashboard.',
    pageHeader: {
      title: {
        overview: 'Overview',
        badge: 'Badges',
        settings: 'Settings',
        leaderboard: 'Leaderboard',
      },
      description: {
        overview: 'View all your CodeTime data.',
        badge: 'Display your coding time in your projects with concise, consistent, and clear badges.',
        settings: 'Manage your CodeTime settings, including appearance, language, data, etc.',
        leaderboard: 'View the CodeTime leaderboard of all users.',
      },
    },
    overview: {
      codetimeTrendTitle: 'Coding Time Trend',
      codetimeLanguaeTrendTitle: 'Programming Language Trend',
      codetimeProjectTrendTitle: 'Project Trend',
      dataRange: {
        title(days: number) {
          return `Past ${days} days`
        },
      },
      statistic: {
        timeTotal: 'Time/Total',
        timeToday: 'Time/Today',
        timeAverage: 'Time/Average',
        longestStreak: 'Streak/Current',
        currentStreak: 'Streak/Max',
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
                  <span class="op50">
                    Currently, we haven't received any records of your coding time. This application relies on the plugin for your code editor or integrated development environment (such as VSCode, JetBrains IDE). To ensure smooth operation, please visit the
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="text-sky-6 px-2"
                  >
                    {/* [ 設定 ] */}
                    [ Settings ]
                  </NuxtLink>
                  <span class="op50">
                    page and configure the necessary settings in the code editor that supports the plugin you are using. Thank you for your cooperation.
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
        tip: 'Your token is used for access to the CodeTime API. Keep it private. You can generate a new token here.',
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
      dangerZone: {
        title: 'Danger Zone',
        description: 'These settings will permanently affect your data and cannot be undone. Please proceed with caution.',
        button: {
          removeAllData: 'Remove All Data',
        },
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
