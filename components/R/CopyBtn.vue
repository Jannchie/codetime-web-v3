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
    class="w-18"
    :size="props.size ?? 'md'"
    :color="ok ? 'secondary' : 'primary'"
    @click="onClick"
  >
    <template #leftSection>
      <i
        v-if="ok"
        class="i-tabler-check"
      />
      <i
        v-else
        class="i-tabler-copy"
      />
    </template>

    <div
      v-if="ok"
      class="w-full flex items-center justify-around gap-2"
    >
      <div>
        {{ t.button.copy }}
      </div>
    </div>
    <div
      v-else
      class="w-full flex items-center justify-around gap-2"
    >
      <div>
        {{ t.button.copy }}
      </div>
    </div>
  </Btn>
</template>
