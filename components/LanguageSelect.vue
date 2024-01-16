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
  <div class="relative">
    <Select
      v-model="currentLocale"
      class="w-28"
      :options="[
        { label: 'English', id: 'en' },
        { label: '中文', id: 'zh-CN' },
        { label: '日本語', id: 'ja' },
      ]"
      @change="onChange"
    />
  </div>
</template>
