<script setup lang="ts">
const data = []
</script>

<template>
  <PoltRenderer
    v-if="data"
    :options="{
      x: {
        axis: 'top',
        interval: 'day',
        label: 'Date',
      },
      y: {
        nice: true,
        axis: 'both',
      },
      height: 200,
      marks: [
        Plot.barY(data, { x: 'date', y: 'duration', inset: 0.5 }),
        Plot.ruleY([0]),
        Plot.ruleX(data, Plot.pointerX({ x: 'date', py: 'duration', inset: 0.5, strokeOpacity: 0.5 })),
        // Plot.gridY({ interval: 3600, opacity: 0.5 }),
        Plot.crosshairX(data, { x: 'date', y: 'duration', textStroke: 'rgb(23 23 23 / var(--un-bg-opacity))' }),
      ],
    }"
  />
</template>
