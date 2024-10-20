<script setup lang="ts">
import { Btn } from '@roku-ui/vue'

const variant = defineModel<string>()
const t = useI18N()
</script>

<template>
  <div class="flex gap-2 children:min-w-24 children:cursor-pointer children:gap-2 children:rounded-xl children:px-4 children:py-1 children:text-center children:duration-100 children:ease-in-out">
    <Btn
      :variant="variant === 'monthly' ? 'filled' : 'default'"
      class="!h-14"
      size="lg"
      @click="() => variant = 'monthly'"
    >
      <div>
        {{ t.plan.monthly }}
        <div class="text-xs op-50">
          {{ t.plan.mostFlexible }}
        </div>
      </div>
    </Btn>
    <Btn
      :variant="variant === 'one-time' ? 'filled' : 'default'"
      class="!h-14"
      @click="() => variant = 'one-time'"
    >
      <div>
        {{ t.plan.oneTime }}
        <div class="text-xs op-50">
          <i class="i-ant-design-alipay-circle-outlined" />
          <i class="i-ant-design-wechat-filled" />
          <i class="i-entypo-social-paypal" />
        </div>
      </div>
    </Btn>
    <Btn
      class="!h-14"
      :variant="variant === 'annual' ? 'filled' : 'default'"
      @click="() => variant = 'annual'"
    >
      <div>
        <div>
          {{ t.plan.yearly }}
        </div>
        <div class="text-xs op-50">
          {{ t.plan.save25 }}
        </div>
      </div>
    </Btn>
  </div>
</template>
