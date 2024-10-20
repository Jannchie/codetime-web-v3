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
        <div class="p-2 text-center text-sm text-surface">
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

    <div class="bg-surface-low relative my-10 py-20">
      <h2 class="relative m-auto max-w-xl text-3xl font-bold">
        {{ t.landing.features.save.title }}
        <i
          class="i-line-md-calendar absolute right-0 top-0 m-auto h-72 w-72 rotate-12 op-05"
        />
      </h2>
      <div class="m-auto mt-4 max-w-xl text-lg">
        {{ t.landing.features.save.description }}
      </div>
    </div>

    <div class="py-20 text-center">
      <h2 class="relative m-auto max-w-xl text-3xl font-bold">
        {{ t.landing.features.export.title }}
        <i
          class="i-line-md-cloud-down-twotone absolute right-0 top-0 m-auto h-72 w-72 rotate-12 op-05"
        />
      </h2>
      <div class="relative m-auto mt-4 max-w-xl text-lg">
        {{ t.landing.features.export.description }}
      </div>
    </div>

    <div class="bg-surface-low my-10 flex items-center justify-center gap-8 py-20">
      <div class="max-w-xl">
        <h2 class="m-auto max-w-xl text-3xl font-bold">
          {{ t.landing.features.editor.title }}
        </h2>
        <div class="m-auto mt-4 max-w-xl text-lg">
          {{ t.landing.features.editor.description }}
        </div>
      </div>
      <i class="i-logos-visual-studio-code h-30 w-30" />
      <i class="i-logos-jetbrains h-30 w-30" />
    </div>
  </div>

  <PriceTable />
</template>
