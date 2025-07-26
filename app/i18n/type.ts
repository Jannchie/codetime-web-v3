export type Translation = {
  annualReport: {
    shareMyReport: string
    reviewAnnualReport: string
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
    status: (str: string) => string
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
        tags: string
      }
      description: {
        overview: string
        badge: string
        settings: string
        leaderboard: string
        workspace: string
        tags: string
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
        workspace: string
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
    tags: {
      title: string
      description: string
      tagList: {
        title: string
        noTags: string
        createTag: string
        freeUserLimit: string
        upgradeForMore: string
      }
      tagForm: {
        name: string
        namePlaceholder: string
        color: string
        colorPlaceholder: string
        create: string
        edit: string
        cancel: string
        save: string
      }
      tagRules: {
        title: string
        noRules: string
        createRule: string
        rule: string
        enabled: string
        disabled: string
        delete: string
        edit: string
        selectTagPrompt: string
        freeUserLimit: string
        upgradeForMore: string
      }
      ruleForm: {
        name: string
        namePlaceholder: string
        enabled: string
        conditions: string
        addCondition: string
        field: string
        conditionType: string
        value: string
        valuePlaceholder: string
        negate: string
        create: string
        edit: string
        cancel: string
        save: string
      }
      conditionTypes: {
        CONTAINS: string
        EQUALS: string
        STARTS_WITH: string
        ENDS_WITH: string
        REGEX: string
      }
      fields: {
        workspaceName: string
        language: string
        gitOrigin: string
        gitBranch: string
        platform: string
        editor: string
        absoluteFile: string
        relativeFile: string
      }
      actions: {
        delete: string
        edit: string
        manageRules: string
        enable: string
        disable: string
      }
      deleteConfirm: {
        deleteTag: string
        deleteTagMessage: string
        deleteRule: string
        deleteRuleMessage: string
        cancel: string
        delete: string
      }
      common: {
        not: string
        optional: string
        ruleRelationship: string
        freeUserRuleLimit: string
        upgradeForMoreRules: string
        ruleIdFormat: (id: string) => string
        conditionGroup: string
        editingMode: string
      }
      timeRange: {
        last7Days: string
        last30Days: string
        last90Days: string
      }
      stats: {
        title: string
        viewAll: string
        noData: string
        timeDistribution: string
        totalDuration: string
        recordCount: string
        timeRange: string
        days: string
        dailyAverage: string
        timeTrend: string
        noChartData: string
        statisticsTitle: (tagName: string) => string
      }
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
      durationHours: string
      other: string
      unknown: string
      currentTime: string
    }
  }
}
