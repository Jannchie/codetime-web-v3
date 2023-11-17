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
    placeholder

    :src="src"
    :class="{ [className]: true, hidden: !loaded }"
    @load="loaded = true"
  />
  <div
    v-if="!loaded"
    class="animate-pulse bg-neutral-8"
    :class="className"
  />
</template>
