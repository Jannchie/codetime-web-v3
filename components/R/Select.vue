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
  set(value) {
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

onKeyStroke('ArrowDown', (e) => {
  if (focused.value) {
    e.preventDefault()
    keyboardIndex.value = (keyboardIndex.value + 1) % options.length
  }
})

onKeyStroke('ArrowUp', (e) => {
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
        class="r-select-input w-inherit cursor-pointer pl-2 py-1 pr-8 outline-none focus:border-sky-7 border border-neutral-7 rounded text-neutral-0 bg-neutral-8"
        placeholder="Select"
        readonly
        :value="currentLabel"
        aria-haspopup="listbox"
        autocomplete="off"
        @focus="focused = true"
      >
      <i class="i-tabler-chevron-down absolute right-2 pointer-events-none" />
    </div>
    <div
      v-if="focused"
      class="r-select-list p-1 overflow-hidden flex-col w-full mt-2 absolute border border-neutral-7 rounded bg-neutral-8 z-1"
    >
      <div
        v-for="option, i in options"
        :key="getId(option)"
        :class="{
          'hover-bg-neutral-9': keyboardIndex !== i,
          'bg-sky-7': keyboardIndex === i,
        }"
        class="r-select-item px-2 p-1 rounded flex gap-2 cursor-pointer items-center justify-between"
        @pointerdown="onItemPointerDown(option)"
        @hover="hoverIndex = i"
      >
        {{ getLabel(option) }}
        <div v-if="option === currentOption">
          <i class="i-tabler-check w-3 h-3" />
        </div>
      </div>
    </div>
  </div>
</template>
