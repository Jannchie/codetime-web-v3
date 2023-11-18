export interface ThemeData {
  primary: {
    1: string
    2: string
    3: string
  }
  front: {
    1: string
    2: string
    3: string
  }
  back: {
    1: string
    2: string
    3: string
  }
  border: {
    1: string
    2: string
    3: string
  }
}

export const darkTheme: ThemeData = {
  primary: {
    1: '#0284c7',
    2: '#075985',
    3: '#0c4a6e',
  },
  front: {
    1: '#ffffff',
    2: '#e6e6e6',
    3: '#cccccc',
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
}
