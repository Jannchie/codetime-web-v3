<script setup lang="ts">
defineProps<{
  link: string
}>()
const t = useI18N()
const loaded = ref(false)
</script>

<template>
  <CardBase sparse>
    <div class="text-xl mb-4">
      {{ t.dashboard.badge.preview.title }}
    </div>
    <div

      class="flex h-32 items-center justify-center"
    >
      <div
        :class="{
          'bg-neutral-5 h-32px rounded-lg w-282px animate-pulse': !loaded,
        }"
      />
      <NuxtImg
        v-if="link"
        :class="loaded ? '' : 'hidden'"
        placeholder
        :src="link"
        class="h-8"
        alt="CodeTime Badge"
        @load="loaded = true"
      />
    </div>
  </CardBase>
</template>
