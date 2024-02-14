import NuxtLink from './NuxtLink.vue'
import type { I18NData } from '.'

export const zhCN: Partial<I18NData> = {
  meta: {
    title: 'CodeTime - 追迹你的编程时间',
    description: 'CodeTime 是一款专为开发者设计的应用，帮助您追踪、分析和提高您的编程时间管理技能。',
    ogTitle: 'CodeTime - 追迹你的编程时间',
    ogDescription: 'CodeTime 是一款专为开发者设计的应用，帮助您追踪、分析和提高您的编程时间管理技能。',
    twitterTitle: 'CodeTime - 追迹你的编程时间',
    twitterDescription: 'CodeTime 是一款专为开发者设计的应用，帮助您追踪、分析和提高您的编程时间管理技能。',
  },
  general: {
    cancel: '取消',
    confirm: '确认',
  },
  landing: {
    login: '登录',
    description: 'CodeTime 是一款专为开发者设计的应用，帮助您追踪、分析您的编程时间。',
    toDashboard: '前往仪表盘',
    alreadyStatistical: '已统计编程时间',
    minutes: '分钟',
    loginWithGithub: '使用 GitHub 登录',
    freeMessage: '目前完全免费，无需信用卡',
    demo: '演示',
    features: {
      visualization: {
        title: '数据可视化',
        description: '我们致力于提供最美观的现代化仪表盘，帮助您更好地了解您的编程时间。',
      },
      save: {
        title: '永久保存您的编程时间数据。',
        description: '我们知道历史数据的美好。没有什么比自己的辛勤劳动被抹去更令人沮丧的了。为了让所有用户都能够在多年之后回顾自己的成长历史，我们会永久保存您的数据，直到您主动销毁它们，即使您从未付费。',
      },
      export: {
        title: '支持数据导出。',
        description: '世界上最安全的地方就是您自己的硬盘。因此，我们支持数据导出，您可以随时退出，并连接到其他平台或自建服务。',
      },
      editor: {
        title: '支持多种编辑器。',
        description: '我们是一个非常小的团队。这意味着我们无法支持所有 IDE 或代码编辑器。但是，我们目前支持 VSCode 和 JetBrain 系列 IDE。我们相信它们涵盖了大多数用户的需求。我们将尽最大努力支持更多平台，造福更多人。',
      },
    },
    pricing: {
      title: '定价',
      description: '选择适合您的计划。',
    },
  },
  plan: {
    monthly: '月付',
    yearly: '年付',
    save25: '省 25%',
    oneTime: '一次性',
    mostFlexible: '最灵活',
    mostPopular: '最受欢迎',
    bestValue: '最超值',
    modal: {
      title: '升级订阅',
      p1: '我们需要您的支持来保持我们的开发热情，从而提供更丰富的数据报告和更好的用户体验。',
      p2: '您可以选择升级到 Pro 订阅以解锁更多功能。',
      p3: '如果您在支付过程中遇到任何问题，请通过电子邮件与我们联系。',
    },
    status(str: 'active' | 'cancelled' | 'expired' | 'on-trial' | 'paused' | 'past-due' | 'unpaid') {
      switch (str) {
        case 'active':
          return '有效'
        case 'cancelled':
          return '已取消'
        case 'expired':
          return '已过期'
        case 'on-trial':
          return '试用中'
        case 'paused':
          return '已暂停'
        case 'past-due':
          return '已逾期'
        case 'unpaid':
          return '未支付'
      }
    },
    basic: {
      title: 'Basic',
      forever: '永久',
      features: {
        title: '功能',
        item: {
          saveHistory: '永久保存历史数据',
          browseRecent: '浏览最近 90 天的数据',
          codetimeTrend: '编程时间趋势报告',
          codetimeLanguaeTrend: '编程语言趋势报告',
          codetimeProjectTrend: '项目趋势报告',
          badge: '生成展示徽章',
          export: '数据导出',
          import: '数据导入',
          more: '更多报告',
        },
      },
      button: '永久免费',
    },
    pro: {
      title: 'Pro',
      preMonth: '/ 月',
      preYear: '/ 年',
      features: {
        item: {
          include: '包含 Basic 计划的所有功能',
          browseAll: '浏览所有历史数据',
          rule: '基于规则的数据处理',
          tag: '标签系统',
        },
      },
      notYet: '表示尚未开放',
      button: '立即订阅',
    },
    needLogin: '需要登录',
  },
  dashboard: {
    loginRequired: '欢迎访问 CodeTime 仪表板！请登录以查看你的编程时间数据，或者点击下方的演示按钮体验演示仪表盘。',
    pageHeader: {
      title: {
        overview: '概览',
        badge: '徽章',
        settings: '设置',
        leaderboard: '排行榜',
      },
      description: {
        overview: '查看您的所有 CodeTime 数据。',
        badge: '在你的项目中用简明、一致、清晰的徽章展示你的编程时间。',
        settings: '管理您的 CodeTime 设置，包含外观、语言、数据等。',
        leaderboard: '查看 CodeTime 用户的排行榜。',
      },
    },
    overview: {
      codetimeTrendTitle: '编程时间趋势',
      codetimeLanguaeTrendTitle: '编程语言趋势',
      codetimeProjectTrendTitle: '项目趋势',
      dailyCodingDistributionTitle: '编程时间分布',
      dataRange: {
        title(days: number) {
          return `过去 ${days} 天`
        },
        allTime: '全部时间',
      },
      statistic: {
        timeTotal: '编程时间/总计',
        timeToday: '编程时间/今日',
        timeAverage: '编程时间/平均',
        longestStreak: '连续天数/最大',
        currentStreak: '连续天数/当前',
      },
      top: {
        language: '语言',
        project: '项目',
        platform: '平台',
      },
      noData: {
        notice: {
          title: '还没有数据',
          body: defineComponent({
            components: {
              NuxtLink,
            },
            setup() {
              return () => (
                <div class="text-sm">
                  <span class="text-surface-onlow">
                    目前，我们尚未收到您的编码时间记录。我们的应用程序依赖于代码编辑器或集成开发环境（例如 VSCode、JetBrains IDE ）的插件。为了确保正常运作，请您前往
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="text-primary-on"
                  >
                    [ 设置 ]
                  </NuxtLink>
                  <span class="text-surface-onlow">
                    页面并在您所使用的支持插件的代码编辑器中进行相应配置。感谢您的合作。
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
        title: '预览',
      },
      style: {
        flat: '扁平(Flat)',
        flatSquare: '扁平方形(Flat Square)',
        forTheBadge: 'For the Badge',
        plastic: '塑料(Plastic)',
        social: '社交(Social)',
      },
      placeholder: {
        style: '样式',
        language: '语言',
        days: '天数',
        project: '项目',
        color: '颜色',
      },
    },
    settings: {
      token: {
        title: '令牌',
        tip: '您的令牌用于 CodeTime API 的访问，请保持它的私密性。您可以在此处生成新的令牌。',
        refresh: '刷新',
        refreshTip: '如果您怀疑令牌泄露，您可以在此处生成新的令牌。',
        refreshToken: '刷新令牌',
        confirmRefresh: '您确定要刷新令牌吗？这将使您已应用于编辑器插件的令牌失效。您需要输入新的令牌。',
      },
      language: {
        title: '语言 (Language)',
        tip: '选择您的 CodeTime Web UI 的语言。',
      },
      export: {
        title: '导出',
        button: '一键导出',
        buttonExporting: '数据导出中',
        buttonSucceed: '数据导出成功',
        buttonFailed: '数据导出失败',
        download: '下载',
        description: '我们支持网站数据导出功能，以确保数据的安全备份、便捷迁移、深入分析与合规性，同时赋予您对其数据完全的控制权和透明度。',
        tip: '导出您的数据到 CSV 文件。',
      },
      theme: {
        title: '主题',
        tip: '选择您的 CodeTime Web UI 的主题。',
        dark: '暗色',
        light: '亮色',
        system: '跟随系统',
      },
      dangerZone: {
        title: '危险区域',
        description: '这些设置会永久影响你的数据，不可恢复。请谨慎操作。',
        button: {
          removeAllData: '删除所有数据',
          modal: {
            p1: '您确定要删除所有数据吗？此操作不可撤销。',
            p2: '您的数据非常重要，您可以先导出数据，再删除数据。',
            p3: '如果您要删除所有数据，请在下方输入 DELETE，然后点击确定。',
          },
        },
      },
      account: {
        title: '账户',
        description: '账户设置。',
        expiresIn: '过期时间',
        manageSubscription: '管理订阅',
        subscribe: '订阅',
      },
      other: {
        title: '其他',
        description: '其他设置。',
        logout: '登出',
      },
    },
    leaderboard: {
      title(days: number) {
        return `过去 ${days} 天编程时间排行榜`
      },
      delta(string: string) {
        return `相差 ${string}`
      },
    },
  },
  button: {
    copy: '复制',
    copied: '已复制',
  },
  plot: {
    label: {
      project: '项目',
      timeHour: '时间（小时）',
      language: '语言',
      date: '日期',
      duration: '时间',
      other: '其他',
      unknown: '未知',
    },
  },
}
