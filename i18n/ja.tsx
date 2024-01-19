import NuxtLink from './NuxtLink.vue'
import type { I18NData } from '.'

export const ja: Partial<I18NData> = {
  landing: {
    description: 'CodeTime は開発者のためのアプリケーションで、あなたのコーディング時間を追跡、分析するのを助けます。',
    toDashboard: 'ダッシュボードへ',
    alreadyStatistical: '統計済み',
    minutes: '分',
    loginWithGithub: 'GitHub でログイン',
    freeMessage: '現在完全無料、クレジットカード不要',
    demo: 'デモ',
  },
  dashboard: {
    loginRequired: 'CodeTime ダッシュボードへようこそ！\n コーディング時間のデータを閲覧するには、ログインしていただくか、下のデモボタンをクリックしてデモダッシュボードをお試しいただけます。',
    pageHeader: {
      title: {
        overview: '概観',
        badge: 'シールド',
        settings: '設定',
        leaderboard: 'リーダーボード',
      },
      description: {
        overview: 'すべての CodeTime データを見る。',
        badge: 'あなたのプロジェクトでスマート、統一感のある、明瞭なシールドで CodeTime を表示。',
        settings: 'CodeTime の設定を管理する、外観、言語、データ等を含む。',
        leaderboard: 'CodeTime ユーザーのリーダーボードを見る。',
      },
    },
    overview: {
      codetimeTrendTitle: 'コーディング時間のトレンド',
      codetimeLanguaeTrendTitle: 'コーディング言語のトレンド',
      codetimeProjectTrendTitle: 'プロジェクトのトレンド',
      dataRange: {
        title(days: number) {
          return `${days} 日間`
        },
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
                  <span class="text-surface-onlow">
                    現在、あなたのコーディング時間の記録を受け取っていません。このアプリケーションは、コードエディタまたは統合開発環境（ VSCode、JetBrains IDEなど ）のプラグインに依存しています。正常に動作するようにするには、
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="px-2 text-primary-container"
                  >
                    [ 設定 ]
                  </NuxtLink>
                  <span class="text-surface-onlow">
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
        title: '危険地帯',
        description: 'これらの設定はあなたのデータに永続的な影響を与え、また、回復不可能です。注意して操作してください。',
        button: {
          removeAllData: 'すべてのデータを削除',
        },
      },
      other: {
        title: 'その他',
        description: 'その他の設定。',
        logout: 'ログアウト',
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
