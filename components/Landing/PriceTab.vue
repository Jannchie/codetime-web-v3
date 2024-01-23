<script setup lang="ts">
const variant = defineModel<string>()
const selectedCls = 'bg-primary-container text-white'
const unselectedCls = 'hover:bg-surface-border-base'
const t = useI18N()
</script>

<template>
  <div class="flex gap-2 children:min-w-24 children:cursor-pointer children:gap-2 children:rounded-xl children:px-4 children:py-1 children:text-center children:transition-all children:duration-300 children:ease-in-out">
    <div
      :class="{
        [selectedCls]: variant === 'monthly',
        [unselectedCls]: variant !== 'monthly',
      }"
      @click="() => variant = 'monthly'"
    >
      {{ t.plan.monthly }}
      <div class="text-xs">
        {{ t.plan.mostFlexible }}
      </div>
    </div>
    <div
      :class="{
        [selectedCls]: variant === 'one-time',
        [unselectedCls]: variant !== 'one-time',
      }"
      @click="() => variant = 'one-time'"
    >
      {{ t.plan.oneTime }}
      <div class="text-xs">
        <i class="i-ant-design-alipay-circle-outlined" />
        <i class="i-ant-design-wechat-filled" />
        <i class="i-entypo-social-paypal" />
      </div>
    </div>
    <div
      class="flex flex-col gap-0!"
      :class="{
        [selectedCls]: variant === 'annual',
        [unselectedCls]: variant !== 'annual',
      }"
      @click="() => variant = 'annual'"
    >
      <div>
        {{ t.plan.yearly }}
      </div>
      <div class="text-xs">
        {{ t.plan.save25 }}
      </div>
    </div>
  </div>
</template>
