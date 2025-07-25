import type { Translation } from './type'
import NuxtLink from './NuxtLink.vue'

export const ua: Partial<Translation> = {
  annualReport: {
    shareMyReport: 'Поділитися моїм звітом',
    reviewAnnualReport: 'Перегляд річного звіту',
    userNotFound: 'Користувач не знайдений.',
    noData: 'Дані відсутні.',
    noDataAvailableFor: (year: number | string) => `Дані за ${year} рік відсутні.`,
    annualCodeTimeReport: (year: number | string) => `Річний звіт про час кодування за ${year} рік`,
    weekendCodingTimeRatio: 'Співвідношення часу кодування у вихідні дні',
    averageDailyCodingTime: 'Середній щоденний час кодування',
    busiestDayOfTheYear: 'Найбільш завантажений день року',
    busiestMonthOfTheYear: 'Найбільш завантажений місяць року',
    theMostProductiveHourOfTheYear: 'Найбільш продуктивна година року',
    month: 'Місяць',
    hour: 'Година',
    minutes: 'Хвилини',
    theMostUsedLanguageOfTheYear: 'Найбільш використовувана мова року',
    totalCodingTimeOfTheYear: 'Загальний час кодування за рік',
    priodOfDay: {
      morning: 'Ранок',
      afternoon: 'День',
      evening: 'Вечір',
      midnight: 'Північ',
    },
  },
  meta: {
    title: 'CodeTime - Відстежуйте свій час програмування',
    description:
      'CodeTime - це програма, призначена для розробників, яка допоможе вам відстежувати, аналізувати та покращувати свої навички управління часом програмування.',
    ogTitle: 'CodeTime - Відстежуйте свій час програмування',
    ogDescription:
      'CodeTime - це програма, призначена для розробників, яка допоможе вам відстежувати, аналізувати та покращувати свої навички управління часом програмування.',
    twitterTitle: 'CodeTime - Відстежуйте свій час програмування',
    twitterDescription:
      'CodeTime - це програма, призначена для розробників, яка допоможе вам відстежувати, аналізувати та покращувати свої навички управління часом програмування.',
  },
  general: {
    cancel: 'Скасувати',
    confirm: 'Підтвердити',
  },
  landing: {
    login: 'Увійти',
    description:
      'CodeTime - це програма, призначена для розробників, яка допоможе вам відстежувати та аналізувати свій час програмування.',
    toDashboard: 'Перейти до панелі інструментів',
    alreadyStatistical: 'Час програмування вже відстежується',
    minutes: 'хвилин',
    loginWithGithub: 'Увійти за допомогою GitHub',
    freeMessage: 'Наразі повністю безкоштовно, кредитна картка не потрібна',
    demo: 'Демо',
    features: {
      visualization: {
        title: 'Візуалізація даних',
        description:
          'Ми прагнемо надати найбільш привабливу сучасну панель інструментів, щоб допомогти вам краще розуміти ваш час програмування.',
      },
      save: {
        title: 'Зберігайте ваші дані про час програмування назавжди.',
        description:
          'Ми знаємо цінність історії. Ніщо так не засмучує, як втратити свою працю. Щоб усі користувачі могли переглядати свою історію прогресу навіть через багато років, ми зберігатимемо ваші дані завжди, поки ви не видалите їх самостійно, навіть якщо ви ніколи не платили.',
      },
      export: {
        title: 'Підтримка експорту даних.',
        description:
          'Найбезпечніше місце у світі - це ваш власний жорсткий диск. Тому ми підтримуємо експорт даних, ви можете вийти в будь-який час і підключитися до інших платформ або власних сервісів.',
      },
      editor: {
        title: 'Підтримка декількох редакторів.',
        description:
          'Ми - дуже мала команда. Це означає, що ми не можемо підтримувати всі IDE або редактори коду. Однак наразі ми підтримуємо IDE VSCode та JetBrain. Ми вважаємо, що вони охоплюють більшість потреб користувачів. Ми зробимо все можливе, щоб підтримати більше платформ і забезпечити користь для більшої кількості людей.',
      },
    },
    pricing: {
      title: 'Ціни',
      description: 'Виберіть план, який підходить вам.',
    },
  },
  plan: {
    monthly: 'Щомісячний',
    yearly: 'Щорічний',
    save25: 'Знижка 25%',
    oneTime: 'Одноразова',
    mostFlexible: 'Найбільш гнучкий',
    mostPopular: 'Найбільш популярний',
    bestValue: 'Найкраща ціна',
    modal: {
      title: 'Оновити підписку',
      p1: 'Ми потребуємо вашої підтримки, щоб зберегти наш ентузіазм до розробки та забезпечити більш якісне обслуговування користувачів з більш повними звітами даних.',
      p2: 'Ви можете обрати підписку Pro, щоб розблокувати більше можливостей.',
      p3: 'Якщо ви зіткнетеся з якими-небудь проблемами під час оплати, будь ласка, зв\'яжіться з нами по електронній пошті.',
    },
    status(
      str: string,
    ): string {
      switch (str) {
        case 'active': {
          return 'Активний'
        }
        case 'cancelled': {
          return 'Скасовано'
        }
        case 'expired': {
          return 'Термін дії закінчився'
        }
        case 'on-trial': {
          return 'Пробний період'
        }
        case 'paused': {
          return 'Призупинено'
        }
        case 'past-due': {
          return 'Закінчився термін дії'
        }
        case 'unpaid': {
          return 'Неоплачений'
        }
        default: {
          return 'Невідомий'
        }
      }
    },
    basic: {
      title: 'Базовий',
      forever: 'Назавжди',
      features: {
        title: 'Особливості',
        item: {
          saveHistory: 'Збережіть історію назавжди',
          browseRecent: 'Перегляньте дані за останні 90 днів',
          codetimeTrend: 'Звіт про тенденцію часу програмування',
          codetimeLanguaeTrend: 'Звіт про тенденцію мов програмування',
          codetimeProjectTrend: 'Звіт про тенденцію проектів',
          badge: 'Створіть значки для відображення',
          export: 'Експорт даних',
          import: 'Імпорт даних',
          more: 'Інші звіти',
        },
      },
      button: 'Безкоштовно назавжди',
    },
    pro: {
      title: 'Професійний',
      preMonth: '/ місяць',
      preYear: '/ рік',
      features: {
        item: {
          include: 'Включає всі функції базового плану',
          browseAll: 'Перегляд усієї історії даних',
          rule: 'Обробка даних на основі правил',
          tag: 'Система тегів',
        },
      },
      notYet: 'Ще не доступно',
      button: 'Підписатися зараз',
    },
    needLogin: 'Потрібно увійти у систему',
  },
  dashboard: {
    loginRequired:
      'Ласкаво просимо до панелі інструментів CodeTime! Будь ласка, увійдіть, щоб переглянути дані часу програмування або натисніть кнопку демо нижче, щоб використати демо-панель інструментів.',
    projectSelector: {
      placeholder: 'Оберіть робочий простір',
      noneText: 'Введіть назву робочого простору',
    },
    pageHeader: {
      userLatestEvent(project: string) {
        return `Працюємо над проектом «${project}»`
      },
      title: {
        overview: 'Огляд',
        badge: 'Значки',
        settings: 'Налаштування',
        leaderboard: 'Таблиця лідерів',
        workspace: 'Робочий простір',
        tags: 'Tags',
      },
      description: {
        overview: 'Перегляд усіх даних CodeTime.',
        badge:
          'Відображайте час програмування у ваших проектах за допомогою зрозумілих, послідовних та чітких значків.',
        settings:
          'Керуйте налаштуваннями CodeTime, включаючи вигляд, мову, дані тощо.',
        leaderboard: 'Перегляньте таблицю лідерів CodeTime.',
        workspace: 'Перегляньте дані конкретного робочого простору.',
        tags: 'Manage tags and rules for automatic workspace categorization.',
      },
    },
    overview: {
      codetimeTrendTitle: 'Тенденція часу програмування',
      codetimeLanguaeTrendTitle: 'Тенденція мов програмування',
      codetimeProjectTrendTitle: 'Тенденція проектів',
      dailyCodingDistributionTitle: 'Розподіл часу кодування',
      dataRange: {
        title(days: number) {
          return `Останні ${days} днів`
        },
        allTime: 'За весь час',
      },
      statistic: {
        timeTotal: 'Всього',
        timeToday: 'Сьогодні',
        timeAverage: 'Середній',
        longestStreak: 'Найбільша серія',
        currentStreak: 'Поточна серія',
      },
      top: {
        language: 'Мова',
        project: 'Проект',
        platform: 'Платформа',
        workspace: 'Робочий простір',
      },
      noData: {
        notice: {
          title: 'Ще немає даних',
          body: defineComponent({
            components: {
              NuxtLink,
            },
            setup() {
              return () => (
                <div class="text-sm">
                  <span class="text-surface-dimmed">
                    Наразі ми ще не обробили успішно ваші дані часу
                    программування. Ця програма підтримується плагіном вашого
                    редактора коду або IDE (наприклад, VSCode, JetBrains IDE).
                    Відвідайте сторінку
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="text-primary-on px-2"
                  >
                    [ Налаштування ]
                  </NuxtLink>
                  <span class="text-surface-dimmed">
                    {' '}
                    і конфігуруйте необхідні параметри в редакторі коду, який
                    підтримує плагін, який ви використовуєте. Після отримання
                    даних нам потрібно кілька хвилин для їх обробки. Дякуємо за
                    співпрацю.
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
        title: 'Попередній перегляд',
      },
      style: {
        flat: 'Плоский',
        flatSquare: 'Плаский квадрат',
        forTheBadge: 'Для значка',
        plastic: 'Пластик',
        social: 'Соціальний',
      },
      placeholder: {
        style: 'Стиль',
        language: 'Мова',
        days: 'Дні',
        project: 'Проект',
        color: 'Колір',
      },
    },
    settings: {
      token: {
        title: 'Токен',
        tip: 'Ваш токен використовується для доступу до API CodeTime. Зберігайте його в таємниці.',
        refresh: 'Оновити',
        refreshTip:
          'Якщо ви підозрюєте, що ваш токен став відомий, ви можете згенерувати новий токен тут.',
        refreshToken: 'Оновити токен',
        confirmRefresh:
          'Ви впевнені, що хочете оновити токен? Це призведе до недійсності токена, який ви застосували до плагіна редактора. Вам потрібно буде ввести новий токен.',
        getPlugin: defineComponent({
          components: {
            NuxtLink,
          },
          setup() {
            return () => (
              <div class="text-surface-dimmed">
                <span>
                  Для правильної роботи CodeTime вам потрібно встановити наш плагін і налаштувати токен у вашому середовищі розробки. Наразі ми підтримуємо
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
                  та
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
        title: 'Мова',
        tip: 'Оберіть мову для вашого веб-інтерфейсу CodeTime.',
      },
      export: {
        title: 'Експорт',
        button: 'Експорт одним кліком',
        buttonExporting: 'Експорт...',
        buttonSucceed: 'Експорт успішно',
        buttonFailed: 'Експорт не вдалося',
        download: 'Завантажити',
        description:
          'Ми підтримуємо експорт даних веб-сайту, щоб забезпечити надійне резервне копіювання, зручну міграцію, глибокий аналіз і відповідність вимогам, а також повний контроль і прозорість ваших даних.',
        tip: 'Експорт даних у файл CSV.',
      },
      theme: {
        title: 'Тема',
        tip: 'Виберіть тему для вашого веб-інтерфейсу CodeTime.',
        dark: 'Темна',
        light: 'Світла',
        system: 'Системна',
      },
      dangerZone: {
        title: 'Небезпечна зона',
        description: 'Ці налаштування назавжди вплинуть на ваші дані і не можуть бути скасовані. Будь ласка, дійте обережно.',
        button: {
          removeAllData: 'Видалити всі дані',
          removeAllDataModal: {
            p1: 'Ви дійсно хочете видалити всі ваші дані? Ця операція не може бути скасована.',
            p2: 'Ваші дані дуже важливі. Ви можете спочатку експортувати дані, а потім видалити їх.',
            p3: 'Якщо ви хочете видалити всі дані, введіть DELETE нижче, а потім натисніть кнопку Підтвердити.',
          },
        },
        subTitle: {
          removeData: 'Видалити всі дані',
          privacy: 'Політика конфіденційності',
        },
      },
      account: {
        title: 'Обліковий запис',
        description: 'Налаштування облікового запису.',
        expiresIn: 'Термін дії закінчується',
        manageSubscription: 'Керуйте підпискою',
        subscribe: 'Підписатися',
      },
      other: {
        title: 'Інше',
        description: 'Інші налаштування.',
        logout: 'Вийти',
      },
    },
    workspace: {
      select: {
        placeholder: 'Оберіть робочий простір',
        none: 'Введіть назву робочого простору',
      },
      flameGraph: {
        title: 'Графік пламенів',
        noData: 'Немає даних',
      },
      fileList: {
        title: 'Список файлів',
      },
    },
    leaderboard: {
      title(days: number) {
        return `Рейтинг часу кодування за останні ${days} днів`
      },
      delta(string: string) {
        return `${string} позаду`
      },
    },
    tags: {
      title: 'Теги',
      description: 'Управляйте тегами та правилами для автоматичної категоризації робочих просторів.',
      tagList: {
        title: 'Список тегів',
        noTags: 'Теги не знайдено. Створіть свій перший тег для початку.',
        createTag: 'Створити тег',
      },
      tagForm: {
        name: 'Назва',
        namePlaceholder: 'Введіть назву тегу',
        color: 'Колір',
        colorPlaceholder: 'Оберіть колір',
        create: 'Створити тег',
        edit: 'Редагувати тег',
        cancel: 'Скасувати',
        save: 'Зберегти',
      },
      tagRules: {
        title: 'Правила тегів',
        noRules: 'Правила для цього тегу не знайдено.',
        createRule: 'Створити правило',
        rule: 'Правило',
        enabled: 'Увімкнено',
        disabled: 'Вимкнено',
        delete: 'Видалити',
        edit: 'Редагувати',
        selectTagPrompt: 'Оберіть тег для управління його правилами',
      },
      ruleForm: {
        name: 'Назва правила',
        namePlaceholder: 'Введіть назву правила',
        enabled: 'Увімкнено',
        conditions: 'Умови',
        addCondition: 'Додати умову',
        field: 'Поле',
        conditionType: 'Тип умови',
        value: 'Значення',
        valuePlaceholder: 'Введіть значення',
        negate: 'Заперечення',
        create: 'Створити правило',
        edit: 'Редагувати правило',
        cancel: 'Скасувати',
        save: 'Зберегти',
      },
      conditionTypes: {
        CONTAINS: 'Містить',
        EQUALS: 'Дорівнює',
        STARTS_WITH: 'Починається з',
        ENDS_WITH: 'Закінчується на',
        REGEX: 'Регулярний вираз',
      },
      fields: {
        workspaceName: 'Назва робочого простору',
        language: 'Мова',
        gitOrigin: 'Git Origin',
        gitBranch: 'Git Branch',
        platform: 'Платформа',
        editor: 'Редактор',
        absoluteFile: 'Абсолютний шлях до файлу',
        relativeFile: 'Відносний шлях до файлу',
      },
      actions: {
        delete: 'Видалити',
        edit: 'Редагувати',
        manageRules: 'Керувати правилами',
        enable: 'Увімкнути',
        disable: 'Вимкнути',
      },
      deleteConfirm: {
        deleteTag: 'Видалити тег',
        deleteTagMessage: 'Ви впевнені, що хочете видалити цей тег? Цю дію неможливо скасувати.',
        deleteRule: 'Видалити правило',
        deleteRuleMessage: 'Ви впевнені, що хочете видалити це правило? Цю дію неможливо скасувати.',
        cancel: 'Скасувати',
        delete: 'Видалити',
      },
    },
  },
  button: {
    copy: 'Копіювати',
    copied: 'Скопійовано',
    cancel: 'Скасувати',
    confirm: 'Підтвердити',
  },
  plot: {
    label: {
      project: 'Проект',
      timeHour: 'Час (години)',
      language: 'Мова',
      date: 'Дата',
      duration: 'Тривалість',
      other: 'Інше',
      unknown: 'Невідомо',
      currentTime: 'Поточний час',
    },
  },
}
