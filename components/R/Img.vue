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
    v-if="src"
    placeholder
    :src="src"
    :class="{ [className]: true, hidden: !loaded }"
    :alt="src"
    @load="loaded = true"
  />
  <div
    v-if="!loaded"
    class="animate-pulse bg-neutral-5"
    :class="className"
  />
</template>
