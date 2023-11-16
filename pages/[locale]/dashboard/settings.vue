<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})
const user = useUser()
const token = computed(() => user.value?.upload_token ?? '')
const a = useClipboard({ source: token })
const router = useRouter()
router.push({
  params: { locale: 'zh-CN' },
})
const t = useI18N()
</script>

<template>
  <DashboardPageTitle
    :title="t.dashboard.pageHeader.title.settings"
    :description="t.dashboard.pageHeader.description.settings"
  />
  <DashboardPageContent>
    <CardBase class="p-6">
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
        <RBtn
          class="flex items-center gap-2"
          @click="a.copy(token)"
        >
          <i class="i-tabler-copy" />
          <div>
            {{ t.button.copy }}
          </div>
        </RBtn>
      </div>
      <div class="op50 text-xs">
        {{ t.dashboard.settings.token.tip }}
      </div>
    </CardBase>
    <CardBase class="p-6">
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
    <CardBase class="p-6">
      <div class="text-xl mb-4">
        {{ t.dashboard.settings.export.title }}
      </div>
      <div class="op75 text-sm mb-4">
        {{ t.dashboard.settings.export.description }}
      </div>
      <div class="mb-2">
        <RBtn class="flex gap-2 items-center">
          <i class="i-tabler-download" />
          {{ t.dashboard.settings.export.button }}
        </RBtn>
      </div>
      <div class="op50 text-xs">
        {{ t.dashboard.settings.export.tip }}
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
