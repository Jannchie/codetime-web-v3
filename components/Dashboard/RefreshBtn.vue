<script setup lang="ts">
import { Modal, Paper } from '@roku-ui/vue'

const user = useUser()
const t = useI18N()
const modal = ref(false)
const status = autoResetRef<string>('idle', 3000)
async function refreshToken() {
  modal.value = false
  const resp = await useAPIFetch<User>('/user/token/refresh', {
    method: 'POST',
  })
  watchEffect(() => {
    if (resp.data.value && user.value) {
      user.value.upload_token = resp.data.value.upload_token ?? ''
    }
  })
  watchEffect(() => {
    status.value = resp.status.value
  })
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
      <div class="py-2 text-sm text-surface-onlow">
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
