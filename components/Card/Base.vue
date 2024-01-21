<script setup lang="ts">
const props = defineProps<{
  loading?: boolean
  sparse?: boolean
  dense?: boolean
}>()
const cardRef = ref<HTMLElement | null>(null)

const padding = computed(() => {
  if (props.dense) {
    return '0.5rem'
  }
  else if (props.sparse) {
    return '1.5rem'
  }
  else {
    return '1rem'
  }
})
</script>

<template>
  <div
    ref="cardRef"
    :class="{
      ['after:bg-surface-low rotating-border border-transparent']: loading,
      ['bg-surface-low border border-transparent']: !loading,
    }"
    :style="{
      '--padding': padding,
    }"
    class="relative rounded-2xl p-[--padding] transition-background-color,border-color"
  >
    <div
      class="relative z-3"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  from {transform: translate(-50%, -50%) rotate(0);}
  to   {transform: translate(-50%, -50%) rotate(360deg);}
}

.rotating-border {
  --border-radius: 1rem;
  --border-size: 1px;
  --border-bg: conic-gradient(rgb(var(--r-color-surface-border-base)), rgb(var(--r-color-primary-container)));
  --padding: 1rem;
  position: relative;
  overflow: hidden;
  padding: calc(var(--padding) + var(--border-size));
  border-radius: var(--border-radius);
  display: inline-block;
}

.rotating-border::before {
  content: '';
  display: block;
  background: var(--border-bg);
  width: calc(100% * 1.41421356237);
  padding-bottom: calc(100% * 1.41421356237);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  z-index: 1;
  animation: spin 0.5s linear infinite;
}

.rotating-border--reverse::before {
  animation-direction: reverse;
}

.rotating-border::after {
  content: '';
  position: absolute;
  inset: var(--border-size);
  z-index: 2;
  border-radius: calc(var(--border-radius) - var(--border-size));
}
</style>
