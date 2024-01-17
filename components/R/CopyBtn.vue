<script setup lang="ts">
import { Btn } from '@roku-ui/vue'

const props = defineProps<{
  value: string
  size?: 'sm' | 'md' | 'lg'
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
  <Btn
    hover-variant="filled"
    class="w-20"
    :size="props.size ?? 'md'"
    @click="onClick"
  >
    <div
      v-if="ok"
      class="w-full flex items-center justify-around gap-2"
    >
      <i class="i-tabler-check" />
      <div>
        {{ t.button.copied }}
      </div>
    </div>
    <div
      v-else
      class="w-full flex items-center justify-around gap-2"
    >
      <i class="i-tabler-copy" />
      <div>
        {{ t.button.copy }}
      </div>
    </div>
  </Btn>
</template>
