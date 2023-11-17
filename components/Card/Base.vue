<script setup lang="ts">
defineProps<{
  loading?: boolean
  sparse?: boolean
}>()
const cardRef = ref<HTMLElement | null>(null)
</script>

<template>
  <div
    ref="cardRef"
    :class="{
      ['after:bg-neutral-9 rotating-border']: loading,
      ['border-neutral-7 bg-neutral-9 border']: !loading,
      ['p-6']: sparse,
      ['p-4']: !sparse,
    }"
    :style="{
      '--padding': sparse ? '1.5rem' : '1rem',
    }"
    class="relative rounded"
  >
    <slot />
  </div>
</template>

<style scoped>
@keyframes spin {
  from {transform: translate(-50%, -50%) rotate(0);}
  to   {transform: translate(-50%, -50%) rotate(360deg);}
}

.rotating-border {
  --border-radius: 0.25rem;
  --border-size: 1px;
  --border-bg: conic-gradient(#404040, #075985);
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
  z-index: -2;
  animation: spin 0.5s linear infinite;
}

.rotating-border--reverse::before {
  animation-direction: reverse;
}

.rotating-border::after {
  content: '';
  position: absolute;
  inset: var(--border-size);
  z-index: -1;
  border-radius: calc(var(--border-radius) - var(--border-size));
}
</style>
