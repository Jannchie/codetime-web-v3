import type { Translation } from './type'
import NuxtLink from './NuxtLink.vue'

export const ru: Partial<Translation> = {
  meta: {
    title: 'CodeTime - Отслеживайте свое время программирования',
    description:
      'CodeTime - это приложение, разработанное для разработчиков, чтобы помочь вам отслеживать, анализировать и улучшать свои навыки управления временем программирования.',
    ogTitle: 'CodeTime - Отслеживайте свое время программирования',
    ogDescription:
      'CodeTime - это приложение, разработанное для разработчиков, чтобы помочь вам отслеживать, анализировать и улучшать свои навыки управления временем программирования.',
    twitterTitle: 'CodeTime - Отслеживайте свое время программирования',
    twitterDescription:
      'CodeTime - это приложение, разработанное для разработчиков, чтобы помочь вам отслеживать, анализировать и улучшать свои навыки управления временем программирования.',
  },
  general: {
    cancel: 'Отменить',
    confirm: 'Подтвердить',
  },
  landing: {
    login: 'Войти',
    description:
      'CodeTime - это приложение, разработанное для разработчиков, чтобы помочь вам отслеживать и анализировать свое время программирования.',
    toDashboard: 'Перейти к панели инструментов',
    alreadyStatistical: 'Время программирования уже отслеживается',
    minutes: 'минут',
    loginWithGithub: 'Войти с помощью GitHub',
    freeMessage:
      'В настоящее время полностью бесплатно, кредитная карта не требуется',
    demo: 'Демо',
    features: {
      visualization: {
        title: 'Визуализация данных',
        description:
          'Мы стремимся предоставить наиболее красивую современную панель инструментов, чтобы помочь вам лучше понять свое время программирования.',
      },
      save: {
        title: 'Сохраняйте свои данные о времени программирования навсегда.',
        description:
          'Мы знаем ценность истории. Ничто так не расстраивает, как потерять свои труды. Чтобы все пользователи могли просматривать свою историю прогресса даже спустя много лет, мы будем хранить ваши данные всегда, пока вы не удалите их самостоятельно, даже если вы никогда не платили.',
      },
      export: {
        title: 'Поддержка экспорта данных.',
        description:
          'Самое безопасное место в мире - ваш собственный жесткий диск. Поэтому мы поддерживаем экспорт данных: вы можете выйти в любое время и подключиться к другим платформам или собственным сервисам.',
      },
      editor: {
        title: 'Поддержка нескольких редакторов.',
        description:
          'Мы очень маленькая команда. Это означает, что мы не можем поддерживать все IDE или редакторы кода. Однако в настоящее время мы поддерживаем IDE VSCode и JetBrain. Мы считаем, что они покрывают большинство потребностей пользователей. Мы постараемся поддерживать больше платформ и принести пользу большему числу людей.',
      },
    },
    pricing: {
      title: 'Цены',
      description: 'Выберите план, который подходит вам.',
    },
  },
  plan: {
    monthly: 'Ежемесячно',
    yearly: 'Ежегодно',
    save25: 'Сэкономьте 25%',
    oneTime: 'Единоразово',
    mostFlexible: 'Самый гибкий',
    mostPopular: 'Самый популярный',
    bestValue: 'Лучшее предложение',
    modal: {
      title: 'Обновить подписку',
      p1: 'Мы нуждаемся в вашей поддержке, чтобы сохранить наш энтузиазм к разработке и обеспечить более качественное обслуживание пользователей с более полными отчетами данных.',
      p2: 'Вы можете выбрать обновление до подписки Pro, чтобы разблокировать больше возможностей.',
      p3: 'Если у вас возникли проблемы во время оплаты, свяжитесь с нами по электронной почте.',
    },
    status(
      str:
        | 'active'
        | 'cancelled'
        | 'expired'
        | 'on-trial'
        | 'paused'
        | 'past-due'
        | 'unpaid',
    ): string {
      switch (str) {
        case 'active':
          return 'Активный'
        case 'cancelled':
          return 'Отменен'
        case 'expired':
          return 'Просроченный'
        case 'on-trial':
          return 'Пробный период'
        case 'paused':
          return 'Приостановленный'
        case 'past-due':
          return 'Просроченный'
        case 'unpaid':
          return 'Неоплаченный'
      }
    },
    basic: {
      title: 'Основной',
      forever: 'Навсегда',
      features: {
        title: 'Особенности',
        item: {
          saveHistory: 'Сохраняйте историю навсегда',
          browseRecent: 'Просматривайте данные за последние 90 дней',
          codetimeTrend: 'Отчет о тенденции времени программирования',
          codetimeLanguaeTrend: 'Отчет о тенденции языка программирования',
          codetimeProjectTrend: 'Отчет о тенденции проектов',
          badge: 'Генерировать значки для отображения',
          export: 'Экспорт данных',
          import: 'Импорт данных',
          more: 'Другие отчеты',
        },
      },
      button: 'Бесплатно навсегда',
    },
    pro: {
      title: 'Профессиональный',
      preMonth: '/ месяц',
      preYear: '/ год',
      features: {
        item: {
          include: 'Включает все функции базового плана',
          browseAll: 'Просмотр всей истории данных',
          rule: 'Обработка данных на основе правил',
          tag: 'Система тегов',
        },
      },
      notYet: 'Еще не доступно',
      button: 'Подписаться сейчас',
    },
    needLogin: 'Необходимо войти в систему',
  },
  dashboard: {
    loginRequired:
      'Добро пожаловать в панель инструментов CodeTime! Пожалуйста, войдите в систему, чтобы просмотреть данные о времени программирования, или нажмите кнопку демо ниже, чтобы ознакомиться с демо-панелью инструментов.',
    projectSelector: {
      placeholder: 'Выберите рабочую область',
      noneText: 'Введите название рабочей области',
    },
    pageHeader: {
      userLatestEvent(project: string) {
        return `Работа в проекте «${project}»`
      },
      title: {
        overview: 'Обзор',
        badge: 'Значки',
        settings: 'Настройки',
        leaderboard: 'Таблица лидеров',
        workspace: 'Рабочая область',
      },
      description: {
        overview: 'Просмотр всех ваших данных CodeTime.',
        badge:
          'Отображение времени программирования в ваших проектах с помощью ясных, последовательных и понятных значков.',
        settings:
          'Управление настройками CodeTime, включая внешний вид, язык, данные и т.д.',
        leaderboard: 'Просмотр таблицы лидеров CodeTime.',
        workspace: 'Просмотр данных конкретной рабочей области.',
      },
    },
    overview: {
      codetimeTrendTitle: 'Тенденция времени программирования',
      codetimeLanguaeTrendTitle: 'Тенденция языка программирования',
      codetimeProjectTrendTitle: 'Тенденция проектов',
      dailyCodingDistributionTitle: 'Распределение времени программирования',
      dataRange: {
        title(days: number) {
          return `Прошедшие ${days} дней`
        },
        allTime: 'За все время',
      },
      statistic: {
        timeTotal: 'Всего',
        timeToday: 'Сегодня',
        timeAverage: 'Среднее',
        longestStreak: 'Самая большой серия',
        currentStreak: 'Текущая серия',
      },
      top: {
        language: 'Язык',
        project: 'Проект',
        platform: 'Платформа',
      },
      noData: {
        notice: {
          title: 'Пока нет данных',
          body: defineComponent({
            components: {
              NuxtLink,
            },
            setup() {
              return () => (
                <div class="text-sm">
                  <span class="text-surface-dimmed">
                    В настоящее время мы еще не обработали успешно ваши данные о
                    времени программирования. Это приложение зависит от плагина
                    для вашего редактора кода или IDE (например, VSCode,
                    JetBrains IDE). Посетите страницу
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="text-primary-on px-2"
                  >
                    [ Настройки ]
                  </NuxtLink>
                  <span class="text-surface-dimmed">
                    {' '}
                    и сконфигурируйте необходимые параметры в редакторе кода,
                    поддерживающем используемый вами плагин. После получения
                    ваших данных нам понадобится пару минут для их обработки.
                    Спасибо за сотрудничество.
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
        title: 'Предварительный просмотр',
      },
      style: {
        flat: 'Плоский',
        flatSquare: 'Плоский квадрат',
        forTheBadge: 'Для значка',
        plastic: 'Пластик',
        social: 'Социальный',
      },
      placeholder: {
        style: 'Стиль',
        language: 'Язык',
        days: 'Дни',
        project: 'Проект',
        color: 'Цвет',
      },
    },
    settings: {
      token: {
        title: 'Токен',
        tip: 'Ваш токен используется для доступа к API CodeTime. Держите его в тайне.',
        refresh: 'Обновить',
        refreshTip:
          'Если вы подозреваете, что ваш токен был скомпрометирован, вы можете сгенерировать новый токен здесь.',
        refreshToken: 'Обновить токен',
        confirmRefresh:
          'Вы уверены, что хотите обновить токен? Это сделает недействительным токен, который вы применили к плагину редактора. Вам нужно будет ввести новый токен.',
        getPlugin: defineComponent({
          components: {
            NuxtLink,
          },
          setup() {
            return () => (
              <div class="text-surface-dimmed">
                <span>
                  Для правильной работы CodeTime вам необходимо установить наш плагин и настроить токен в вашей среде разработки. В настоящее время мы поддерживаем
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
                  и
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
        title: 'Язык',
        tip: 'Выберите язык для своего веб-интерфейса CodeTime.',
      },
      export: {
        title: 'Экспорт',
        button: 'Экспорт одним нажатием',
        buttonExporting: 'Экспорт...',
        buttonSucceed: 'Экспорт успешно завершен',
        buttonFailed: 'Ошибка экспорта',
        download: 'Скачать',
        description:
          'Мы поддерживаем экспорт данных веб-сайта, чтобы обеспечить безопасное резервное копирование, удобную миграцию, углублённый анализ и соответствие, а также дать вам полный контроль и прозрачность над вашими данными.',
        tip: 'Экспортируйте свои данные в файл CSV.',
      },
      theme: {
        title: 'Тема',
        tip: 'Выберите тему для своего веб-интерфейса CodeTime.',
        dark: 'Темный',
        light: 'Свет',
        system: 'Системная',
      },
      dangerZone: {
        title: 'Опасная зона',
        description:
          'Эти настройки навсегда повлияют на ваши данные и не могут быть отменены. Пожалуйста, будьте осторожны.',
        button: {
          removeAllData: 'Удалить все данные',
          modal: {
            p1: 'Вы уверены, что хотите удалить все свои данные? Эта операция не может быть отменена.',
            p2: 'Ваши данные очень важны, вы можете сначала экспортировать данные, а затем удалить их.',
            p3: 'Если вы хотите удалить все данные, введите DELETE ниже, а затем нажмите Подтвердить.',
          },
        },
      },
      account: {
        title: 'Аккаунт',
        description: 'Настройки аккаунта.',
        expiresIn: 'Истекает через',
        manageSubscription: 'Управление подпиской',
        subscribe: 'Подписаться',
      },
      other: {
        title: 'Другой',
        description: 'Другие настройки.',
        logout: 'Выйти',
      },
    },
    workspace: {
      select: {
        placeholder: 'Выберите рабочую область',
        none: 'Введите название рабочей области',
      },
      flameGraph: {
        title: 'График пламени',
        noData: 'Нет данных',
      },
      fileList: {
        title: 'Список файл',
      },
    },
    leaderboard: {
      title(days: number) {
        return `Таблица лидеров CodeTime за последние ${days} дней`
      },
      delta(string: string) {
        return `отстает ${string}`
      },
    },
  },
  button: {
    copy: 'Копировать',
    copied: 'Скопировано',
  },
  plot: {
    label: {
      project: 'Проект',
      timeHour: 'Время (часы)',
      language: 'Язык',
      date: 'Дата',
      duration: 'Длительность',
      other: 'Другие',
      unknown: 'Неизвестный',
    },
  },
}
