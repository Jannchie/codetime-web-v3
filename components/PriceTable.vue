<script setup lang="ts">
import { Btn, Paper } from '@roku-ui/vue'

const target = ref<HTMLElement | null>(null)
const targetIsVisible = useElementVisibility(target)
const isAnuual = ref(false)
const monthlyGradientCls = 'bg-gradient-to-r from-primary-8 via-primary-6 to-primary-5 inline-block text-transparent bg-clip-text bg-primary-container'
const beforeMonthlyGradientCls = 'before:bg-gradient-to-r before:from-primary-8 before:via-primary-6 before:to-primary-5 before:op-10'
const annualGradientCls = 'bg-gradient-to-rb from-red-6 via-purple-6 to-purple-5 inline-block text-transparent bg-clip-text'
const beforeAnnualGradientCls = 'before:bg-gradient-to-rb before:from-red-6 before:via-purple-6 before:to-purple-5 before:inline-block before:op-10'
</script>

<template>
  <div>
    <div class="pb-16 pt-8 text-center">
      <div class="text-4xl font-bold">
        Pricing
      </div>
      <div class="text-surface-onlow">
        选择适合你的计划
      </div>
    </div>
    <div class="m-auto mb-18 flex justify-center">
      <LandingPriceTab v-model="isAnuual" />
    </div>
    <div class="m-auto flex flex-col justify-center gap-4 container md:flex-row">
      <Paper class="flex flex-col justify-between md:min-w-72">
        <div>
          <div class="text-base font-light">
            Basic
          </div>
          <div class="flex items-end gap-2 font-light">
            <div class="text-4xl font-light">
              $0
            </div>
            <div class="text-sm text-surface-onlow">
              forever
            </div>
          </div>
          <div class="mb-2 mt-4 text-xl">
            Features
          </div>
          <div class="flex flex-col gap-2 text-sm text-surface-onlow">
            <FeatureItem>
              永久保存历史数据
            </FeatureItem>
            <FeatureItem>
              可浏览最近 28 天的数据
            </FeatureItem>
            <FeatureItem>
              编程时间趋势报表
            </FeatureItem>
            <FeatureItem>
              编程语言趋势报表
            </FeatureItem>
            <FeatureItem>
              项目趋势报表
            </FeatureItem>
            <FeatureItem>
              可生成在展示用的图片
            </FeatureItem>
            <FeatureItem>
              数据导出
            </FeatureItem>
          </div>
          <div class="pt-24">
            <Btn
              class="w-full"
              variant="transparent"
              disabled
            >
              免费用户
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
        <Paper
          ref="target"
          class="h-full w-full flex flex-col justify-between"
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
                {{ isAnuual ? '$20' : '$4' }}
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
                包含 Basic Plan 所有功能
              </FeatureItem>
              <FeatureItem>
                可浏览全部历史数据
              </FeatureItem>
              <FeatureItem not-yet>
                基于规则的数据处理
              </FeatureItem>
              <FeatureItem not-yet>
                标签系统
              </FeatureItem>
            </div>
          </div>
          <div>
            <Btn
              class="w-full"
              variant="filled"
            >
              立刻订阅
            </Btn>
          </div>
        </Paper>
      </div>
    </div>
  </div>
</template>
