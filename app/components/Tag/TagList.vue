<script setup lang="ts">
import type { TagResponse } from '~/api/v3/types.gen'
import { Btn, Modal, Paper } from '@roku-ui/vue'
import { useUser } from '~/utils'

type Props = {
  tags: TagResponse[]
  selectedTag: TagResponse | null
  loading: boolean
}

type Emits = {
  (e: 'select', tag: TagResponse): void
  (e: 'edit', tag: TagResponse): void
  (e: 'delete', tagId: string): void
  (e: 'createNew'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const t = useI18N()
const user = useUser()

const deleteModal = ref(false)
const tagToDelete = ref<TagResponse | null>(null)

// 检查用户是否为 free 用户以及标签数量限制
const isFreeUser = computed(() => user.value?.plan === 'free')
const maxTagsForFree = 3
const canCreateMoreTags = computed(() => {
  if (!isFreeUser.value) {
    return true
  }
  return (props.tags?.length || 0) < maxTagsForFree
})

function showDeleteConfirm(tag: TagResponse) {
  tagToDelete.value = tag
  deleteModal.value = true
}

function confirmDelete() {
  if (tagToDelete.value) {
    emit('delete', tagToDelete.value.id)
    deleteModal.value = false
    tagToDelete.value = null
  }
}

function cancelDelete() {
  deleteModal.value = false
  tagToDelete.value = null
}
</script>

<template>
  <CardBase>
    <div class="mb-4 flex items-center justify-between">
      <div>
        <h3 class="text-lg font-medium">
          {{ t.dashboard.tags.tagList.title }}
        </h3>
        <p v-if="isFreeUser" class="text-sm text-surface-dimmed">
          {{ t.dashboard.tags.tagList.freeUserLimit }} {{ props.tags?.length || 0 }}/{{ maxTagsForFree }}
        </p>
      </div>
      <div class="flex flex-col items-end gap-2">
        <Btn
          variant="light"
          :disabled="!canCreateMoreTags"
          @click="emit('createNew')"
        >
          <template #leftSection>
            <i class="i-tabler-plus" />
          </template>
          {{ t.dashboard.tags.tagList.createTag }}
        </Btn>
        <div v-if="!canCreateMoreTags && isFreeUser" class="text-xs text-surface-dimmed">
          {{ t.dashboard.tags.tagList.upgradeForMore }}
        </div>
      </div>
    </div>

    <div v-if="loading" class="space-y-2">
      <div
        v-for="i in 3"
        :key="i"
        class="h-16 animate-pulse rounded-lg bg-surface-variant-1"
      />
    </div>

    <div
      v-else-if="tags.length === 0"
      class="py-8 text-center text-surface-dimmed"
    >
      <i class="i-tabler-tag-off mb-4 text-4xl" />
      <p>{{ t.dashboard.tags.tagList.noTags }}</p>
      <Btn
        variant="light"
        class="mt-4"
        @click="emit('createNew')"
      >
        <template #leftSection>
          <i class="i-tabler-plus" />
        </template>
        {{ t.dashboard.tags.tagList.createTag }}
      </Btn>
    </div>

    <div v-else class="grid grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2">
      <div
        v-for="tag in tags"
        :key="tag.id"
        class="group cursor-pointer border rounded-lg bg-surface-variant-1 p-3 transition-all hover:shadow-md"
        :class="{
          'border-primary bg-primary-container': selectedTag?.id === tag.id,
          'border-transparent hover:border-surface-variant-2': selectedTag?.id !== tag.id,
        }"
        @click="emit('select', tag)"
      >
        <div class="flex items-center justify-between">
          <div class="min-w-0 flex flex-1 items-center gap-2">
            <div
              class="h-4 w-4 flex-shrink-0 rounded shadow-sm"
              :style="{ backgroundColor: tag.color }"
            />
            <div class="min-w-0">
              <h4 class="truncate text-sm font-medium">
                {{ tag.name }}
              </h4>
              <p class="text-xs text-surface-dimmed">
                {{ new Date(tag.createdAt).toLocaleDateString() }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              class="rounded p-1 text-surface-dimmed hover:bg-surface-variant-2 hover:text-surface"
              @click.stop="emit('edit', tag)"
            >
              <i class="i-tabler-edit text-sm" />
            </button>

            <button
              class="hover:bg-error/10 rounded p-1 text-surface-dimmed hover:text-error"
              @click.stop="showDeleteConfirm(tag)"
            >
              <i class="i-tabler-trash text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </CardBase>

  <!-- 删除确认模态框 -->
  <Modal v-model="deleteModal">
    <Paper class="w-md" with-border>
      <div class="mb-4">
        <h3 class="text-lg text-error font-semibold">
          {{ t.dashboard.tags.deleteConfirm.deleteTag }}
        </h3>
      </div>

      <div class="mb-6 text-sm">
        <p class="mb-2">
          {{ t.dashboard.tags.deleteConfirm.deleteTagMessage }}
        </p>
        <div v-if="tagToDelete" class="flex items-center gap-2 rounded-lg bg-surface-variant-1 p-2">
          <div
            class="h-4 w-4 rounded"
            :style="{ backgroundColor: tagToDelete.color }"
          />
          <span class="font-medium">{{ tagToDelete.name }}</span>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Btn
          variant="default"
          @click="cancelDelete"
        >
          {{ t.dashboard.tags.deleteConfirm.cancel }}
        </Btn>
        <Btn
          variant="filled"
          color="error"
          @click="confirmDelete"
        >
          {{ t.dashboard.tags.deleteConfirm.delete }}
        </Btn>
      </div>
    </Paper>
  </Modal>
</template>
