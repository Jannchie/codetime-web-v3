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
    <div class="flex justify-center pb-8 pt-32">
      <div
        class="max-w-4xl flex flex-col items-center px-8 space-y-6"
      >
        <LandingTitle />
        <div class="max-w-2xl px-4 py-2 text-center text-lg text-surface leading-relaxed">
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
    <div class="m-auto mt-16 max-w-6xl p-10">
      <h2 class="relative my-4 max-w-xl flex flex-col text-3xl font-bold md:max-w-6xl">
        {{ t.landing.features.visualization.title }}
      </h2>
      <div class="mb-2 mt-4 text-lg">
        {{ t.landing.features.visualization.description }}
      </div>
      <div class="my-8 flex flex-col gap-2">
        <div class="flex gap-2">
          <div class="w-86">
            <DashboardTopCardTemplateDemo />
          </div>
          <DashboardCalendarCardDemo
            class="h-234px w-full"
          />
        </div>
        <DashboardProjectYDotCardDemo />
      </div>
    </div>

    <div class="bg-surface-low relative my-20 overflow-hidden py-24">
      <div class="relative mx-auto max-w-4xl px-6 text-center">
        <div class="relative mb-6 inline-block">
          <h2 class="text-4xl font-bold md:text-5xl">
            {{ t.landing.features.save.title }}
          </h2>
          <i
            class="i-line-md-calendar absolute h-16 w-16 rotate-12 text-blue-500 opacity-20 -right-16 -top-8 md:h-20 md:w-20"
          />
        </div>
        <div class="mx-auto max-w-2xl text-xl text-surface-dimmed leading-relaxed">
          {{ t.landing.features.save.description }}
        </div>
      </div>
    </div>

    <div class="relative overflow-hidden py-24 text-center">
      <div class="relative mx-auto max-w-4xl px-6">
        <div class="relative mb-6 inline-block">
          <h2 class="text-4xl font-bold md:text-5xl">
            {{ t.landing.features.export.title }}
          </h2>
          <i
            class="i-line-md-cloud-down-twotone absolute h-16 w-16 rotate-12 text-purple-500 opacity-20 -right-16 -top-8 md:h-20 md:w-20"
          />
        </div>
        <div class="mx-auto max-w-2xl text-xl text-surface-dimmed leading-relaxed">
          {{ t.landing.features.export.description }}
        </div>
      </div>
    </div>

    <div class="bg-surface-low relative my-20 overflow-hidden py-24">
      <div class="relative mx-auto max-w-6xl flex flex-col items-center justify-center gap-12 px-6 lg:flex-row">
        <div class="flex-1 text-center lg:text-left">
          <h2 class="mb-6 text-4xl font-bold md:text-5xl">
            {{ t.landing.features.editor.title }}
          </h2>
          <div class="max-w-xl text-xl text-surface-dimmed leading-relaxed">
            {{ t.landing.features.editor.description }}
          </div>
        </div>
        <div class="flex items-center gap-8">
          <div class="transform transition-all duration-300 hover:scale-110">
            <i class="i-logos-visual-studio-code h-20 w-20 md:h-24 md:w-24" />
          </div>
          <div class="transform transition-all duration-300 hover:scale-110">
            <i class="i-logos-jetbrains h-20 w-20 md:h-24 md:w-24" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <PriceTable />
</template>
