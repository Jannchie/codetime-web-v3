<script setup lang="ts">
import { Btn, Modal, Paper, TextField } from '@roku-ui/vue'
import { v3DeleteUserData } from '~/api/v3'

const t = useI18N()
const modal = ref(false)
const deletePrompt = ref('')
async function deleteAllData() {
  if (deletePrompt.value !== 'DELETE') {
    return
  }
  modal.value = false
  await v3DeleteUserData()
}
</script>

<template>
  <CardBase
    sparse
    class="border-error-container"
  >
    <div class="mb-4 text-xl text-error-7 dark:text-error-5">
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
          {{ t.dashboard.settings.dangerZone.button.removeAllData }}
        </div>
        <div class="py-2 text-sm text-surface-dimmed">
          <div class="pb-2">
            {{ t.dashboard.settings.dangerZone.button.removeAllDataModal.p1 }}
          </div>
          <div class="pb-2">
            {{ t.dashboard.settings.dangerZone.button.removeAllDataModal.p2 }}
          </div>
          <div class="pb-2">
            {{ t.dashboard.settings.dangerZone.button.removeAllDataModal.p3 }}
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
