<script setup lang="ts">
import * as d3 from 'd3'
import { Btn, Modal, Paper } from '@roku-ui/vue'

const days = defineModel<number>('days', { default: 28 })

const { state, index, next, prev } = useCycleList([
  1,
  3,
  7,
  14,
  28,
  90,
  365,
  365 * 2,
  365 * 100,
], {
  initialValue: days.value,
})

watchEffect(() => {
  days.value = state.value
})
const t = useI18N()

const user = useUser()
const priceModal = ref(false)
function onPrev() {
  if (index.value === 0 && user.value?.plan === 'free') {
    priceModal.value = true
    return
  }
  prev()
}
function onNext() {
  if (index.value === 5 && user.value?.plan === 'free') {
    priceModal.value = true
    return
  }
  next()
}
useI18N()

const isAnuual = ref(true)
</script>

<template>
  <Modal v-model="priceModal">
    <div class="min-w-72 flex flex-col gap-8">
      <Paper class="max-w-92">
        <div class="text-xl font-bold">
          {{ t.plan.modal.title }}
        </div>
        <div class="mt-4 w-full text-sm text-surface-onlow children:py-1">
          <p>
            {{ t.plan.modal.p1 }}
          </p>
          <p>
            {{ t.plan.modal.p2 }}
          </p>
          <p>
            {{ t.plan.modal.p3 }}
          </p>
          <a href="mailto:admin@codetime.dev">admin@codetime.dev</a>
        </div>
      </Paper>
      <div class="relative">
        <ProPricePaper
          variant="monthly"
          class="min-h-500px"
        />
      </div>
    </div>
  </Modal>
  <div class="ml-4 mt-8">
    <div class="flex gap-2">
      <div>
        <div class="flex items-center gap-2">
          <Btn
            icon
            size="sm"
            @click="onPrev"
          >
            <i class="i-tabler-chevron-left" />
          </Btn>
          <div v-if="days !== 36500">
            {{ t.dashboard.overview.dataRange.title(days) }}
          </div>
          <div v-else>
            {{ t.dashboard.overview.dataRange.allTime }}
          </div>
          <Btn
            size="sm"
            icon
            @click="onNext"
          >
            <i class="i-tabler-chevron-right" />
          </Btn>
        </div>
        <div class="text-sm text-surface-onlow">
          <div v-if="days !== 36500">
            <span>
              {{ d3.timeFormat('%Y-%m-%d')(new Date(Date.now() - days * 24 * 60 * 60 * 1000)) }}
            </span>

            <span> ~ </span>

            <span>
              {{ d3.timeFormat('%Y-%m-%d')(new Date()) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
