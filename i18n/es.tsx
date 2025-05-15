import type { Translation } from './type'
import NuxtLink from './NuxtLink.vue'

export const es: Partial<Translation> = {
  annualReport: {
    shareMyReport: 'Compartir mi informe',
    reviewAnnualReport: 'Revisar informe anual',
    userNotFound: 'Usuario no encontrado.',
    noData: 'No hay datos disponibles.',
    noDataAvailableFor: (year: number | string) => `No hay datos disponibles para ${year}.`,
    annualCodeTimeReport: (year: number | string) => `Informe anual de tiempo de código para ${year}`,
    weekendCodingTimeRatio: 'Relación de tiempo de codificación de fin de semana',
    averageDailyCodingTime: 'Tiempo promedio de codificación diaria',
    busiestDayOfTheYear: 'Día más ocupado del año',
    busiestMonthOfTheYear: 'Mes más ocupado del año',
    theMostProductiveHourOfTheYear: 'La hora más productiva del año',
    month: 'Mes',
    hour: 'Hora',
    minutes: 'Minutos',
    theMostUsedLanguageOfTheYear: 'El lenguaje más usado del año',
    totalCodingTimeOfTheYear: 'Tiempo total de codificación del año',
    priodOfDay: {
      morning: 'Mañana',
      afternoon: 'Tarde',
      evening: 'Noche',
      midnight: 'Medianoche',
    },
  },
  meta: {
    title: 'CodeTime - Sigue tu tiempo de programación',
    description: 'CodeTime es una aplicación diseñada para desarrolladores que te ayuda a seguir, analizar y mejorar tus habilidades de gestión del tiempo de programación.',
    ogTitle: 'CodeTime - Sigue tu tiempo de programación',
    ogDescription: 'CodeTime es una aplicación diseñada para desarrolladores que te ayuda a seguir, analizar y mejorar tus habilidades de gestión del tiempo de programación.',
    twitterTitle: 'CodeTime - Sigue tu tiempo de programación',
    twitterDescription: 'CodeTime es una aplicación diseñada para desarrolladores que te ayuda a seguir, analizar y mejorar tus habilidades de gestión del tiempo de programación.',
  },
  general: {
    cancel: 'Cancelar',
    confirm: 'Confirmar',
  },
  landing: {
    login: 'Iniciar sesión',
    description: 'CodeTime es una aplicación diseñada para desarrolladores que te ayuda a seguir y analizar tu tiempo de programación.',
    toDashboard: 'Ir al Panel de Control',
    alreadyStatistical: 'Tiempo de programación ya registrado',
    minutes: 'minutos',
    loginWithGithub: 'Iniciar sesión con GitHub',
    freeMessage: 'Actualmente es completamente gratuito, no se requiere tarjeta de crédito',
    demo: 'Demo',
    features: {
      visualization: {
        title: 'Visualización de datos',
        description: 'Nos comprometemos a proporcionar el panel más moderno, atractivo y visualmente agradable para ayudarte a comprender mejor tu tiempo de programación.',
      },
      save: {
        title: 'Guarda tus datos de tiempo de programación para siempre.',
        description: 'Conocemos la belleza de los datos históricos. Nada es más frustrante que perder tu propio trabajo duro. Para que todos los usuarios puedan revisar su historial de crecimiento incluso después de muchos años, guardaremos tus datos para siempre, hasta que los elimines activamente, incluso si nunca has pagado.',
      },
      export: {
        title: 'Soporte para exportar datos.',
        description: 'El lugar más seguro del mundo es tu propio disco duro. Por lo tanto, admitimos la exportación de datos, puedes salir en cualquier momento y conectarte a otras plataformas o servicios autónomos.',
      },
      editor: {
        title: 'Soporte para múltiples editores.',
        description: 'Somos un equipo muy pequeño. Esto significa que no podemos admitir todos los IDE o editores de código. Sin embargo, actualmente admitimos IDEs de la serie VSCode y JetBrain. Creemos que cubren la mayoría de las necesidades de los usuarios. Haremos todo lo posible por admitir más plataformas y beneficiar a más personas.',
      },
    },
    pricing: {
      title: 'Precios',
      description: 'Elige el plan que se adapte a ti.',
    },
  },
  plan: {
    monthly: 'Mensual',
    yearly: 'Anual',
    save25: 'Ahorra 25%',
    oneTime: 'Pago único',
    mostFlexible: 'Más flexible',
    mostPopular: 'Más popular',
    bestValue: 'Mejor valor',
    modal: {
      title: 'Actualizar suscripción',
      p1: 'Necesitamos tu apoyo para mantener nuestro entusiasmo por el desarrollo, y así poder proporcionar informes de datos más ricos y una mejor experiencia de usuario.',
      p2: 'Puedes optar por actualizar a una suscripción Pro para desbloquear más funciones.',
      p3: 'Si encuentras algún problema durante el proceso de pago, contáctanos por correo electrónico.',
    },
    status(str: 'active' | 'cancelled' | 'expired' | 'on-trial' | 'paused' | 'past-due' | 'unpaid') {
      switch (str) {
        case 'active': {
          return 'Activo'
        }
        case 'cancelled': {
          return 'Cancelado'
        }
        case 'expired': {
          return 'Expirado'
        }
        case 'on-trial': {
          return 'En prueba'
        }
        case 'paused': {
          return 'Pausado'
        }
        case 'past-due': {
          return 'Vencido'
        }
        case 'unpaid': {
          return 'No pagado'
        }
      }
    },
    basic: {
      title: 'Básico',
      forever: 'Para siempre',
      features: {
        title: 'Características',
        item: {
          saveHistory: 'Guardar datos históricos para siempre',
          browseRecent: 'Navegar por datos de los últimos 90 días',
          codetimeTrend: 'Informe de tendencia de tiempo de programación',
          codetimeLanguaeTrend: 'Informe de tendencia de lenguaje de programación',
          codetimeProjectTrend: 'Informe de tendencia de proyecto',
          badge: 'Generar insignias para mostrar',
          export: 'Exportar datos',
          import: 'Importar datos',
          more: 'Más informes',
        },
      },
      button: 'Gratis para siempre',
    },
    pro: {
      title: 'Pro',
      preMonth: '/ mes',
      preYear: '/ año',
      features: {
        item: {
          include: 'Incluye todas las funciones del plan Básico',
          browseAll: 'Navegar por todos los datos históricos',
          rule: 'Procesamiento de datos basado en reglas',
          tag: 'Sistema de etiquetas',
        },
      },
      notYet: 'significa que aún no está disponible',
      button: 'Suscribirse ahora',
    },
    needLogin: 'Necesita iniciar sesión',
  },
  dashboard: {
    loginRequired: '¡Bienvenido al panel de CodeTime! Por favor, inicia sesión para ver tus datos de tiempo de programación, o haz clic en el botón de demostración a continuación para experimentar el panel de demostración.',
    projectSelector: {
      placeholder: 'Selecciona un espacio de trabajo',
      noneText: 'Escribe el nombre del espacio de trabajo',
    },
    pageHeader: {
      userLatestEvent(project: string) {
        return `Trabajando en ${project}`
      },
      title: {
        overview: 'Resumen',
        badge: 'Insignias',
        settings: 'Configuración',
        leaderboard: 'Clasificación',
        workspace: 'Espacio de trabajo',
      },
      description: {
        overview: 'Ver todos tus datos de CodeTime.',
        badge: 'Muestra tu tiempo de programación en tus proyectos con insignias concisas, consistentes y claras.',
        settings: 'Administra la configuración de CodeTime, incluyendo la apariencia, el idioma, los datos, etc.',
        leaderboard: 'Ver la clasificación de CodeTime de todos los usuarios.',
        workspace: 'Ver los datos de un espacio de trabajo específico.',
      },
    },
    overview: {
      codetimeTrendTitle: 'Tendencia de tiempo de programación',
      codetimeLanguaeTrendTitle: 'Tendencia de lenguaje de programación',
      codetimeProjectTrendTitle: 'Tendencia de proyecto',
      dailyCodingDistributionTitle: 'Distribución diaria de tiempo de programación',
      dataRange: {
        title(days: number) {
          return `Últimos ${days} días`
        },
        allTime: 'Todo el tiempo',
      },
      statistic: {
        timeTotal: 'Tiempo/Total',
        timeToday: 'Tiempo/Hoy',
        timeAverage: 'Tiempo/Promedio',
        longestStreak: 'Racha/Más larga',
        currentStreak: 'Racha/Actual',
      },
      top: {
        language: 'Lenguaje',
        project: 'Proyecto',
        platform: 'Plataforma',
      },
      noData: {
        notice: {
          title: 'Aún no hay datos',
          body: defineComponent({
            components: {
              NuxtLink,
            },
            setup() {
              return () => (
                <div class="text-sm">
                  <span class="text-surface-dimmed">
                    Actualmente, aún no hemos procesado con éxito tus datos de tiempo de programación. Esta aplicación depende del complemento de tu editor de código o entorno de desarrollo integrado (como VSCode, JetBrains IDE). Por favor, visita la página de
                  </span>
                  <NuxtLink
                    to="dashboard/settings"
                    class="text-primary-on px-2"
                  >
                    [ Configuración ]
                  </NuxtLink>
                  <span class="text-surface-dimmed">
                    y configura las ajustes necesarios en el editor de código que soporte el complemento que estás utilizando. Después de recibir tus datos, necesitamos unos dos minutos para procesarlos. Gracias por tu cooperación.
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
        title: 'Vista previa',
      },
      style: {
        flat: 'Plano',
        flatSquare: 'Plano Cuadrado',
        forTheBadge: 'Para la Insignia',
        plastic: 'Plástico',
        social: 'Social',
      },
      placeholder: {
        style: 'Estilo',
        language: 'Lenguaje',
        days: 'Días',
        project: 'Proyecto',
        color: 'Color',
      },
    },
    settings: {
      token: {
        title: 'Token',
        tip: 'Tu token se utiliza para acceder a la API de CodeTime. Mantenlo privado.',
        refresh: 'Actualizar',
        refreshTip: 'Si sospechas que tu token se ha filtrado, puedes generar un nuevo token aquí.',
        refreshToken: 'Actualizar token',
        confirmRefresh: '¿Estás seguro de que quieres actualizar el token? Esto invalidará el token que has aplicado al complemento del editor. Deberás ingresar un nuevo token.',
        getPlugin: defineComponent({
          components: {
            NuxtLink,
          },
          setup() {
            return () => (
              <div class="text-surface-dimmed">
                <span>
                  Para usar CodeTime correctamente, debe instalar nuestro complemento y configurar el token en su entorno de desarrollo. Actualmente, admitimos
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
                  y
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
        title: 'Idioma',
        tip: 'Elige el idioma para la interfaz web de CodeTime.',
      },
      export: {
        title: 'Exportar',
        button: 'Exportar con un clic',
        buttonExporting: 'Exportando...',
        buttonSucceed: 'Éxito en la exportación',
        buttonFailed: 'Error en la exportación',
        download: 'Descargar',
        description: 'Admitimos la exportación de datos del sitio web para garantizar una copia de seguridad segura, una migración conveniente, un análisis en profundidad y el cumplimiento, al tiempo que te brindamos un control completo y transparencia sobre tus datos.',
        tip: 'Exporta tus datos a un archivo CSV.',
      },
      theme: {
        title: 'Tema',
        tip: 'Elige el tema para la interfaz web de CodeTime.',
        dark: 'Oscuro',
        light: 'Claro',
        system: 'Sistema',
      },
      dangerZone: {
        title: 'Zona de peligro',
        description: 'Estos ajustes afectarán permanentemente tus datos y no se pueden deshacer. Por favor, procede con precaución.',
        button: {
          removeAllData: 'Eliminar todos los datos',
          removeAllDataModal: {
            p1: '¿Estás seguro de que quieres eliminar todos tus datos? Esta operación no se puede deshacer.',
            p2: 'Tus datos son muy importantes, puedes exportarlos primero y luego eliminarlos.',
            p3: 'Si deseas eliminar todos los datos, ingresa ELIMINAR a continuación y luego haz clic en Confirmar.',
          },
        },
        subTitle: {
          removeData: 'Eliminar datos',
          privacy: 'Privacidad',
        },
      },
      account: {
        title: 'Cuenta',
        description: 'Ajustes de la cuenta.',
        expiresIn: 'Expira en',
        manageSubscription: 'Administrar suscripción',
        subscribe: 'Suscribirse',
      },
      other: {
        title: 'Otros',
        description: 'Otros ajustes.',
        logout: 'Cerrar sesión',
      },
    },
    workspace: {
      select: {
        placeholder: 'Selecciona un espacio de trabajo',
        none: 'Escribe el nombre del espacio de trabajo',
      },
      flameGraph: {
        title: 'Gráfico de llama',
        noData: 'No hay datos',
      },
      fileList: {
        title: 'Lista de archivos',
      },
    },
    leaderboard: {
      title(days: number) {
        return `Clasificación de tiempo de programación de los últimos ${days} días`
      },
      delta(string: string) {
        return `${string} detrás`
      },
    },
  },
  button: {
    copy: 'Copiar',
    copied: 'Copiado',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
  },
  plot: {
    label: {
      project: 'Proyecto',
      timeHour: 'Tiempo (horas)',
      language: 'Lenguaje',
      date: 'Fecha',
      duration: 'Duración',
      other: 'Otro',
      unknown: 'Desconocido',
    },
  },
}
