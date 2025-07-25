<script setup lang="ts">
import type { TagResponse } from '~/api/v3/types.gen'
import { v3CreateTag, v3DeleteTag, v3GetTags, v3UpdateTag } from '~/api/v3'

definePageMeta({
  layout: 'dashboard',
})
const t = useI18N()
const selectedTag = ref<TagResponse | null>(null)
const showTagForm = ref(false)
const editingTag = ref<TagResponse | null>(null)

// 获取标签列表
const { data: tags, refresh: refreshTags } = useAsyncData('tags', async () => {
  try {
    const response = await v3GetTags()
    return response.data || []
  }
  catch (error_) {
    console.error('Failed to fetch tags:', error_)
    return []
  }
}, {
  server: false,
})

// 创建或更新标签
async function saveTag(tagData: { name: string, color: string }) {
  try {
    editingTag.value
      ? await v3UpdateTag({
          path: { tag_id: editingTag.value.id },
          body: tagData,
        })
      : await v3CreateTag({
          body: tagData,
        })
    await refreshTags()
    closeTagForm()
  }
  catch (error_) {
    console.error('Failed to save tag:', error_)
  }
}

// 编辑标签
function editTag(tag: TagResponse) {
  editingTag.value = tag
  showTagForm.value = true
}

// 删除标签
async function deleteTag(tagId: string) {
  try {
    await v3DeleteTag({
      path: { tag_id: tagId },
    } as any)
    await refreshTags()
    if (selectedTag.value?.id === tagId) {
      selectedTag.value = null
    }
  }
  catch (error_) {
    console.error('Failed to delete tag:', error_)
  }
}

// 选择标签
function selectTag(tag: TagResponse) {
  selectedTag.value = tag
}

// 关闭表单
function closeTagForm() {
  showTagForm.value = false
  editingTag.value = null
}
</script>

<template>
  <DashboardPageTitle
    :title="t.dashboard.pageHeader.title.tags"
    :description="t.dashboard.pageHeader.description.tags"
  />

  <DashboardPageContent>
    <div class="flex flex-col gap-4">
      <!-- 标签列表 -->
      <div>
        <TagList
          :tags="tags || []"
          :selected-tag="selectedTag"
          :loading="!tags"
          @select="selectTag"
          @edit="editTag"
          @delete="deleteTag"
          @create-new="showTagForm = true"
        />
      </div>

      <!-- 标签规则管理 -->
      <div>
        <TagRuleManager
          v-if="selectedTag"
          :tag="selectedTag"
          @refresh="refreshTags"
        />
        <CardBase v-else class="h-full min-h-64 flex items-center justify-center">
          <div class="text-center text-surface-dimmed">
            <i class="i-tabler-tag mb-4 text-4xl" />
            <p>{{ t.dashboard.tags.tagRules.selectTagPrompt }}</p>
          </div>
        </CardBase>
      </div>
    </div>
  </DashboardPageContent>

  <!-- 标签表单弹窗 -->
  <TagForm
    v-model="showTagForm"
    :tag="editingTag"
    @save="saveTag"
    @close="closeTagForm"
  />
</template>
