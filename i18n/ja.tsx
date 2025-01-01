import type { Translation } from './type'
import NuxtLink from './NuxtLink.vue'

export const ja: Partial<Translation> = {
  annualReport: {
    userNotFound: 'ユーザーが見つかりません。',
    noData: 'データがありません。',
    noDataAvailableFor: (year: number | string) => `${year} 年のデータはありません。`,
    annualCodeTimeReport: (year: number | string) => `${year} 年の年間コーディング時間レポート`,
    weekendCodingTimeRatio: '週末のコーディング時間比率',
    averageDailyCodingTime: '1日あたりの平均コーディング時間',
    busiestDayOfTheYear: '年間で最も忙しい日',
    busiestMonthOfTheYear: '年間で最も忙しい月',
    theMostProductiveHourOfTheYear: '年間で最も生産性の高い時間',
    month: '月',
    hour: '時間',
    minutes: '分',
    theMostUsedLanguageOfTheYear: '年間で最も使用された言語',
    totalCodingTimeOfTheYear: '年間の合計コーディング時間',
    priodOfDay: {
      morning: '午前',
      afternoon: '午後',
      evening: '夕方',
      midnight: '深夜',
    },
  },
  meta: {
    title: 'CodeTime - コーディング時間を追跡',
    description: 'CodeTime は開発者にぴったりのアプリで、コーディングにかけた時間を正確に記録し、深い洞察を得るのに役立ちます。',
    ogTitle: 'CodeTime - コーディング時間を追跡',
    ogDescription: 'CodeTime は開発者にぴったりのアプリで、コーディングにかけた時間を正確に記録し、深い洞察を得るのに役立ちます。',
    twitterTitle: 'CodeTime - コーディング時間を追跡',
    twitterDescription: 'CodeTime は開発者にぴったりのアプリで、コーディングにかけた時間を正確に記録し、深い洞察を得るのに役立ちます。',
  },
  general: {
    cancel: 'キャンセル',
    confirm: '確認',
  },
  landing: {
    login: 'ログイン',
    description: 'CodeTime は開発者にぴったりのアプリで、コーディングにかけた時間を正確に記録し、深い洞察を得るのに役立ちます。',
    toDashboard: 'ダッシュボードへ',
    alreadyStatistical: '統計済み',
    minutes: '分',
    loginWithGithub: 'GitHub でログイン',
    freeMessage: '現在完全無料、クレジットカード不要',
    demo: 'デモ',
    features: {
      visualization: {
        title: 'データ可視化',
        description: 'コーディング時間をより良く理解するために、最も美しいモダンなダッシュボードを提供することに専念しています。',
      },
      save: {
        title: 'コーディング時間のデータを永久に保存。',
        description: '歴史的データの美しさを深く理解し、尽力が無駄になることの悔しさを知っています。年月が経過しても、ユーザーが成長の軌跡を振り返れるよう、データは永遠に保存されます。意図的な削除がない限り、保護は続き、費用が発生しなくても変わりません。',
      },
      export: {
        title: 'データのエクスポートをサポート。',
        description: '世界で最も安全な場所は、あなた自身のハードドライブです。そのため、データのエクスポートをサポートしています。いつでもやめることができます。他のプラットフォームや自己構築サービスに接続します。',
      },
      editor: {
        title: '複数のエディタをサポート。',
        description: '小規模なチームであり、すべてのIDEやコードエディタのサポートは不可能です。しかし、現在はVSCodeとJetBrainsシリーズのIDEに対応しており、これにより多くのユーザーの要望に応えていると考えています。さらに多くのプラットフォームへの対応を目指し、より広範な利用者に利益を提供するために努力しています。',
      },
    },
    pricing: {
      title: '価格',
      description: 'あなたに合ったプランを選択してください。',
    },
  },
  plan: {
    monthly: '月額',
    yearly: '年額',
    save25: '25% オフ',
    oneTime: '一度きり',
    mostFlexible: '最も柔軟',
    mostPopular: '最も人気',
    bestValue: '最高の価値',
    modal: {
      title: 'アップグレード',
      p1: '私たちは、開発の情熱を維持し、より豊富なデータレポートとより良いユーザーエクスペリエンスを提供するために、あなたのサポートが必要です。',
      p2: 'あなたは Pro サブスクリプションにアップグレードして、より多くの機能をアンロックすることができます。',
      p3: '支払いプロセスで問題が発生した場合は、メールでお問い合わせください。',
    },
    status(str: 'active' | 'cancelled' | 'expired' | 'on-trial' | 'paused' | 'past-due' | 'unpaid') {
      switch (str) {
        case 'active':
          return '有効'
        case 'cancelled':
          return 'キャンセル済み'
        case 'expired':
          return '期限切れ'
        case 'on-trial':
          return 'トライアル中'
        case 'paused':
          return '一時停止'
        case 'past-due':
          return '期限切れ'
        case 'unpaid':
          return '未払い'
      }
    },
    basic: {
      title: '基本',
      forever: '永久',
      features: {
        title: '機能',
        item: {
          saveHistory: '永久に履歴データを保存',
          browseRecent: '過去 90 日間のデータを閲覧',
          codetimeTrend: 'コーディング時間のトレンドレポート',
          codetimeLanguaeTrend: 'コーディング言語のトレンドレポート',
          codetimeProjectTrend: 'プロジェクトのトレンドレポート',
          badge: 'バッジを生成して表示',
          export: 'データのエクスポート',
          import: 'データのインポート',
          more: 'その他のレポート',
        },
      },
      button: '永久に無料',
    },
    pro: {
      title: 'Pro',
      preMonth: '/ 月',
      preYear: '/ 年',
      features: {
        item: {
          include: '基本プランのすべての機能を含む',
          browseAll: 'すべての履歴データを閲覧',
          rule: 'ルールベースのデータ処理',
          tag: 'タグシステム',
        },
      },
      notYet: 'まだ利用できません',
      button: '今すぐ購読',
    },
    needLogin: 'ログインが必要です',
  },
  dashboard: {
    loginRequired: 'CodeTime ダッシュボードへようこそ！\n コーディング時間のデータを閲覧するには、ログインしていただくか、下のデモボタンをクリックしてデモダッシュボードをお試しいただけます。',
    projectSelector: {
      placeholder: 'ワークスペースを選択',
      noneText: 'ワークスペース名を入力',
    },
    pageHeader: {
      userLatestEvent(project: string) {
        return `「${project}」で作業中`
      },
      title: {
        overview: '概観',
        badge: 'シールド',
        settings: '設定',
        leaderboard: 'リーダーボード',
        workspace: 'ワークスペース',
      },
      description: {
        overview: 'すべての CodeTime データを見る。',
        badge: 'あなたのプロジェクトでスマート、統一感のある、明瞭なシールドで CodeTime を表示。',
        settings: 'CodeTime の設定を管理する、外観、言語、データ等を含む。',
        leaderboard: 'CodeTime ユーザーのリーダーボードを見る。',
        workspace: 'ワークスペースのデータを見る。',
      },
    },
    overview: {
      codetimeTrendTitle: 'コーディング時間のトレンド',
      codetimeLanguaeTrendTitle: 'コーディング言語のトレンド',
      codetimeProjectTrendTitle: 'プロジェクトのトレンド',
      dailyCodingDistributionTitle: 'コーディング時間の分布',
      dataRange: {
        title(days: number) {
          return `${days} 日間`
        },
        allTime: 'すべての時間',
      },
      statistic: {
        timeTotal: 'コーディング時間/合計',
        timeToday: 'コーディング時間/今日',
        timeAverage: 'コーディング時間/平均',
        longestStreak: '連続日数/最大',
        currentStreak: '連続日数/現在',
      },
      top: {
        language: '言語',
        project: 'プロジェクト',
        platform: 'プラットフォーム',
      },
      noData: {
        notice: {
          title: 'まだデータがありません',
          body: defineComponent({
            components: {
              NuxtLink,
            },
            setup() {
              return () => (
                <div class="text-sm">
                  <span class="text-surface-dimmed">
                    現在、あなたのコーディング時間の記録を受け取っていません。このアプリケーションは、コードエディタまたは統合開発環境（ VSCode、JetBrains IDEなど ）のプラグインに依存しています。正常に動作するようにするには、
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="text-primary-on px-2"
                  >
                    [ 設定 ]
                  </NuxtLink>
                  <span class="text-surface-dimmed">
                    ページに移動し、使用しているプラグインをサポートするコードエディタで対応する設定を行ってください。ご協力ありがとうございます。
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
        title: 'プレビュー',
      },
      style: {
        flat: 'フラット(Flat)',
        flatSquare: 'フラットスクエア(Flat Square)',
        forTheBadge: 'フォーバッジ(For The Badge)',
        plastic: 'プラスチック(Plastic)',
        social: 'ソーシャル(Social)',
      },
      placeholder: {
        style: 'スタイル',
        language: '言語',
        days: '日数',
        project: 'プロジェクト',
        color: '色',
      },
    },
    settings: {
      token: {
        title: 'トークン',
        tip: 'あなたのトークンは CodeTime API へのアクセスに使用されるので、それを秘密に保ってください。ここで新しいトークンを生成できます。',
        refresh: '更新',
        refreshTip: 'トークンが漏洩したと疑われる場合は、ここで新しいトークンを生成できます。',
        refreshToken: 'トークンを更新',
        confirmRefresh: 'トークンを更新してもよろしいですか？これにより、エディタプラグインに適用したトークンが無効になります。新しいトークンを入力する必要があります。',
        getPlugin: defineComponent({
          components: {
            NuxtLink,
          },
          setup() {
            return () => (
              <div class="text-surface-dimmed">
                <span>
                  CodeTime の正常な動作のためには、プラグインをインストールして開発環境でトークンを設定する必要があります。現在、
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
                  と
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
                がサポートされています。
              </div>
            )
          },
        }),
      },
      language: {
        title: '言語 (Language)',
        tip: 'CodeTime Web UI の言語を選択します。',
      },
      export: {
        title: 'エクスポート',
        button: 'ワンクリックエクスポート',
        buttonExporting: 'エクスポート中',
        buttonSucceed: 'エクスポート成功',
        buttonFailed: 'エクスポート失敗',
        download: 'ダウンロード',
        description: 'データの安全なバックアップ、便利な移行、深い分析とコンプライアンスを確保するためのデータのエクスポート機能をサポートしています。また、データの完全なコントロールと透明性を提供します。',
        tip: 'あなたのデータを CSV ファイルにエクスポート。',
      },
      theme: {
        title: 'テーマ',
        tip: 'CodeTime Web UI のテーマを選択してください。',
        dark: 'ダーク',
        light: 'ライト',
        system: 'システム',
      },
      dangerZone: {
        title: '危険ゾーン',
        description: 'これらの設定はあなたのデータに永続的な影響を与え、また、回復不可能です。注意して操作してください。',
        button: {
          removeAllData: 'すべてのデータを削除する',
          removeAllDataModal: {
            p1: 'すべてのデータを削除してもよろしいですか？この操作は元に戻すことはできません。',
            p2: 'あなたのデータはとても重要です。データをエクスポートしてから、データを削除してください。',
            p3: 'すべてのデータを削除する場合は、以下に DELETE を入力し、確認をクリックしてください。',
          },
        },
        subTitle: {
          removeData: 'データを削除',
          privacy: 'プライバシー',
        },
      },
      account: {
        title: 'アカウント',
        description: 'アカウントの設定。',
        expiresIn: '有効期限',
        manageSubscription: 'サブスクリプションを管理',
        subscribe: '購読',
      },
      other: {
        title: 'その他',
        description: 'その他の設定。',
        logout: 'ログアウト',
      },
    },
    workspace: {
      select: {
        placeholder: 'ワークスペースを選択',
        none: 'ワークスペース名を入力',
      },
      flameGraph: {
        title: 'フレームグラフ',
        noData: 'データがありません',
      },
      fileList: {
        title: 'ファイルリスト',
      },
    },
    leaderboard: {
      title(days: number) {
        return `${days} 日間のコーディング時間リーダーボード`
      },
      delta(string: string) {
        return `差：${string}`
      },
    },
  },
  button: {
    copy: 'コピー',
    copied: 'コピー済み',
    cancel: 'キャンセル',
    confirm: '確認',
  },
  plot: {
    label: {
      project: 'プロジェクト',
      timeHour: '時間',
      language: '言語',
      date: '日付',
      duration: '時間',
      other: 'その他',
      unknown: '不明',
    },
  },
}
