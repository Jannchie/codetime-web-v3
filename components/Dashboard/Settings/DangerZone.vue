<script setup lang="ts">
import { Btn, Modal, Paper, TextField } from '@roku-ui/vue'

const t = useI18N()
const modal = ref(false)
const deletePrompt = ref('')
function deleteAllData() {
  if (deletePrompt.value !== 'DELETE') {
    return
  }
  modal.value = false
  useAPIFetch('/user/records', {
    method: 'DELETE',
  })
}
</script>

<template>
  <CardBase
    sparse
    class="border-error-container"
  >
    <div class="mb-4 text-xl text-error-container">
      {{ t.dashboard.settings.dangerZone.title }}
    </div>
    <div class="mb-4 text-sm op75">
      {{ t.dashboard.settings.dangerZone.description }}
    </div>
    <div class="mb-2">
      <RBtn
        color="error"
        @click="modal = true"
      >
        <i class="i-tabler-trash" />
        {{ t.dashboard.settings.dangerZone.button.removeAllData }}
      </RBtn>
    </div>
    <Modal v-model="modal">
      <Paper class="max-w-md">
        <div>
          删除所有数据
        </div>
        <div class="py-2 text-sm text-surface-onlow">
          <div class="pb-2">
            你确定要删除所有数据吗？这会导致你的所有数据都会被删除，且无法恢复。
          </div>
          <div class="pb-2">
            你的数据非常重要，你可以先导出数据，再进行数据删除。
          </div>
          <div class="pb-2">
            如果你想删除所有数据，请在下方输入 DELETE，然后点击确定。
          </div>
        </div>
        <div class="py-2">
          <TextField
            v-model="deletePrompt"
            placeholder="DELETE"
            class="w-full"
          />
        </div>
        <div class="flex justify-end">
          <Btn
            class="mr-2"
            @click="modal = false"
          >
            取消
          </Btn>
          <Btn

            variant="filled"
            :disabled="deletePrompt !== 'DELETE'"
            @click="deleteAllData"
          >
            确定
          </Btn>
        </div>
      </Paper>
    </Modal>
  </CardBase>
</template>
