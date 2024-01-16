<script setup lang="ts">
type Option = {
  id: number | string | symbol
  label: string
} | string | symbol | number

const props = defineProps<{
  modelValue: string | symbol | number | undefined
  options: Option[]
}>()

const emit = defineEmits(['update:modelValue', 'change'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value: any) {
    emit('update:modelValue', value)
  },
})

const inputRef = ref(null)
const wrapperRef = ref(null)

const { focused } = useFocus(inputRef)
const index = computed(() => props.options.map((d => getId(d))).indexOf(value.value))

const hoverIndex = ref(-1)
const keyboardIndex = ref(-1)

watchEffect(() => {
  if (!focused.value) {
    keyboardIndex.value = -1
  }
})

watchEffect(() => {
  value.value = getId(props.options[index.value])
})

watch(value, () => {
  emit('change', value.value)
})

const options = props.options

const currentOption = computed(() => options[index.value])
const currentLabel = computed(() => getLabel(currentOption.value))
function getLabel(option?: Option) {
  if (!option) {
    return undefined
  }
  if (typeof option === 'string' || typeof option === 'symbol' || typeof option === 'number') {
    return option
  }
  return option.label
}

function getId(option?: Option) {
  if (!option) {
    return undefined
  }
  if (typeof option === 'string' || typeof option === 'symbol' || typeof option === 'number') {
    return option
  }
  return option.id
}

onKeyStroke('ArrowDown', (e: { preventDefault: () => void }) => {
  if (focused.value) {
    e.preventDefault()
    keyboardIndex.value = (keyboardIndex.value + 1) % options.length
  }
})

onKeyStroke('ArrowUp', (e: { preventDefault: () => void }) => {
  if (focused.value) {
    e.preventDefault()
    keyboardIndex.value = (keyboardIndex.value - 1 + options.length) % options.length
  }
})

onKeyStroke('Enter', () => {
  if (focused.value && keyboardIndex.value !== -1) {
    value.value = getId(options[keyboardIndex.value])
    focused.value = false
  }
})
function onItemPointerDown(option: Option) {
  if (!focused.value) {
    focused.value = true
    return
  }
  value.value = getId(option)
  focused.value = false
}
</script>

<template>
  <div
    ref="wrapperRef"
    class="r-select-wrapper relative"
  >
    <div class="w-full flex items-center">
      <input
        ref="inputRef"
        class="r-select-input w-inherit cursor-pointer border border-surface-border-low rounded bg-surface-base py-1 pl-2 pr-8 outline-none focus:border-primary-container"
        placeholder="Select"
        readonly
        :value="currentLabel"
        aria-haspopup="listbox"
        autocomplete="off"
        @focus="focused = true"
      >
      <i class="i-tabler-chevron-down pointer-events-none absolute right-2" />
    </div>
    <div
      v-if="focused"
      class="r-select-list absolute z-1 mt-2 w-full flex-col overflow-hidden border border-surface-border-low rounded bg-surface-base p-1"
    >
      <div
        v-for="option, i in options"
        :key="getId(option)"
        :class="{
          'hover-bg-surface-low': keyboardIndex !== i,
          'bg-primary-container': keyboardIndex === i,
        }"
        class="r-select-item flex cursor-pointer items-center justify-between gap-2 rounded p-1 px-2"
        @pointerdown="onItemPointerDown(option)"
        @hover="hoverIndex = i"
      >
        {{ getLabel(option) }}
        <div v-if="option === currentOption">
          <i class="i-tabler-check h-3 w-3" />
        </div>
      </div>
    </div>
  </div>
</template>
