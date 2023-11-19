interface ColorVariants {
  1: string
  2: string
  3: string
}
export interface ThemeData {
  front: string
  primary: ColorVariants
  back: ColorVariants
  success: ColorVariants
  error: ColorVariants
  warning: ColorVariants
  border: ColorVariants
}

export const darkTheme: ThemeData = {
  front: '#eee',
  primary: {
    1: '#0284c7',
    2: '#075985',
    3: '#0c4a6e',
  },
  back: {
    1: '#404040',
    2: '#262626',
    3: '#171717',
  },
  border: {
    1: '#404040',
    2: '#262626',
    3: '#171717',
  },
  success: {
    1: '#10b981',
    2: '#047857',
    3: '#064e3b',
  },
  error: {
    1: '#ef4444',
    2: '#b91c1c',
    3: '#7f1d1d',
  },
  warning: {
    1: '#f59e0b',
    2: '#b45309',
    3: '#78350f',
  },
}

export const lightTheme: ThemeData = {
  front: '#111',
  primary: {
    1: '#0284c7',
    2: '#0284c7',
    3: '#0284c7',
  },
  back: {
    1: '#ffffff',
    2: '#fefefe',
    3: '#fcfcfc',
  },
  border: {
    1: '#d4d4d4',
    2: '#a3a3a3',
    3: '#a3a3a3',
  },
  success: {
    1: '#059669',
    2: '#059669',
    3: '#059669',
  },
  error: {
    1: '#dc2626',
    2: '#dc2626',
    3: '#dc2626',
  },
  warning: {
    1: '#d97706',
    2: '#d97706',
    3: '#d97706',
  },
}
