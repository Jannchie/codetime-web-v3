import type { Translation } from './type'
import NuxtLink from './NuxtLink.vue'

export const en: Translation = {
  annualReport: {
    shareMyReport: 'Share My Report',
    reviewAnnualReport: 'Review Annual Report',
    userNotFound: 'User not found.',
    noData: 'No data available.',
    noDataAvailableFor: (year: number | string) => `No data available for ${year}.`,
    annualCodeTimeReport: (year: number | string) => `Annual Code Time Report for ${year}`,
    weekendCodingTimeRatio: 'Weekend Coding Time Ratio',
    averageDailyCodingTime: 'Average Daily Coding Time',
    busiestDayOfTheYear: 'Busiest Day of the Year',
    busiestMonthOfTheYear: 'Busiest Month of the Year',
    theMostProductiveHourOfTheYear: 'The Most Productive Hour of the Year',
    month: 'Month',
    hour: 'Hour',
    minutes: 'Minutes',
    theMostUsedLanguageOfTheYear: 'The Most Used Language of the Year',
    totalCodingTimeOfTheYear: 'Total Coding Time of the Year',
    priodOfDay: {
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
      midnight: 'Midnight',
    },
  },
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
    status(str: string): string {
      switch (str) {
        case 'active': {
          return 'Active'
        }
        case 'cancelled': {
          return 'Cancelled'
        }
        case 'expired': {
          return 'Expired'
        }
        case 'on_trial': {
          return 'On Trial'
        }
        case 'paused': {
          return 'Paused'
        }
        case 'past_due': {
          return 'Past Due'
        }
        case 'unpaid': {
          return 'Unpaid'
        }
        default: {
          return 'Unknown'
        }
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
      userLatestEvent(project: string) {
        return `Working on ${project}`
      },
      title: {
        overview: 'Overview',
        badge: 'Badges',
        settings: 'Settings',
        leaderboard: 'Leaderboard',
        workspace: 'Workspace',
        tags: 'Tags',
      },
      description: {
        overview: 'View all your CodeTime data.',
        badge: 'Display your coding time in your projects with concise, consistent, and clear badges.',
        settings: 'Manage your CodeTime settings, including appearance, language, data, etc.',
        leaderboard: 'View the CodeTime leaderboard of all users.',
        workspace: 'View your workspace details.',
        tags: 'Manage tags and rules for automatic workspace categorization.',
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
        workspace: 'Workspace',
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
                  <span class="text-surface-dimmed">
                    Currently, we have not yet successfully processed your codetime data. This application relies on the plugin for your code editor or integrated development environment (such as VSCode, JetBrains IDE). Please visit the
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="text-primary-on px-2"
                  >
                    [ Settings ]
                  </NuxtLink>
                  <span class="text-surface-dimmed">
                    page and configure the necessary settings in the code editor that supports the plugin you are using. After receiving your data, we need about two minutes to process it. Thank you for your cooperation.
                  </span>
                </div>
              )
            },
          }),
        },
      },
    },
    pluginGuide: {
      title: 'Get Started with CodeTime',
      description: 'Install CodeTime plugin to automatically track your coding time',
      token: {
        title: 'Your Token',
        description: 'Copy this token and paste it into the plugin settings',
      },
      plugins: {
        title: 'Download Plugins',
      },
      vscode: {
        title: 'VSCode Family',
        description: 'Compatible with VSCode, Cursor, and Windsurf',
      },
      jetbrains: {
        title: 'JetBrains Family',
        description: 'Compatible with all JetBrains IDEs',
      },
      downloadPlugin: 'Download Plugin',
      setup: {
        title: 'Setup Instructions',
        step1: 'Download and install the plugin for your editor',
        step2: 'Open plugin settings in your editor',
        step3: 'Copy and paste your token above',
        step4: 'Start coding and data will appear in 2-3 minutes',
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
        getPlugin: defineComponent({
          components: {
            NuxtLink,
          },
          setup() {
            return () => (
              <div class="text-surface-dimmed">
                <span>
                  In order for CodeTime to work properly, you need to install our plugin and configure the token in your development environment. Currently, we support
                </span>
                <NuxtLink
                  to="https://marketplace.visualstudio.com/items?itemName=jannchie.codetime"
                  class="text-primary-on px-2 inline-flex gap-1 items-center"
                  style="baseline-source: last;"
                >
                  <i class="i-tabler-brand-vscode" />
                  <span>
                    VSCode
                  </span>
                </NuxtLink>
                <span>
                  and
                </span>
                <NuxtLink
                  to="https://plugins.jetbrains.com/plugin/25617-codetime"
                  class="text-primary-on px-2 inline-flex gap-1 items-center"
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
          removeAllDataModal: {
            p1: 'Are you sure you want to delete all your data? This operation cannot be undone.',
            p2: 'Your data is very important, you can export the data first, and then delete the data.',
            p3: 'If you want to delete all data, please enter DELETE below, and then click Confirm.',
          },
        },
        subTitle: {
          removeData: 'Remove data',
          privacy: 'Privacy',
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
    tags: {
      title: 'Tags',
      description: 'Manage tags and rules for automatic workspace categorization.',
      tagList: {
        title: 'Tag List',
        noTags: 'No tags found. Create your first tag to get started.',
        createTag: 'Create Tag',
        freeUserLimit: 'Free users can create up to',
        upgradeForMore: 'Upgrade to create more tags',
      },
      tagForm: {
        name: 'Name',
        namePlaceholder: 'Enter tag name',
        color: 'Color',
        colorPlaceholder: 'Choose a color',
        emoji: 'Emoji',
        emojiPlaceholder: 'Enter emoji (optional)',
        create: 'Create Tag',
        edit: 'Edit Tag',
        cancel: 'Cancel',
        save: 'Save',
      },
      tagRules: {
        title: 'Tag Rules',
        noRules: 'No rules found for this tag.',
        createRule: 'Create Rule',
        rule: 'Rule',
        enabled: 'Enabled',
        disabled: 'Disabled',
        delete: 'Delete',
        edit: 'Edit',
        selectTagPrompt: 'Select a tag to manage its rules',
        freeUserLimit: 'Free users can create up to',
        upgradeForMore: 'Upgrade to create more rules',
      },
      ruleForm: {
        name: 'Rule Name',
        namePlaceholder: 'Enter rule name',
        enabled: 'Enabled',
        conditions: 'Conditions',
        addCondition: 'Add Condition',
        field: 'Field',
        conditionType: 'Condition Type',
        value: 'Value',
        valuePlaceholder: 'Enter value',
        negate: 'Negate',
        create: 'Create Rule',
        edit: 'Edit Rule',
        cancel: 'Cancel',
        save: 'Save',
      },
      conditionTypes: {
        CONTAINS: 'Contains',
        EQUALS: 'Equals',
        STARTS_WITH: 'Starts with',
        ENDS_WITH: 'Ends with',
        REGEX: 'Regular expression',
        NOT_CONTAINS: 'Does not contain',
        NOT_EQUALS: 'Does not equal',
        NOT_STARTS_WITH: 'Does not start with',
        NOT_ENDS_WITH: 'Does not end with',
        NOT_REGEX: 'Does not match regex',
      },
      fields: {
        workspaceName: 'Workspace Name',
        language: 'Language',
        gitOrigin: 'Git Origin',
        gitBranch: 'Git Branch',
        platform: 'Platform',
        editor: 'Editor',
        absoluteFile: 'Absolute File Path',
        relativeFile: 'Relative File Path',
      },
      actions: {
        delete: 'Delete',
        edit: 'Edit',
        manageRules: 'Manage Rules',
        enable: 'Enable',
        disable: 'Disable',
      },
      deleteConfirm: {
        deleteTag: 'Delete Tag',
        deleteTagMessage: 'Are you sure you want to delete this tag? This action cannot be undone.',
        deleteRule: 'Delete Rule',
        deleteRuleMessage: 'Are you sure you want to delete this rule? This action cannot be undone.',
        cancel: 'Cancel',
        delete: 'Delete',
      },
      common: {
        not: 'not',
        optional: '(optional)',
        ruleRelationship: 'Rules are connected by OR logic, conditions by AND logic',
        freeUserRuleLimit: 'Free users can only create 1 rule per tag',
        upgradeForMoreRules: 'Upgrade to create more rules',
        ruleIdFormat: (id: string) => `Rule #${id.slice(-4)}`,
        editingMode: 'Editing Mode - Remember to save changes',
      },
      timeRange: {
        last7Days: 'Last 7 days',
        last30Days: 'Last 30 days',
        last90Days: 'Last 90 days',
      },
      stats: {
        title: 'Tag Statistics',
        viewAll: 'View All',
        noData: 'No tag data available',
        timeDistribution: 'Tag Coding Time Distribution',
        totalDuration: 'Total Duration',
        recordCount: 'Record Count',
        timeRange: 'Time Range',
        days: 'days',
        dailyAverage: 'Daily Average',
        timeTrend: 'Time Trend',
        noChartData: 'No chart data available',
        statisticsTitle: (tagName: string) => `${tagName} Statistics`,
      },
    },
  },
  common: {
    optional: 'optional',
  },
  button: {
    copy: 'Copy',
    copied: 'Copied',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
  plot: {
    label: {
      project: 'Project',
      timeHour: 'Time (hours)',
      language: 'Language',
      date: 'Date',
      duration: 'Duration',
      durationHours: 'Duration (hours)',
      other: 'Other',
      unknown: 'Unknown',
      currentTime: 'Current Time',
    },
  },
}
