<script setup lang="ts">
import { TextField } from '@roku-ui/vue'

definePageMeta({
  layout: 'dashboard',
})
const user = useUser()
const token = computed(() => user.value?.upload_token ?? '')
const router = useRouter()
router.push({
  params: { locale: 'zh-CN' },
})

const apiHost = useRuntimeConfig().public.apiHost
const exporting = ref(false)
const exportSucceed = autoResetRef(false, 3000)
const exportFailed = autoResetRef(false, 3000)
const exportURL = ref('')
const fileName = `${user.value?.username}-codetime-records-${new Date().toLocaleString()}.csv`
async function exportData() {
  if (exporting.value) {
    return
  }
  try {
    exporting.value = true
    const resp = await $fetch<string>('/user/records/export', {
      method: 'POST',
      baseURL: apiHost,
      credentials: 'include',
    })
    exporting.value = false
    exportSucceed.value = true
    exportFailed.value = false
    // resp is a csv string, download it.
    const blob = new Blob([resp], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    exportURL.value = url
    // auto download
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
  }
  catch {
    exporting.value = false
    exportSucceed.value = false
    exportFailed.value = true
  }
}

async function logout() {
  await $fetch('/auth/logout', {
    method: 'POST',
    baseURL: apiHost,
    credentials: 'include',
  })
  // clean
  window.location.href = '/'
}

const t = useI18N()
</script>

<template>
  <DashboardPageTitle
    :title="t.dashboard.pageHeader.title.settings"
    :description="t.dashboard.pageHeader.description.settings"
  />
  <DashboardPageContent>
    <DashboardSettingsUser />
    <CardBase sparse>
      <div class="mb-4 text-xl">
        {{ t.dashboard.settings.token.title }}
      </div>
      <div class="mb-2 text-xs text-surface-dimmed">
        <component :is="t.dashboard.settings.token.getPlugin" />
      </div>
      <div class="mb-2 flex gap-2">
        <TextField
          v-model="token"
          readonly
          class="w-full"
          style="letter-spacing: 8px"
          password
        />
        <RCopyBtn
          :value="token"
          class="min-w-24"
        />
      </div>
      <div class="mb-4 text-xs text-surface-dimmed">
        {{ t.dashboard.settings.token.tip }}
      </div>
      <!-- TODO: DO REFRESH -->
      <DashboardRefreshBtn />
      <div class="mb-2 text-xs text-surface-dimmed">
        {{ t.dashboard.settings.token.refreshTip }}
      </div>
    </CardBase>
    <CardBase sparse>
      <div class="mb-4 text-xl">
        {{ t.dashboard.settings.theme.title }}
      </div>
      <div class="mb-2 flex gap-2">
        <ClientOnly>
          <template #placeholder>
            <div class="h-145px">
              <div class="m-8 animate-pulse bg-neutral-5" />
            </div>
          </template>
          <ThemeItem theme="dark" />
          <ThemeItem theme="light" />
          <!-- <ThemeItem theme="system" /> -->
        </ClientOnly>
      </div>
      <div class="text-xs text-surface-dimmed">
        {{ t.dashboard.settings.theme.tip }}
      </div>
    </CardBase>
    <CardBase
      sparse
      class="z-4"
    >
      <div class="mb-4 text-xl">
        {{ t.dashboard.settings.language.title }}
      </div>
      <div class="mb-2">
        <LanguageSelect />
      </div>
      <div class="text-xs text-surface-dimmed">
        {{ t.dashboard.settings.language.tip }}
      </div>
    </CardBase>
    <CardBase
      sparse
      :loading="exporting"
    >
      <div class="mb-4 text-xl">
        {{ t.dashboard.settings.export.title }}
      </div>
      <div class="mb-4 text-sm op75">
        {{ t.dashboard.settings.export.description }}
      </div>
      <div class="mb-2 flex items-center gap-2">
        <RBtn
          class="flex items-center gap-2"
          :class="{
            ['!bg-error-container !border-error-container !hover:bg-error-container !hover:border-error-container']: exportFailed,
            ['!bg-secondary-container !border-secondary-container !hover:bg-secondary-container !hover:border-secondary-container']: exportSucceed,
            ['!bg-primary !border-primary-3 !hover:bg-primary !hover:border-primary-3']: exporting,
          }"
          @click="exportData"
        >
          <template v-if="exporting">
            <i class="i-tabler-loader animate-spin" />
            <span>
              {{ t.dashboard.settings.export.buttonExporting }}
            </span>
          </template>
          <template v-else-if="exportFailed">
            <i class="i-tabler-alert-triangle" />
            <span>
              {{ t.dashboard.settings.export.buttonFailed }}
            </span>
          </template>
          <template v-else-if="exportSucceed">
            <i class="i-tabler-check" />
            <span>

              {{ t.dashboard.settings.export.buttonSucceed }}
            </span>
          </template>
          <template v-else>
            <i class="i-tabler-download" />
            <span>
              {{ t.dashboard.settings.export.button }}
            </span>
          </template>
        </RBtn>
        <div v-if="exportURL">
          <a
            :href="exportURL"
            :download="fileName"
          >
            {{ t.dashboard.settings.export.download }}
          </a>
        </div>
      </div>
      <div class="text-xs text-surface-dimmed">
        {{ t.dashboard.settings.export.tip }}
      </div>
    </CardBase>
    <CardBase sparse>
      <div class="mb-4 text-xl">
        {{ t.dashboard.settings.other.title }}
      </div>
      <div class="mb-4 text-sm op75">
        {{ t.dashboard.settings.other.description }}
      </div>
      <div class="mb-2">
        <RBtn
          class="flex items-center gap-2"
          @click="logout"
        >
          <i class="i-tabler-logout" />
          {{ t.dashboard.settings.other.logout }}
        </RBtn>
      </div>
    </CardBase>
    <DashboardSettingsDangerZone />
  </DashboardPageContent>
</template>
