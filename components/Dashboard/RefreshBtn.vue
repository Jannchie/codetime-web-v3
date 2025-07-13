<script setup lang="ts">
import { Modal, Paper } from '@roku-ui/vue'
import { v3RefreshToken } from '~/api/v3'

const user = useUser()
const t = useI18N()
const modal = ref(false)
const status = autoResetRef<string>('idle', 3000)
async function refreshToken() {
  modal.value = false
  status.value = 'pending'
  try {
    const resp = await v3RefreshToken()
    if (resp.data && user.value) {
      user.value.upload_token = resp.data.token ?? ''
      status.value = 'success'
    }
    else {
      status.value = 'error'
    }
  }
  catch {
    status.value = 'error'
  }
}
</script>

<template>
  <RBtn
    class="mb-2"
    color="error"
    @click="modal = true"
  >
    <i
      :class="[{
        'i-tabler-refresh': status === 'idle',
        'i-tabler-refresh animate-spin': status === 'pending',
        'i-tabler-check': status === 'success',
        'i-tabler-alert-triangle': status === 'error',
      }]"
    />
    {{ t.dashboard.settings.token.refresh }}
  </RBtn>
  <Modal v-model="modal">
    <Paper class="max-w-md">
      <div>
        {{ t.dashboard.settings.token.refresh }}
      </div>
      <div class="py-2 text-sm text-surface-dimmed">
        {{ t.dashboard.settings.token.confirmRefresh }}
      </div>
      <div class="flex justify-end">
        <RBtn
          class="mr-2"
          @click="modal = false"
        >
          {{ t.general.cancel }}
        </RBtn>
        <RBtn
          @click="refreshToken"
        >
          {{ t.general.confirm }}
        </RBtn>
      </div>
    </Paper>
  </Modal>
</template>
