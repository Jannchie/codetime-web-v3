<script setup lang="ts">
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
    <CardBase sparse>
      <div class="text-xl mb-4">
        {{ t.dashboard.settings.token.title }}
      </div>
      <div class="mb-2 flex gap-2">
        <RTextField
          class="py-1 px-2 rounded border border-neutral-7 bg-neutral-8 outline-none"
          readonly
          type="password"
          :value="token"
        />
        <RCopyBtn :value="token" />
      </div>
      <div class="op50 text-xs">
        {{ t.dashboard.settings.token.tip }}
      </div>
    </CardBase>
    <CardBase sparse>
      <div class="text-xl mb-4">
        {{ t.dashboard.settings.language.title }}
      </div>
      <div class="mb-2">
        <LanguageSelect />
      </div>
      <div class="op50 text-xs">
        {{ t.dashboard.settings.language.tip }}
      </div>
    </CardBase>
    <CardBase
      sparse
      :loading="exporting"
    >
      <div class="text-xl mb-4">
        {{ t.dashboard.settings.export.title }}
      </div>
      <div class="op75 text-sm mb-4">
        {{ t.dashboard.settings.export.description }}
      </div>
      <div class="mb-2 flex items-center gap-2">
        <RBtn
          class="flex gap-2 items-center"
          :class="{
            ['!bg-red-9 !border-red-9 !hover:bg-red-9 !hover:border-red-9']: exportFailed,
            ['!bg-green-9 !border-green-9 !hover:bg-green-9 !hover:border-green-9']: exportSucceed,
            ['!bg-sky-9 !border-sky-9 !hover:bg-sky-9 !hover:border-sky-9']: exporting,
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
      <div class="op50 text-xs">
        {{ t.dashboard.settings.export.tip }}
      </div>
    </CardBase>
    <CardBase class="p-6">
      <div class="text-xl mb-4">
        {{ t.dashboard.settings.other.title }}
      </div>
      <div class="op75 text-sm mb-4">
        {{ t.dashboard.settings.other.description }}
      </div>
      <div class="mb-2">
        <RBtn
          class="flex gap-2 items-center"
          @click="logout"
        >
          <i class="i-tabler-logout" />
          {{ t.dashboard.settings.other.logout }}
        </RBtn>
      </div>
    </CardBase>
    <CardBase class="p-6 border-red-9">
      <div class="text-xl mb-4 text-red-5">
        {{ t.dashboard.settings.dangerZone.title }}
      </div>
      <div class="op75 text-sm mb-4">
        {{ t.dashboard.settings.dangerZone.description }}
      </div>
      <div class="mb-2">
        <RBtn class="hover:bg-red-9! hover:border-red-9! flex gap-2 items-center">
          <i class="i-tabler-trash" />
          {{ t.dashboard.settings.dangerZone.button.removeAllData }}
        </RBtn>
      </div>
    </CardBase>
  </DashboardPageContent>
</template>
