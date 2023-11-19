<script setup lang="ts">
const props = defineProps<{
  id: string
}>()

const t = useI18N()

const title = computed(() => {
  switch (props.id) {
    case 'dark':
      return t.value.dashboard.settings.theme.dark
    case 'light':
      return t.value.dashboard.settings.theme.light
  }
})
</script>

<template>
  <CardBase class="!p-0">
    <div class="px-2 pt-2">
      {{ title }}
    </div>
    <ThemeProvider :theme="id">
      <div class="w-86 h-full p-2">
        <CardBase>
          <div class="h-1em w-32 bg-primary-1 mb-2 rounded-full" />
          <div class="h-1em w-full bg-front text-sm rounded-full op-50 mb-1" />
          <div class="h-1em w-2/3 bg-front rounded-full text-sm op-50" />
        </CardBase>
      </div>
    </ThemeProvider>
  </CardBase>
</template>
