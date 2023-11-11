<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})
const user = useUser()
const token = computed(() => user.value?.upload_token ?? '')
const a = useClipboard({ source: token })
</script>

<template>
  <DashboardPageTitle
    title="设置"
    description="管理您的 CodeTime 设置，包含外观、语言、数据等。"
  />
  <DashboardPageContent>
    <CardBase class="p-6">
      <div class="text-xl mb-4">
        令牌
      </div>
      <div class="mb-2 flex gap-2">
        <RTextField
          class="py-1 px-2 rounded border border-neutral-7 bg-neutral-8 outline-none"
          readonly
          type="password"
          :value="token"
        />
        <RBtn
          @click="a.copy(token)"
        >
          复制
        </RBtn>
      </div>
      <div class="op50 text-xs">
        这个令牌用于上传你的数据到服务器。请保持它的私密性。
      </div>
    </CardBase>
    <CardBase class="p-6">
      <div class="text-xl mb-4">
        语言
      </div>
      <div class="mb-2">
        <LanguageSelect />
      </div>
      <div class="op50 text-xs">
        选择您的语言。
      </div>
    </CardBase>
    <CardBase class="p-6">
      <div class="text-xl mb-4">
        导出
      </div>
      <div class="op75 text-sm mb-4">
        我们支持网站数据导出功能，以确保数据的安全备份、便捷迁移、深入分析与合规性，同时赋予您对其数据完全的控制权和透明度。
      </div>
      <div class="mb-2">
        <RBtn>
          一键导出
        </RBtn>
      </div>
      <div class="op50 text-xs">
        导出您的数据到 CSV 文件。
      </div>
    </CardBase>
    <CardBase class="p-6 border-red-9">
      <div class="text-xl mb-4">
        危险区域
      </div>
      <div class="op75 text-sm mb-4">
        这里的操作可能会导致数据丢失，或者无法恢复。请谨慎操作。
      </div>
      <div class="mb-2">
        <RBtn class="hover:bg-red-9! hover:border-red-9!">
          删除所有数据
        </RBtn>
      </div>
    </CardBase>
    <div />
  </DashboardPageContent>
</template>
