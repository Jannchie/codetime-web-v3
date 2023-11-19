<script setup lang="ts">
const props = defineProps<{
  src: string
  class: string
}>()
const className = computed(() => {
  return props.class
})
const loaded = ref(false)
</script>

<template>
  <NuxtImg
    v-if="src && loaded"
    placeholder
    :src="src"
    :class="{ [className]: true, hidden: !loaded }"
    @load="loaded = true"
  />
  <div
    v-else
    class="animate-pulse bg-back-2"
    :class="className"
  />
</template>
