export interface Translation {
  annualReport: {
    userNotFound: string
    noData: string
    noDataAvailableFor: (year: number | string) => string
    annualCodeTimeReport: (year: number | string) => string
    weekendCodingTimeRatio: string
    averageDailyCodingTime: string
    busiestDayOfTheYear: string
    busiestMonthOfTheYear: string
    theMostProductiveHourOfTheYear: string
    month: string
    hour: string
    minutes: string
    theMostUsedLanguageOfTheYear: string
    totalCodingTimeOfTheYear: string
    priodOfDay: {
      morning: string
      afternoon: string
      evening: string
      midnight: string
    }
  }
  meta: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    twitterTitle: string
    twitterDescription: string
  }
  general: {
    cancel: string
    confirm: string
  }
  landing: {
    login: string
    description: string
    toDashboard: string
    alreadyStatistical: string
    minutes: string
    loginWithGithub: string
    freeMessage: string
    demo: string
    features: {
      visualization: {
        title: string
        description: string
      }
      save: {
        title: string
        description: string
      }
      export: {
        title: string
        description: string
      }
      editor: {
        title: string
        description: string
      }
    }
    pricing: {
      title: string
      description: string
    }
  }
  plan: {
    monthly: string
    yearly: string
    save25: string
    oneTime: string
    mostFlexible: string
    mostPopular: string
    bestValue: string
    modal: {
      title: string
      p1: string
      p2: string
      p3: string
    }
    status: (str: 'active' | 'cancelled' | 'expired' | 'on-trial' | 'paused' | 'past-due' | 'unpaid') => string
    basic: {
      title: string
      forever: string
      features: {
        title: string
        item: {
          saveHistory: string
          browseRecent: string
          codetimeTrend: string
          codetimeLanguaeTrend: string
          codetimeProjectTrend: string
          badge: string
          export: string
          import: string
          more: string
        }
      }
      button: string
    }
    pro: {
      title: string
      preMonth: string
      preYear: string
      features: {
        item: {
          include: string
          browseAll: string
          rule: string
          tag: string
        }
      }
      notYet: string
      button: string
    }
    needLogin: string
  }
  dashboard: {
    loginRequired: string
    projectSelector: {
      placeholder: string
      noneText: string
    }
    pageHeader: {
      userLatestEvent: (project: string) => string
      title: {
        overview: string
        badge: string
        settings: string
        leaderboard: string
        workspace: string
      }
      description: {
        overview: string
        badge: string
        settings: string
        leaderboard: string
        workspace: string
      }
    }
    overview: {
      codetimeTrendTitle: string
      codetimeLanguaeTrendTitle: string
      codetimeProjectTrendTitle: string
      dailyCodingDistributionTitle: string
      dataRange: {
        title: (days: number) => string
        allTime: string
      }
      statistic: {
        timeTotal: string
        timeToday: string
        timeAverage: string
        longestStreak: string
        currentStreak: string
      }
      top: {
        language: string
        project: string
        platform: string
      }
      noData: {
        notice: {
          title: string
          body: any
        }
      }
    }
    badge: {
      preview: {
        title: string
      }
      style: {
        flat: string
        flatSquare: string
        forTheBadge: string
        plastic: string
        social: string
      }
      placeholder: {
        style: string
        language: string
        days: string
        project: string
        color: string
      }
    }
    settings: {
      token: {
        title: string
        tip: string
        refresh: string
        refreshTip: string
        refreshToken: string
        confirmRefresh: string
        getPlugin: any
      }
      language: {
        title: string
        tip: string
      }
      export: {
        title: string
        button: string
        buttonExporting: string
        buttonSucceed: string
        buttonFailed: string
        download: string
        description: string
        tip: string
      }
      theme: {
        title: string
        tip: string
        dark: string
        light: string
        system: string
      }
      dangerZone: {
        title: string
        description: string
        subTitle: {
          removeData: string
          privacy: string
        }
        button: {
          removeAllData: string
          removeAllDataModal: {
            p1: string
            p2: string
            p3: string
          }
        }
      }
      account: {
        title: string
        description: string
        expiresIn: string
        manageSubscription: string
        subscribe: string
      }
      other: {
        title: string
        description: string
        logout: string
      }
    }
    workspace: {
      select: {
        placeholder: string
        none: string
      }
      flameGraph: {
        title: string
        noData: string
      }
      fileList: {
        title: string
      }
    }
    leaderboard: {
      title: (days: number) => string
      delta: (string: string) => string
    }
  }
  button: {
    copy: string
    copied: string
    cancel: string
    confirm: string
  }
  plot: {
    label: {
      project: string
      timeHour: string
      language: string
      date: string
      duration: string
      other: string
      unknown: string
    }
  }
}
