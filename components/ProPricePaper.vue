<script setup lang="ts">
// import { loadScript } from '@paypal/paypal-js'
import { Btn, Paper } from '@roku-ui/vue'

const props = defineProps<{
  isAnuual: boolean
}>()
const isAnuual = computed(() => props.isAnuual)
const annualGradientCls = 'bg-gradient-to-rb from-red-6 via-purple-6 to-purple-5 inline-block text-transparent bg-clip-text'
const monthlyGradientCls = 'bg-gradient-to-r from-primary-8 via-primary-6 to-primary-5 inline-block text-transparent bg-clip-text bg-primary-container'

const user = useUser()
const checkoutLink = computed(async () => {
  if (!user.value) {
    return ''
  }
  if (user.value.plan === 'pro') {
    return ''
  }
  return (await useCheckoutLink(isAnuual)).value
})
const t = useI18N()

function onLogin() {
  if (typeof window === 'undefined') {
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Paper
    class="h-full min-h-600px w-full flex flex-col justify-between"
  >
    <div class="absolute right-4 top-0 rounded-full bg-primary-container px-4 py-1 text-sm text-white -translate-y-50%">
      {{ !isAnuual ? 'Most popular' : 'Best Choice ;)' }}
    </div>
    <div>
      <div class="text-base font-light">
        Pro
      </div>
      <div
        class="flex items-end gap-2 font-light"
      >
        <div
          :class="{
            [monthlyGradientCls]: !isAnuual,
            [annualGradientCls]: isAnuual,
          }"
          class="text-4xl"
        >
          {{ isAnuual ? '$36' : '$4' }}
        </div>
        <div class="text-sm text-surface-onlow">
          / {{ isAnuual ? 'year' : 'month' }}
        </div>
      </div>
      <div class="mb-2 mt-4 text-xl">
        Features
      </div>
      <div class="flex flex-col gap-2 text-sm text-surface-onlow">
        <FeatureItem>
          {{ t.plan.pro.features.item.include }}
        </FeatureItem>
        <FeatureItem>
          {{ t.plan.pro.features.item.browseAll }}
        </FeatureItem>
        <FeatureItem not-yet>
          {{ t.plan.pro.features.item.rule }}
        </FeatureItem>
        <FeatureItem not-yet>
          {{ t.plan.pro.features.item.tag }}
        </FeatureItem>
      </div>
    </div>
    <div>
      <div class="flex items-center justify-center gap-2 py-2 text-xs text-surface-onlow">
        <i class="i-line-md-loading-twotone-loop" />
        <div>
          {{ t.plan.pro.notYet }}
        </div>
      </div>
      <div
        v-if="user && user.plan === 'pro'"
        class="flex gap-2"
      >
        <Btn
          class="w-full"
          variant="transparent"
          disabled
        >
          <template #leftSection>
            <i class="i-tabler-check" />
          </template>
          {{ t.plan.status(user.plan_status) }}
        </Btn>
      </div>
      <div v-else-if="user && user.plan === 'free'">
        <Btn
          is="a"
          :href="checkoutLink"
          class="lemonsqueezy-button w-full"
          color="primary"
        >
          {{ t.plan.pro.button }}
        </Btn>
      </div>
      <div
        v-else
      >
        <Btn
          v-if="!user"
          class="w-full"
          variant="transparent"
          @click="onLogin"
        >
          {{ t.plan.needLogin }}
        </Btn>
      </div>
    </div>
  </Paper>
</template>
