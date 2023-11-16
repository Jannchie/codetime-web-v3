<script setup lang="ts">
import autoAnimate from '@formkit/auto-animate'

const props = defineProps<{
  value: string
}>()
defineEmits(['click'])
const value = computed(() => props.value)
const t = useI18N()
const c = useClipboard({ source: value })
const ok = autoResetRef(false, 1000)
function onClick() {
  c.copy(value.value)
  ok.value = true
}
</script>

<template>
  <RBtn
    :class="{ ['hover:bg-green-9! hover:border-green-9!']: ok }"
    @click="onClick"
  >
    <div
      v-if="ok"
      class="flex items-center gap-2"
    >
      <i class="i-tabler-check" />
      <div>
        {{ t.button.copied }}
      </div>
    </div>
    <div
      v-else
      class="flex items-center gap-2"
    >
      <i class="i-tabler-copy" />
      <div>
        {{ t.button.copy }}
      </div>
    </div>
  </RBtn>
</template>
