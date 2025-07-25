<script setup lang="ts">
import type { TagResponse } from '~/api/v3/types.gen'
import { Btn, Modal, Paper } from '@roku-ui/vue'

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

defineProps<Props>()
const emit = defineEmits<Emits>()

const t = useI18N()

const deleteModal = ref(false)
const tagToDelete = ref<TagResponse | null>(null)

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
      <h3 class="text-lg font-medium">
        {{ t.dashboard.tags.tagList.title }}
      </h3>
      <Btn
        variant="light"
        @click="emit('createNew')"
      >
        <template #leftSection>
          <i class="i-tabler-plus" />
        </template>
        {{ t.dashboard.tags.tagList.createTag }}
      </Btn>
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

    <div v-else class="space-y-2">
      <div
        v-for="tag in tags"
        :key="tag.id"
        class="cursor-pointer border rounded-lg bg-surface-variant-1 p-3 transition-colors"
        :class="{
          'border-primary bg-primary-container': selectedTag?.id === tag.id,
          'border-transparent hover:border-surface-variant-2': selectedTag?.id !== tag.id,
        }"
        @click="emit('select', tag)"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="h-8 w-8 rounded-lg shadow-sm"
              :style="{ backgroundColor: tag.color }"
            />
            <div>
              <h4 class="font-medium">
                {{ tag.name }}
              </h4>
              <p class="text-sm text-surface-dimmed">
                {{ new Date(tag.createdAt).toLocaleDateString() }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <Btn
              variant="light"
              @click.stop="emit('edit', tag)"
            >
              <template #leftSection>
                <i class="i-tabler-edit" />
              </template>
              {{ t.dashboard.tags.actions.edit }}
            </Btn>

            <Btn
              variant="light"
              color="error"
              @click.stop="showDeleteConfirm(tag)"
            >
              <template #leftSection>
                <i class="i-tabler-trash" />
              </template>
              {{ t.dashboard.tags.actions.delete }}
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
