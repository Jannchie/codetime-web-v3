export function useLRU<T>(key: string, capacity = 10) {
  const keys = useLocalStorage<string[]>(`lru.${key}.keys`, [])
  const cache = useLocalStorage<Record<string, T>>(`lru.${key}.cache`, {})

  function get(key: string): T | undefined {
    if (cache.value[key]) {
      updateKeyOrder(key)
      return cache.value[key]
    }
    return undefined
  }

  function set(key: string, value: T): void {
    if (cache.value[key]) {
      cache.value[key] = value
      updateKeyOrder(key)
    }
    else {
      if (keys.value.length === capacity) {
        const oldestKey = keys.value.shift()
        if (oldestKey) {
          delete cache.value[oldestKey]
        }
      }
      cache.value[key] = value
      keys.value.push(key)
    }
  }

  function updateKeyOrder(key: string): void {
    // 将键移动到数组末尾表示最新访问
    const index = keys.value.indexOf(key)
    if (index !== -1) {
      keys.value.splice(index, 1)
      keys.value.push(key)
    }
  }
  const values = computed(() => keys.value.map(key => cache.value[key]).toReversed())
  return { get, set, keys, values }
}
