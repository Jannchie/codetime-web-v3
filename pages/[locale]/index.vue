<script setup lang="ts">
import Auxlines from 'auxlines'
import 'auxlines/style.css'

definePageMeta({
  middleware: ['i18n'],
  layout: 'landing',
})
const t = useI18N()
</script>

<template>
  <Auxlines
    :min-deepth="1"
    :max-deepth="4"
  >
    <div class="flex justify-center pt-24">
      <div
        class="flex flex-col items-center"
      >
        <LandingTitle />
        <div class="text-surface p-2 text-sm">
          {{ t.landing.description }}
        </div>
      </div>
    </div>
  </Auxlines>
  <div class="m-8 flex justify-center">
    <LoginButton />
  </div>
  <div class="mt-32">
    <LandingSumHours />
  </div>

  <div class="children:px-2">
    <div class="relative my-10 bg-surface-low py-20">
      <h2 class="relative m-auto max-w-xl text-3xl font-bold">
        永久保存
        <i
          class="i-line-md-calendar absolute right-0 top-0 m-auto h-72 w-72 rotate-12 op-05"
        />
      </h2>
      <div class="m-auto mt-4 max-w-xl text-lg">
        我们深知历史数据的美。没有什么比自己努力的痕迹被抹去更让人沮丧。为了让所有用户在许多年后也能回顾自己的成长历程，我们会永久保存你的数据，直到你主动销毁他们，即使你从未付费。
      </div>
    </div>

    <div class="py-20 text-center">
      <h2 class="relative m-auto max-w-xl text-3xl font-bold">
        支持导出
        <i
          class="i-line-md-cloud-down-twotone absolute right-0 top-0 m-auto h-72 w-72 rotate-12 op-05"
        />
      </h2>
      <div class="relative m-auto mt-4 max-w-xl text-lg">
        世界上最安全的地方就是自己的硬盘。因此我们支持数据导出，你可以随时退出，并接入其他平台或者自建服务。
      </div>
    </div>

    <div class="my-10 flex items-center justify-center gap-8 bg-surface-low py-20">
      <div class="max-w-xl">
        <h2 class="m-auto max-w-xl text-3xl font-bold">
          支持平台
        </h2>
        <div class="m-auto mt-4 max-w-xl text-lg">
          我们是一个非常小的团队。这意味着我们无法支持所有 IDE 或代码编辑器。不过目前我们实现 VSCode 和 JetBrain 系 IDE 的支持，我们相信它们覆盖了大多数用户需求。我们会尽力支持更多平台，让更多人受益。
        </div>
      </div>
      <i class="i-logos-visual-studio-code h-30 w-30" />
      <i class="i-logos-jetbrains h-30 w-30" />
    </div>
  </div>

  <PriceTable />
</template>
