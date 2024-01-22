<script setup lang="ts">
import { Btn, Paper } from '@roku-ui/vue'

const target = ref<HTMLElement | null>(null)
const targetIsVisible = useElementVisibility(target)
const isAnuual = ref(true)
const beforeMonthlyGradientCls = 'before:bg-gradient-to-r before:from-primary-8 before:via-primary-6 before:to-primary-5 before:op-10'
const beforeAnnualGradientCls = 'before:bg-gradient-to-rb before:from-red-6 before:via-purple-6 before:to-purple-5 before:inline-block before:op-10'
const t = useI18N()
</script>

<template>
  <div>
    <div class="pb-16 pt-8 text-center">
      <div class="text-4xl font-bold">
        {{ t.landing.pricing.title }}
      </div>
      <div class="text-surface-onlow">
        {{ t.landing.pricing.description }}
      </div>
    </div>
    <div class="m-auto mb-18 flex justify-center">
      <LandingPriceTab v-model="isAnuual" />
    </div>
    <div class="m-auto flex flex-col justify-center gap-4 container md:flex-row">
      <Paper class="flex flex-col justify-between md:min-w-72">
        <div>
          <div class="text-base font-light">
            {{ t.plan.basic.title }}
          </div>
          <div class="flex items-end gap-2 font-light">
            <div class="text-4xl font-light">
              $0
            </div>
            <div class="text-sm text-surface-onlow">
              {{ t.plan.basic.forever }}
            </div>
          </div>
          <div class="mb-2 mt-4 text-xl">
            {{ t.plan.basic.features.title }}
          </div>
          <div class="flex flex-col gap-2 text-sm text-surface-onlow">
            <FeatureItem>
              {{ t.plan.basic.features.item.saveHistory }}
            </FeatureItem>
            <FeatureItem>
              {{ t.plan.basic.features.item.browseRecent }}
            </FeatureItem>
            <FeatureItem>
              {{ t.plan.basic.features.item.codetimeTrend }}
            </FeatureItem>
            <FeatureItem>
              {{ t.plan.basic.features.item.codetimeLanguaeTrend }}
            </FeatureItem>
            <FeatureItem>
              {{ t.plan.basic.features.item.codetimeProjectTrend }}
            </FeatureItem>
            <FeatureItem>
              {{ t.plan.basic.features.item.badge }}
            </FeatureItem>
            <FeatureItem>
              {{ t.plan.basic.features.item.export }}
            </FeatureItem>
            <FeatureItem not-yet>
              {{ t.plan.basic.features.item.import }}
            </FeatureItem>
            <FeatureItem not-yet>
              {{ t.plan.basic.features.item.more }}
            </FeatureItem>
          </div>
          <div class="pt-24">
            <Btn
              class="w-full"
              variant="transparent"
              disabled
            >
              {{ t.plan.basic.button }}
            </Btn>
          </div>
        </div>
      </Paper>
      <div
        class="relative flex flex-col justify-between before:absolute before:inset-0 md:min-w-72 before:bg-primary-9/20 before:blur-32 before:content-[''] before:-z-10"
        :class="[
          {
            'scale-100 md:scale-110 transition-all transition-delay-300 transition-duration-1000': !!targetIsVisible,
            [beforeMonthlyGradientCls]: !isAnuual,
            [beforeAnnualGradientCls]: isAnuual,
          },
        ]"
      >
        <ProPricePaper
          ref="target"
          :is-anuual="isAnuual"
        />
      </div>
    </div>
  </div>
</template>
