<script setup lang="ts">
import Auxlines from 'auxlines'
import 'auxlines/style.css'

definePageMeta({
  middleware: ['i18n'],
  layout: 'landing',
})
const t = useI18N()

function useDemoAllData() {
  const pending = autoResetRef(false, 0)
  pending.value = true
  const data = computed(() => {
    if (pending.value) {
      return { data: [] }
    }
    return demoAllData
  })
  return {
    data,
    pending,
  }
}

const allData = useDemoAllData()
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
        <div class="text-surface p-2 text-center text-sm">
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
      <div class="my-8 flex gap-2">
        <div class="w-76">
          <DashboardTopCardTemplate
            class="h-234px"
            :data="[{
                      field: 'vue',
                      minutes: 3581,
                      icon: 'i-vscode-icons-file-type-vue',
                    },
                    {
                      field: 'typescript',
                      minutes: 1322,
                      icon: 'i-vscode-icons-file-type-typescript',
                    },
                    {
                      field: 'go',
                      minutes: 958,
                      icon: 'i-vscode-icons-file-type-go',
                    },
                    {
                      field: 'python',
                      minutes: 918,
                      icon: 'i-vscode-icons-file-type-python',
                    },
                    {
                      field: 'dockerfile',
                      minutes: 324,
                      icon: 'i-vscode-icons-file-type-docker2',
                    }]"
            icon="i-tabler-braces"
            :title="t.dashboard.overview.top.language"
            type="language"
            :loading="allData.pending.value"
            :filters="[]"
          />
        </div>
        <DashboardCalendarCard
          class="h-234px w-full"
          :all-data="allData"
        />
      </div>
    </div>

    <div class="relative my-10 bg-surface-low py-20">
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

    <div class="my-10 flex items-center justify-center gap-8 bg-surface-low py-20">
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
