import type {
  ArrayStyle,
  ObjectStyle,
  SerializerOptions,
} from './pathSerializer'

export type QuerySerializer = (query: Record<string, unknown>) => string

export type BodySerializer = (body: any) => any

export interface QuerySerializerOptions {
  allowReserved?: boolean
  array?: SerializerOptions<ArrayStyle>
  object?: SerializerOptions<ObjectStyle>
}

function serializeFormDataPair(data: FormData, key: string, value: unknown): void {
  if (typeof value === 'string' || value instanceof Blob) {
    data.append(key, value)
  }
  else {
    data.append(key, JSON.stringify(value))
  }
}

function serializeUrlSearchParamsPair(data: URLSearchParams, key: string, value: unknown): void {
  if (typeof value === 'string') {
    data.append(key, value)
  }
  else {
    data.append(key, JSON.stringify(value))
  }
}

export const formDataBodySerializer = {
  bodySerializer: <T extends Record<string, any> | Array<Record<string, any>>>(
    body: T,
  ): FormData => {
    const data = new FormData()

    for (const [key, value] of Object.entries(body)) {
      if (value === undefined || value === null) {
        continue
      }
      if (Array.isArray(value)) {
        for (const v of value) serializeFormDataPair(data, key, v)
      }
      else {
        serializeFormDataPair(data, key, value)
      }
    }

    return data
  },
}

export const jsonBodySerializer = {
  bodySerializer: <T>(body: T): string =>
    JSON.stringify(body, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value),
}

export const urlSearchParamsBodySerializer = {
  bodySerializer: <T extends Record<string, any> | Array<Record<string, any>>>(
    body: T,
  ): string => {
    const data = new URLSearchParams()

    for (const [key, value] of Object.entries(body)) {
      if (value === undefined || value === null) {
        continue
      }
      if (Array.isArray(value)) {
        for (const v of value) serializeUrlSearchParamsPair(data, key, v)
      }
      else {
        serializeUrlSearchParamsPair(data, key, value)
      }
    }

    return data.toString()
  },
}
