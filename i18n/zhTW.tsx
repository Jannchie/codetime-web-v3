import type { Translation } from './type'
import NuxtLink from './NuxtLink.vue'

export const zhTW: Partial<Translation> = {
  annualReport: {
    shareMyReport: '分享我的報告',
    reviewAnnualReport: '查看年度報告',
    userNotFound: '找不到使用者。',
    noData: '暫無資料。',
    noDataAvailableFor: (year: number | string) => `${year} 年暫無資料。`,
    annualCodeTimeReport: (year: number | string) => `${year} 年年度程式碼時間報告`,
    weekendCodingTimeRatio: '週末編程時間占比',
    averageDailyCodingTime: '平均每日編程時間',
    busiestDayOfTheYear: '年度最忙碌的一天',
    busiestMonthOfTheYear: '年度最忙碌的一個月',
    theMostProductiveHourOfTheYear: '年度最高效的一小時',
    month: '月',
    hour: '小時',
    minutes: '分鐘',
    theMostUsedLanguageOfTheYear: '年度最常用語言',
    totalCodingTimeOfTheYear: '年度總編程時間',
    priodOfDay: {
      morning: '上午',
      afternoon: '下午',
      evening: '傍晚',
      midnight: '午夜',
    },
  },
  meta: {
    title: 'CodeTime - 追蹤你的程式設計時間',
    description: 'CodeTime 是一款專為開發者設計的應用，幫助您追蹤、分析和提升您的程式設計時間管理技能。',
    ogTitle: 'CodeTime - 追蹤你的程式設計時間',
    ogDescription: 'CodeTime 是一款專為開發者設計的應用，幫助您追蹤、分析和提升您的程式設計時間管理技能。',
    twitterTitle: 'CodeTime - 追蹤你的程式設計時間',
    twitterDescription: 'CodeTime 是一款專為開發者設計的應用，幫助您追蹤、分析和提升您的程式設計時間管理技能。',
  },
  general: {
    cancel: '取消',
    confirm: '確認',
  },
  landing: {
    login: '登入',
    description: 'CodeTime 是一款專為開發者設計的應用，幫助您追蹤、分析您的程式設計時間。',
    toDashboard: '前往儀表板',
    alreadyStatistical: '已統計程式設計時間',
    minutes: '分鐘',
    loginWithGithub: '使用 GitHub 登入',
    freeMessage: '目前完全免費，無需信用卡',
    demo: '演示',
    features: {
      visualization: {
        title: '數據視覺化',
        description: '我們致力於提供最美觀的現代化儀表板，幫助您更好地了解您的程式設計時間。',
      },
      save: {
        title: '永久保存您的程式設計時間數據。',
        description: '我們知道歷史數據的美好。沒有什麼比自己的辛勤勞動被抹去更令人沮喪的了。為了讓所有用戶都能夠在多年之後回顧自己的成長歷史，我們會永久保存您的數據，直到您主動銷毀它們，即使您從未付費。',
      },
      export: {
        title: '支援數據匯出。',
        description: '世界上最安全的地方就是您自己的硬碟。因此，我們支援數據匯出，您可以隨時退出，並連接到其他平台或自建服務。',
      },
      editor: {
        title: '支援多種編輯器。',
        description: '我們是一個非常小的團隊。這意味著我們無法支援所有 IDE 或程式碼編輯器。但是，我們目前支援 VSCode 和 JetBrains 系列 IDE。我們相信它們涵蓋了大多數用戶的需求。我們將盡最大努力支援更多平台，造福更多人。',
      },
    },
    pricing: {
      title: '定價',
      description: '選擇適合您的方案。',
    },
  },
  plan: {
    monthly: '月付',
    yearly: '年付',
    save25: '省 25%',
    oneTime: '一次性',
    mostFlexible: '最靈活',
    mostPopular: '最受歡迎',
    bestValue: '最超值',
    modal: {
      title: '升級訂閱',
      p1: '我們需要您的支持來保持我們的開發熱情，從而提供更豐富的數據報告和更好的使用者體驗。',
      p2: '您可以選擇升級到 Pro 訂閱以解鎖更多功能。',
      p3: '如果您在支付過程中遇到任何問題，請通過電子郵件與我們聯繫。',
    },
    status(str: 'active' | 'cancelled' | 'expired' | 'on-trial' | 'paused' | 'past-due' | 'unpaid') {
      switch (str) {
        case 'active': {
          return '有效'
        }
        case 'cancelled': {
          return '已取消'
        }
        case 'expired': {
          return '已過期'
        }
        case 'on-trial': {
          return '試用中'
        }
        case 'paused': {
          return '已暫停'
        }
        case 'past-due': {
          return '已逾期'
        }
        case 'unpaid': {
          return '未付款'
        }
      }
    },
    basic: {
      title: 'Basic',
      forever: '永久',
      features: {
        title: '功能',
        item: {
          saveHistory: '永久保存歷史數據',
          browseRecent: '瀏覽最近 90 天的數據',
          codetimeTrend: '程式設計時間趨勢報告',
          codetimeLanguaeTrend: '程式語言趨勢報告',
          codetimeProjectTrend: '專案趨勢報告',
          badge: '生成展示徽章',
          export: '數據匯出',
          import: '數據匯入',
          more: '更多報告',
        },
      },
      button: '永久免費',
    },
    pro: {
      title: 'Pro',
      preMonth: '/ 月',
      preYear: '/ 年',
      features: {
        item: {
          include: '包含 Basic 方案的所有功能',
          browseAll: '瀏覽所有歷史數據',
          rule: '基於規則的數據處理',
          tag: '標籤系統',
        },
      },
      notYet: '尚未開放',
      button: '立即訂閱',
    },
    needLogin: '需要登入',
  },
  dashboard: {
    loginRequired: '歡迎訪問 CodeTime 儀表板！請登入以查看你的程式設計時間數據，或者點擊下方的演示按鈕體驗演示儀表板。',
    projectSelector: {
      placeholder: '選擇一個工作區',
      noneText: '輸入工作區名稱',
    },
    pageHeader: {
      userLatestEvent(project: string) {
        return `正忙於「${project}」`
      },
      title: {
        overview: '概覽',
        badge: '徽章',
        settings: '設定',
        leaderboard: '排行榜',
        workspace: '工作區',
      },
      description: {
        overview: '查看您的所有 CodeTime 數據。',
        badge: '在你的專案中用簡明、一致、清晰的徽章展示你的程式設計時間。',
        settings: '管理您的 CodeTime 設定，包含外觀、語言、數據等。',
        leaderboard: '查看 CodeTime 使用者的排行榜。',
        workspace: '查看特定工作區的數據。',
      },
    },
    overview: {
      codetimeTrendTitle: '程式設計時間趨勢',
      codetimeLanguaeTrendTitle: '程式語言趨勢',
      codetimeProjectTrendTitle: '專案趨勢',
      dailyCodingDistributionTitle: '程式設計時間分佈',
      dataRange: {
        title(days: number) {
          return `過去 ${days} 天`
        },
        allTime: '所有時間',
      },
      statistic: {
        timeTotal: '程式設計時間/總計',
        timeToday: '程式設計時間/今日',
        timeAverage: '程式設計時間/平均',
        longestStreak: '連續天數/最大',
        currentStreak: '連續天數/當前',
      },
      top: {
        language: '語言',
        project: '專案',
        platform: '平台',
        workspace: '工作區',
      },
      noData: {
        notice: {
          title: '尚無資料',
          body: defineComponent({
            components: {
              NuxtLink,
            },
            setup() {
              return () => (
                <div class="text-sm">
                  <span class="text-surface-dimmed">
                    目前，我們尚未收到您的編碼時間記錄。我們的應用程式依賴於程式碼編輯器或整合開發環境（例如 VSCode、JetBrains IDE）的插件。為了確保正常運作，請您前往
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="text-primary-on"
                  >
                    [ 設定 ]
                  </NuxtLink>
                  <span class="text-surface-dimmed">
                    頁面並在您所使用的支援插件的程式碼編輯器中進行相應配置。感謝您的合作。
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
        title: '預覽',
      },
      style: {
        flat: '扁平(Flat)',
        flatSquare: '扁平方形(Flat Square)',
        forTheBadge: 'For the Badge',
        plastic: '塑膠(Plastic)',
        social: '社交(Social)',
      },
      placeholder: {
        style: '樣式',
        language: '語言',
        days: '天數',
        project: '專案',
        color: '顏色',
      },
    },
    settings: {
      token: {
        title: '令牌Token',
        tip: '您的令牌用於 CodeTime API 的存取，請保持它的私密性。您可以在此處生成新的令牌。',
        refresh: '刷新',
        refreshTip: '如果您懷疑令牌洩漏，您可以在此處生成新的令牌。',
        refreshToken: '刷新令牌',
        confirmRefresh: '您確定要刷新令牌嗎？這將使您已應用於編輯器插件的令牌失效。您需要輸入新的令牌。',
        getPlugin: defineComponent({
          components: {
            NuxtLink,
          },
          setup() {
            return () => (
              <div class="text-surface-dimmed">
                <span>
                  為了使 CodeTime 正常運作，您需要安裝我們的插件，並在開發環境中配置令牌。目前，我們支援
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
                  和
                </span>
                <NuxtLink
                  to="https://plugins.jetbrains.com/plugin/25617-codetime"
                  class="text-primary-on inline-flex items-center gap-1 px-2"
                  style="baseline-source: last;"
                >
                  <i class="i-devicon-plain-jetbrains pr-2" />
                  <span>
                    JetBrains
                  </span>
                </NuxtLink>
                。
              </div>
            )
          },
        }),
      },
      language: {
        title: '語言 (Language)',
        tip: '選擇您的 CodeTime 網頁介面的語言。',
      },
      export: {
        title: '匯出',
        button: '一鍵匯出',
        buttonExporting: '數據匯出中',
        buttonSucceed: '數據匯出成功',
        buttonFailed: '數據匯出失敗',
        download: '下載',
        description: '我們支援網站數據匯出功能，以確保數據的安全備份、便捷遷移、深入分析與合規性，同時賦予您對其數據完全的控制權和透明度。',
        tip: '匯出您的數據到 CSV 檔案。',
      },
      theme: {
        title: '主題',
        tip: '選擇您的 CodeTime 網頁介面的主題。',
        dark: '暗色',
        light: '亮色',
        system: '跟隨系統',
      },
      dangerZone: {
        title: '危險區域',
        description: '這些設定會永久影響你的數據，無法恢復。請謹慎操作。',
        button: {
          removeAllData: '刪除所有數據',
          removeAllDataModal: {
            p1: '您確定要刪除所有數據嗎？此操作不可撤銷。',
            p2: '您的數據非常重要，您可以先匯出數據，再刪除數據。',
            p3: '如果您要刪除所有數據，請在下方輸入 DELETE，然後點擊確認。',
          },
        },
        subTitle: {
          removeData: '刪除數據',
          privacy: '隱私',
        },
      },
      account: {
        title: '帳戶',
        description: '帳戶設定。',
        expiresIn: '過期時間',
        manageSubscription: '管理訂閱',
        subscribe: '訂閱',
      },
      other: {
        title: '其他',
        description: '其他設定。',
        logout: '登出',
      },
    },
    workspace: {
      select: {
        placeholder: '選擇工作區',
        none: '輸入工作區名稱',
      },
      flameGraph: {
        title: '火焰圖',
        noData: '暫無資料',
      },
      fileList: {
        title: '檔案列表',
      },
    },
    leaderboard: {
      title(days: number) {
        return `過去 ${days} 天程式設計時間排行榜`
      },
      delta(string: string) {
        return `相差 ${string}`
      },
    },
  },
  button: {
    copy: '複製',
    copied: '已複製',
    cancel: '取消',
    confirm: '確認',
  },
  plot: {
    label: {
      project: '專案',
      timeHour: '時間（小時）',
      language: '語言',
      date: '日期',
      duration: '時間',
      other: '其他',
      unknown: '未知',
    },
  },
}
