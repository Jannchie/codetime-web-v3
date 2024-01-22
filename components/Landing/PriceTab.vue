<script setup lang="ts">
const isAnuual = defineModel<boolean>()
const selectedCls = 'bg-primary-container'
const unselectedCls = 'hover:bg-surface-border-base'
</script>

<template>
  <div class="flex gap-2 text-white children:min-w-24 children:cursor-pointer children:gap-2 children:rounded-full children:px-4 children:py-2 children:text-center children:transition-all children:duration-300 children:ease-in-out">
    <div
      :class="{
        [selectedCls]: !isAnuual,
        [unselectedCls]: isAnuual,
      }"
      @click="() => isAnuual = !isAnuual"
    >
      Monthly
    </div>
    <div
      :class="{
        [selectedCls]: isAnuual,
        [unselectedCls]: !isAnuual,
      }"
      @click="() => isAnuual = !isAnuual"
    >
      Annual
      <span class="text-xs">

        (save 25%)
      </span>
    </div>
  </div>
</template>
