import type { Translation } from './type'
import { defineComponent } from 'vue'
import NuxtLink from './NuxtLink'

export const ptBR: Partial<Translation> = {
  annualReport: {
    shareMyReport: 'Compartilhar meu relatório',
    reviewAnnualReport: 'Revisar relatório anual',
    userNotFound: 'Usuário não encontrado.',
    noData: 'Nenhum dado disponível.',
    noDataAvailableFor: (year: number | string) => `Nenhum dado disponível para ${year}.`,
    annualCodeTimeReport: (year: number | string) => `Relatório Anual de Tempo de Código para ${year}`,
    weekendCodingTimeRatio: 'Proporção de Tempo de Codificação de Fim de Semana',
    averageDailyCodingTime: 'Tempo Médio de Codificação Diária',
    busiestDayOfTheYear: 'Dia Mais Ocupado do Ano',
    busiestMonthOfTheYear: 'Mês Mais Ocupado do Ano',
    theMostProductiveHourOfTheYear: 'A Hora Mais Produtiva do Ano',
    month: 'Mês',
    hour: 'Hora',
    minutes: 'Minutos',
    theMostUsedLanguageOfTheYear: 'Linguagem Mais Usada do Ano',
    totalCodingTimeOfTheYear: 'Tempo Total de Codificação do Ano',
    priodOfDay: {
      morning: 'Manhã',
      afternoon: 'Tarde',
      evening: 'Noite',
      midnight: 'Meia-noite',
    },
  },
  meta: {
    title: 'CodeTime - Rastreie seu tempo de codificação',
    description: 'CodeTime é um aplicativo projetado para desenvolvedores que ajuda você a rastrear, analisar e melhorar suas habilidades de gerenciamento de tempo de codificação.',
    ogTitle: 'CodeTime - Rastreie seu tempo de codificação',
    ogDescription: 'CodeTime é um aplicativo projetado para desenvolvedores que ajuda você a rastrear, analisar e melhorar suas habilidades de gerenciamento de tempo de codificação.',
    twitterTitle: 'CodeTime - Rastreie seu tempo de codificação',
    twitterDescription: 'CodeTime é um aplicativo projetado para desenvolvedores que ajuda você a rastrear, analisar e melhorar suas habilidades de gerenciamento de tempo de codificação.',
  },
  general: {
    cancel: 'Cancelar',
    confirm: 'Confirmar',
  },
  landing: {
    login: 'Entrar',
    description: 'CodeTime é um aplicativo projetado para desenvolvedores que ajuda você a rastrear e analisar seu tempo de codificação.',
    toDashboard: 'Ir para o painel',
    alreadyStatistical: 'Tempo de codificação já rastreado',
    minutes: 'minutos',
    loginWithGithub: 'Entrar com o GitHub',
    freeMessage: 'Atualmente completamente gratuito, não é necessário cartão de crédito',
    demo: 'Demo',
    features: {
      visualization: {
        title: 'Visualização de dados',
        description: 'Nosso foco é fornecer o painel mais bonito e moderno para ajudá-lo a entender melhor seu tempo de codificação.',
      },
      save: {
        title: 'Salve seus dados de tempo de codificação para sempre.',
        description: 'Conhecemos a beleza dos dados históricos. Nada é mais frustrante do que ter seu próprio trabalho árduo apagado. Para que todos os usuários possam revisar seu histórico de crescimento mesmo depois de muitos anos, salvaremos seus dados para sempre, até que você os destrua ativamente, mesmo que nunca tenha pago.',
      },
      export: {
        title: 'Suporte à exportação de dados.',
        description: 'O lugar mais seguro do mundo é o seu próprio disco rígido. Portanto, suportamos a exportação de dados, você pode sair a qualquer momento e se conectar a outras plataformas ou serviços auto-construídos.',
      },
      editor: {
        title: 'Suporte a vários editores.',
        description: 'Somos uma equipe muito pequena. Isso significa que não podemos suportar todos os IDEs ou editores de código. No entanto, atualmente suportamos IDEs da série VSCode e JetBrain. Acreditamos que eles cobrem a maioria das necessidades dos usuários. Faremos o nosso melhor para suportar mais plataformas e beneficiar mais pessoas.',
      },
    },
    pricing: {
      title: 'Preços',
      description: 'Escolha o plano que mais lhe convier.',
    },
  },
  plan: {
    monthly: 'Mensal',
    yearly: 'Anual',
    save25: 'Economize 25%',
    oneTime: 'Única vez',
    mostFlexible: 'Mais flexível',
    mostPopular: 'Mais popular',
    bestValue: 'Melhor valor',
    modal: {
      title: 'Atualizar inscrição',
      p1: 'Precisamos do seu apoio para manter nosso entusiasmo pelo desenvolvimento, a fim de fornecer relatórios de dados mais ricos e uma melhor experiência do usuário.',
      p2: 'Você pode optar por atualizar para uma assinatura Pro para desbloquear mais recursos.',
      p3: 'Se você encontrar algum problema durante o processo de pagamento, entre em contato conosco por e-mail.',
    },
    status(str: string) {
      switch (str) {
        case 'active': {
          return 'Ativo'
        }
        case 'cancelled': {
          return 'Cancelado'
        }
        case 'expired': {
          return 'Expirado'
        }
        case 'on_trial': {
          return 'Em teste'
        }
        case 'paused': {
          return 'Pausado'
        }
        case 'past_due': {
          return 'Vencido'
        }
        case 'unpaid': {
          return 'Não pago'
        }
        default: {
          return 'Desconhecido'
        }
      }
    },
    basic: {
      title: 'Básico',
      forever: 'Para sempre',
      features: {
        title: 'Recursos',
        item: {
          saveHistory: 'Salvar dados históricos para sempre',
          browseRecent: 'Navegar pelos dados dos últimos 90 dias',
          codetimeTrend: 'Relatório de tendência de tempo de codificação',
          codetimeLanguaeTrend: 'Relatório de tendência de linguagem de programação',
          codetimeProjectTrend: 'Relatório de tendência de projeto',
          badge: 'Gerar crachás para exibição',
          export: 'Exportar dados',
          import: 'Importar dados',
          more: 'Mais relatórios',
        },
      },
      button: 'Sempre grátis',
    },
    pro: {
      title: 'Pro',
      preMonth: '/ mês',
      preYear: '/ ano',
      features: {
        item: {
          include: 'Inclui todos os recursos do plano Básico',
          browseAll: 'Navegue por todos os dados históricos',
          rule: 'Processamento de dados baseado em regras',
          tag: 'Sistema de tags',
        },
      },
      notYet: 'significa ainda não disponível',
      button: 'Inscreva-se agora',
    },
    needLogin: 'Precisa fazer login',
  },
  dashboard: {
    loginRequired: 'Bem-vindo ao painel CodeTime! Faça login para visualizar seus dados de tempo de codificação ou clique no botão de demonstração abaixo para experimentar o painel de demonstração.',
    projectSelector: {
      placeholder: 'Selecione um espaço de trabalho',
      noneText: 'Digite o nome do espaço de trabalho',
    },
    pageHeader: {
      userLatestEvent(project: string) {
        return `Trabalhando em ${project}`
      },
      title: {
        overview: 'Visão geral',
        badge: 'Crachás',
        settings: 'Configurações',
        leaderboard: 'Quadro de líderes',
        workspace: 'Espaço de trabalho',
        tags: 'Tags',
      },
      description: {
        overview: 'Visualize todos os seus dados do CodeTime.',
        badge: 'Exiba seu tempo de codificação em seus projetos com crachás concisos, consistentes e claros.',
        settings: 'Gerencie suas configurações do CodeTime, incluindo aparência, idioma, dados, etc.',
        leaderboard: 'Visualize o quadro de líderes CodeTime de todos os usuários.',
        workspace: 'Visualize os dados de um espaço de trabalho específico.',
        tags: 'Manage tags and rules for automatic workspace categorization.',
      },
    },
    overview: {
      codetimeTrendTitle: 'Tendência de tempo de codificação',
      codetimeLanguaeTrendTitle: 'Tendência de linguagem de programação',
      codetimeProjectTrendTitle: 'Tendência de projeto',
      dailyCodingDistributionTitle: 'Distribuição de tempo de codificação',
      dataRange: {
        title(days: number) {
          return `Últimos ${days} dias`
        },
        allTime: 'Todo o tempo',
      },
      statistic: {
        timeTotal: 'Tempo/Total',
        timeToday: 'Tempo/Hoje',
        timeAverage: 'Tempo/Média',
        longestStreak: 'Seqüência/Maior',
        currentStreak: 'Seqüência/Atual',
      },
      top: {
        language: 'Linguagem',
        project: 'Projeto',
        platform: 'Plataforma',
        workspace: 'Espaço de trabalho',
      },
      total: {
        time: 'Tempo Total de Codificação',
      },
      recent: {
        time: 'Tempo de Codificação Recente',
      },
      ranking: 'Ranking',
      hours: 'horas',
      active: {
        days: 'Dias Ativos',
      },
      topLanguage: 'Linguagem Principal',
      noData: {
        notice: {
          title: 'Ainda não há dados',
          body: defineComponent({
            components: {
              NuxtLink,
            },
            setup() {
              return () => (
                <div class="text-sm">
                  <span class="text-surface-dimmed">
                    Atualmente, ainda não processamos com sucesso os dados do seu tempo de codificação. Este aplicativo depende do plugin para o seu editor de código ou ambiente de desenvolvimento integrado (como VSCode, IDEs JetBrains). Por favor visite o
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="text-primary-on px-2"
                  >
                    [ Configurações ]
                  </NuxtLink>
                  <span class="text-surface-dimmed">
                    página e configure as configurações necessárias no editor de código que suporta o plugin que você está usando. Depois de receber seus dados, precisamos de cerca de dois minutos para processá-los. Obrigado por sua cooperação.
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
        title: 'Visualização',
      },
      style: {
        flat: 'Plano',
        flatSquare: 'Plano quadrado',
        forTheBadge: 'Para o crachá',
        plastic: 'Plástico',
        social: 'Social',
      },
      placeholder: {
        style: 'Estilo',
        language: 'Linguagem',
        days: 'Dias',
        project: 'Projeto',
        color: 'Cor',
      },
    },
    settings: {
      token: {
        title: 'Token',
        tip: 'Seu token é usado para acessar a API CodeTime. Mantenha-o privado.',
        refresh: 'Atualizar',
        refreshTip: 'Se você suspeitar que seu token foi vazado, pode gerar um novo token aqui.',
        refreshToken: 'Token de atualização',
        confirmRefresh: 'Tem certeza de que deseja atualizar o token? Isso invalidará o token que você aplicou ao plugin do editor. Você precisa inserir um novo token.',
        getPlugin: defineComponent({
          components: {
            NuxtLink,
          },
          setup() {
            return () => (
              <div class="text-surface-dimmed">
                <span>
                  Para que o CodeTime funcione corretamente, você precisa instalar nosso plugin e configurar o token em seu ambiente de desenvolvimento. Atualmente, suportamos
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
                  e
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
        title: 'Língua',
        tip: 'Escolha o idioma para o seu CodeTime Web UI.',
      },
      export: {
        title: 'Exportar',
        button: 'Exportação com um clique',
        buttonExporting: 'Exportando...',
        buttonSucceed: 'Exportação bem-sucedida',
        buttonFailed: 'Falha na exportação',
        download: 'Baixar',
        description: 'Oferecemos suporte à exportação de dados do site para garantir backup seguro, migração conveniente, análise aprofundada e conformidade, ao mesmo tempo que oferecemos controle e transparência completos sobre seus dados.',
        tip: 'Exporte seus dados para um arquivo CSV.',
      },
      theme: {
        title: 'Tema',
        tip: 'Escolha o tema para o seu CodeTime Web UI.',
        dark: 'Escuro',
        light: 'Claro',
        system: 'Sistema',
      },
      dangerZone: {
        title: 'Zona de perigo',
        description: 'Essas configurações afetarão permanentemente seus dados e não poderão ser desfeitas. Prossiga com cautela.',
        button: {
          removeAllData: 'Remover todos os dados',
          removeAllDataModal: {
            p1: 'Tem certeza de que deseja excluir todos os seus dados? Esta operação não pode ser desfeita.',
            p2: 'Seus dados são muito importantes, você pode exportar os dados primeiro e depois excluí-los.',
            p3: 'Se você deseja excluir todos os dados, digite DELETE abaixo e clique em Confirmar.',
          },
        },
        subTitle: {
          removeData: 'Remover todos os dados',
          privacy: 'Privacidade',
        },
      },
      account: {
        title: 'Conta',
        description: 'Configurações de conta.',
        expiresIn: 'Expira em',
        manageSubscription: 'Gerenciar assinatura',
        subscribe: 'Inscreva-se',
      },
      other: {
        title: 'Outro',
        description: 'Outras configurações.',
        logout: 'Sair',
      },
    },
    workspace: {
      select: {
        placeholder: 'Selecione um espaço de trabalho',
        none: 'Digite o nome do espaço de trabalho',
      },
      flameGraph: {
        title: 'Gráfico de chamas',
        noData: 'Sem dados',
      },
      fileList: {
        title: 'Lista de arquivos',
      },
    },
    leaderboard: {
      title(days: number) {
        return `Quadro de líderes de tempo de codificação dos últimos ${days} dias`
      },
      delta(string: string) {
        return `${string} atrás`
      },
    },
    tags: {
      title: 'Tags',
      description: 'Gerenciar tags e regras para categorização automática do espaço de trabalho.',
      tagList: {
        title: 'Lista de Tags',
        noTags: 'Nenhuma tag encontrada. Crie sua primeira tag para começar.',
        createTag: 'Criar Tag',
        freeUserLimit: 'Usuários gratuitos podem criar até',
        upgradeForMore: 'Atualize para criar mais tags',
      },
      tagForm: {
        name: 'Nome',
        namePlaceholder: 'Digite o nome da tag',
        color: 'Cor',
        colorPlaceholder: 'Escolha uma cor',
        emoji: 'Emoji',
        emojiPlaceholder: 'Digite emoji (opcional)',
        create: 'Criar Tag',
        edit: 'Editar Tag',
        cancel: 'Cancelar',
        save: 'Salvar',
      },
      tagRules: {
        title: 'Regras da Tag',
        noRules: 'Nenhuma regra encontrada para esta tag.',
        createRule: 'Criar Regra',
        rule: 'Regra',
        enabled: 'Habilitado',
        disabled: 'Desabilitado',
        delete: 'Excluir',
        edit: 'Editar',
        selectTagPrompt: 'Selecione uma tag para gerenciar suas regras',
        freeUserLimit: 'Usuários gratuitos podem criar até',
        upgradeForMore: 'Atualize para criar mais regras',
      },
      ruleForm: {
        name: 'Nome da Regra',
        namePlaceholder: 'Digite o nome da regra',
        enabled: 'Habilitado',
        conditions: 'Condições',
        addCondition: 'Adicionar Condição',
        field: 'Campo',
        conditionType: 'Tipo de Condição',
        value: 'Valor',
        valuePlaceholder: 'Digite o valor',
        negate: 'Negar',
        create: 'Criar Regra',
        edit: 'Editar Regra',
        cancel: 'Cancelar',
        save: 'Salvar',
      },
      conditionTypes: {
        CONTAINS: 'Contém',
        EQUALS: 'Igual',
        STARTS_WITH: 'Começa com',
        ENDS_WITH: 'Termina com',
        REGEX: 'Expressão regular',
        NOT_CONTAINS: 'Não contém',
        NOT_EQUALS: 'Não igual',
        NOT_STARTS_WITH: 'Não começa com',
        NOT_ENDS_WITH: 'Não termina com',
        NOT_REGEX: 'Não corresponde regex',
      },
      fields: {
        workspaceName: 'Nome do Espaço de Trabalho',
        language: 'Linguagem',
        gitOrigin: 'Origem do Git',
        gitBranch: 'Branch do Git',
        platform: 'Plataforma',
        editor: 'Editor',
        absoluteFile: 'Caminho Absoluto do Arquivo',
        relativeFile: 'Caminho Relativo do Arquivo',
      },
      actions: {
        delete: 'Excluir',
        edit: 'Editar',
        manageRules: 'Gerenciar Regras',
        enable: 'Habilitar',
        disable: 'Desabilitar',
      },
      deleteConfirm: {
        deleteTag: 'Excluir tag',
        deleteTagMessage: 'Tem certeza de que deseja excluir esta tag? Esta ação não pode ser desfeita.',
        deleteRule: 'Excluir regra',
        deleteRuleMessage: 'Tem certeza de que deseja excluir esta regra? Esta ação não pode ser desfeita.',
        cancel: 'Cancelar',
        delete: 'Excluir',
      },
      common: {
        not: 'não',
        optional: '(opcional)',
        ruleRelationship: 'Regras são conectadas por lógica OU, condições por lógica E',
        freeUserRuleLimit: 'Usuários gratuitos podem criar apenas 1 regra por tag',
        upgradeForMoreRules: 'Faça upgrade para criar mais regras',
        ruleIdFormat: (id: string) => `Regra #${id.slice(-4)}`,
        editingMode: 'Modo de edição - Não se esqueça de salvar as alterações',
      },
      timeRange: {
        last7Days: 'Últimos 7 dias',
        last30Days: 'Últimos 30 dias',
        last90Days: 'Últimos 90 dias',
      },
      stats: {
        title: 'Estatísticas de tags',
        viewAll: 'Ver tudo',
        noData: 'Nenhum dado de tag disponível',
        timeDistribution: 'Distribuição do Tempo de Codificação por Tags',
        totalDuration: 'Duração total',
        recordCount: 'Número de registros',
        timeRange: 'Período de tempo',
        days: 'dias',
        dailyAverage: 'Média diária',
        timeTrend: 'Tendência temporal',
        noChartData: 'Nenhum dado de gráfico disponível',
        statisticsTitle: (tagName: string) => `Estatísticas de ${tagName}`,
      },
    },
    pluginGuide: {
      title: 'Começar com CodeTime',
      description: 'Instale o plugin CodeTime para rastrear automaticamente seu tempo de programação',
      token: {
        title: 'Seu Token',
        description: 'Copie este token e cole nas configurações do plugin',
      },
      plugins: {
        title: 'Baixar Plugins',
      },
      vscode: {
        title: 'Família VSCode',
        description: 'Compatível com VSCode, Cursor e Windsurf',
      },
      jetbrains: {
        title: 'Família JetBrains',
        description: 'Compatível com todas as IDEs JetBrains',
      },
      downloadPlugin: 'Baixar Plugin',
      setup: {
        title: 'Instruções de Configuração',
        step1: 'Baixe e instale o plugin para seu editor',
        step2: 'Abra as configurações do plugin em seu editor',
        step3: 'Copie e cole seu token acima',
        step4: 'Comece a programar e os dados aparecerão em 2-3 minutos',
      },
    },
  },
  button: {
    copy: 'Copiar',
    copied: 'Copiado',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
  },
  plot: {
    label: {
      project: 'Projeto',
      timeHour: 'Tempo (horas)',
      language: 'Linguagem',
      date: 'Data',
      duration: 'Duração',
      durationHours: 'Duração (horas)',
      other: 'Outro',
      unknown: 'Desconhecido',
      currentTime: 'Hora Atual',
    },
  },
}
