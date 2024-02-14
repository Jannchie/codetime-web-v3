import NuxtLink from './NuxtLink.vue'

export const ptBR: Partial<I18NData> = {
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
    status(str: 'active' | 'cancelled' | 'expired' | 'on-trial' | 'paused' | 'past-due' | 'unpaid') {
      switch (str) {
        case 'active':
          return 'Ativo'
        case 'cancelled':
          return 'Cancelado'
        case 'expired':
          return 'Expirado'
        case 'on-trial':
          return 'Em teste'
        case 'paused':
          return 'Pausado'
        case 'past-due':
          return 'Vencido'
        case 'unpaid':
          return 'Não pago'
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
    pageHeader: {
      title: {
        overview: 'Visão geral',
        badge: 'Crachás',
        settings: 'Configurações',
        leaderboard: 'Quadro de líderes',
      },
      description: {
        overview: 'Visualize todos os seus dados do CodeTime.',
        badge: 'Exiba seu tempo de codificação em seus projetos com crachás concisos, consistentes e claros.',
        settings: 'Gerencie suas configurações do CodeTime, incluindo aparência, idioma, dados, etc.',
        leaderboard: 'Visualize o quadro de líderes CodeTime de todos os usuários.',
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
      },
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
                  <span class="text-surface-onlow">
                    Atualmente, ainda não processamos com sucesso os dados do seu tempo de codificação. Este aplicativo depende do plugin para o seu editor de código ou ambiente de desenvolvimento integrado (como VSCode, IDEs JetBrains). Por favor visite o
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="px-2 text-primary-on"
                  >
                    [ Configurações ]
                  </NuxtLink>
                  <span class="text-surface-onlow">
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
          modal: {
            p1: 'Tem certeza de que deseja excluir todos os seus dados? Esta operação não pode ser desfeita.',
            p2: 'Seus dados são muito importantes, você pode exportar os dados primeiro e depois excluí-los.',
            p3: 'Se você deseja excluir todos os dados, digite DELETE abaixo e clique em Confirmar.',
          },
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
    leaderboard: {
      title(days: number) {
        return `Quadro de líderes de tempo de codificação dos últimos ${days} dias`
      },
      delta(string: string) {
        return `${string} atrás`
      },
    },
  },
  button: {
    copy: 'Copiar',
    copied: 'Copiado',
  },
  plot: {
    label: {
      project: 'Projeto',
      timeHour: 'Tempo (horas)',
      language: 'Linguagem',
      date: 'Data',
      duration: 'Duração',
      other: 'Outro',
      unknown: 'Desconhecido',
    },
  },
}
