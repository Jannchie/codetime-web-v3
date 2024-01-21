<script setup lang="ts">
import { Modal, Paper } from '@roku-ui/vue'
import type { AsyncDataRequestStatus } from 'nuxt/dist/app/composables/asyncData'

const user = useUser()
const t = useI18N()
const modal = ref(false)
const status = autoResetRef<AsyncDataRequestStatus>('idle', 3000)
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
        刷新令牌
      </div>
      <div class="py-2 text-sm text-surface-onlow">
        你确定要刷新令牌吗？这会导致你已经应用在编辑器插件上的令牌失效。你需要重新输入新的令牌。
      </div>
      <div class="flex justify-end">
        <RBtn
          class="mr-2"
          @click="modal = false"
        >
          取消
        </RBtn>
        <RBtn
          @click="refreshToken"
        >
          确定
        </RBtn>
      </div>
    </Paper>
  </Modal>
</template>
