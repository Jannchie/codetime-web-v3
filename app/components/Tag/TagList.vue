<script setup lang="ts">
import type { TagResponse } from '~/api/v3/types.gen'
import { Btn, Modal, Paper } from '@roku-ui/vue'
import { useUser } from '~/utils'
import { getTagDisplay } from '~/utils/tag'

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
      <div class="flex flex-col gap-2 items-end">
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
        class="rounded-lg bg-surface-variant-1 h-16 animate-pulse"
      />
    </div>

    <div
      v-else-if="tags.length === 0"
      class="text-surface-dimmed py-8 text-center"
    >
      <i class="i-tabler-tag-off text-4xl mb-4" />
      <p>{{ t.dashboard.tags.tagList.noTags }}</p>
    </div>

    <div v-else class="gap-3 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
      <div
        v-for="tag in tags"
        :key="tag.id"
        class="group p-3 border rounded-lg bg-surface-variant-1 cursor-pointer transition-all hover:shadow-md"
        :class="{
          'border-primary bg-primary-container': selectedTag?.id === tag.id,
          'border-transparent hover:border-surface-variant-2': selectedTag?.id !== tag.id,
        }"
        @click="emit('select', tag)"
      >
        <div class="flex items-center justify-between">
          <div class="leading-0 flex flex-1 gap-2 min-w-0 items-center">
            <div class="flex flex-shrink-0 gap-1.5 items-center">
              <div
                class="text-xs font-medium rounded-full flex flex-shrink-0 h-6 w-6 items-center justify-center"
                :style="{ backgroundColor: tag.color, color: 'white' }"
              >
                {{ getTagDisplay(tag) }}
              </div>
            </div>
            <div class="min-w-0">
              <h4 class="text-sm font-medium truncate">
                {{ tag.name }}
              </h4>
              <p class="text-xs text-surface-dimmed">
                {{ new Date(tag.createdAt).toLocaleDateString() }}
              </p>
            </div>
          </div>

          <div class="opacity-0 flex gap-1 transition-opacity items-center group-hover:opacity-100">
            <Btn
              icon
              variant="subtle"
              @click.stop="emit('edit', tag)"
            >
              <i class="i-tabler-edit text-sm" />
            </Btn>

            <Btn
              icon
              color="error"
              variant="subtle"
              @click.stop="showDeleteConfirm(tag)"
            >
              <i class="i-tabler-trash text-sm" />
            </Btn>
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

      <div class="text-sm mb-6">
        <p class="mb-2">
          {{ t.dashboard.tags.deleteConfirm.deleteTagMessage }}
        </p>
        <div v-if="tagToDelete" class="p-2 rounded-lg bg-surface-variant-1 flex gap-2 items-center">
          <div
            class="text-xs font-medium rounded-full flex h-6 w-6 items-center justify-center"
            :style="{ backgroundColor: tagToDelete.color, color: 'white' }"
          >
            {{ getTagDisplay(tagToDelete) }}
          </div>
          <span class="font-medium">{{ tagToDelete.name }}</span>
        </div>
      </div>

      <div class="flex gap-2 justify-end">
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
