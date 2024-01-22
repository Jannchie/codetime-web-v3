<script setup lang="ts">
import { Select } from '@roku-ui/vue'

const route = useRoute()
const router = useRouter()
const locale = computed(
  () => route.params.locale as string,
)

const cookie = useCookie('locale', {
  expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 100),
})
const currentLocale = ref(locale.value ?? (cookie.value ?? 'en'))

function onChange(value: string) {
  cookie.value = value
}

watchEffect(() => {
  nextTick(() => {
    router.push({
      params: { locale: currentLocale.value },
    })
  })
  useHead({
    htmlAttrs: {
      lang: currentLocale.value,
    },
  })
})
</script>

<template>
  <Select
    v-model="currentLocale"
    class="w-28"
    :options="[
      { label: 'English', id: 'en' },
      { label: '中文', id: 'zh-CN' },
      { label: '日本語', id: 'ja' },
      { label: 'Deutsch', id: 'de' },
      { label: 'Français', id: 'fr' },
      { label: 'Português', id: 'pt-BR' },
      { label: 'Italiano', id: 'it' },
      { label: 'Русский', id: 'ru' },
      { label: 'Українська', id: 'ua' },
      { label: 'Bahasa Melayu', id: 'ms' },
      { label: 'Español', id: 'es' },
    ]"
    @change="onChange"
  />
</template>
