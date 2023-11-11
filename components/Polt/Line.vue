<script setup lang="ts">
const data = [
  { date: '2022-01-01', sec: 1200 },
  { date: '2022-01-02', sec: 1500 },
  { date: '2022-01-03', sec: 7500 },
  { date: '2022-01-04', sec: 7200 },
  { date: '2022-01-05', sec: 6800 },
  { date: '2022-01-06', sec: 7000 },
  { date: '2022-01-07', sec: 7100 },
  { date: '2022-01-08', sec: 1800 },
  { date: '2022-01-09', sec: 2000 },
  { date: '2022-01-10', sec: 0 },
  { date: '2022-01-11', sec: 7400 },
  { date: '2022-01-12', sec: 7300 },
  { date: '2022-01-13', sec: 7200 },
  { date: '2022-01-14', sec: 7500 },
  { date: '2022-01-15', sec: 1600 },
  { date: '2022-01-16', sec: 3000 },
  { date: '2022-01-17', sec: 7600 },
  { date: '2022-01-18', sec: 7100 },
  { date: '2022-01-19', sec: 6900 },
  { date: '2022-01-20', sec: 7100 },
  { date: '2022-01-21', sec: 7300 },
  { date: '2022-01-22', sec: 3400 },
  { date: '2022-01-23', sec: 1800 },
  { date: '2022-01-24', sec: 0 },
  { date: '2022-01-25', sec: 7200 },
  { date: '2022-01-26', sec: 7000 },
  { date: '2022-01-27', sec: 7400 },
  { date: '2022-01-28', sec: 7100 },
  { date: '2022-01-29', sec: 1900 },
  { date: '2022-01-30', sec: 2200 },
  { date: '2022-01-31', sec: 7300 },
].map(d => ({ date: new Date(d.date), sec: d.sec }))
</script>

<template>
  <PoltRenderer
    :options="{

      color: {
        scheme: 'Set2',
      },
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
        Plot.barY(data, { x: 'date', y: 'sec', inset: 0.5 }),
        Plot.ruleY([0]),
        Plot.ruleX(data, Plot.pointerX({ x: 'date', py: 'sec', inset: 0.5, strokeOpacity: 0.5 })),
        // Plot.gridY({ interval: 3600, opacity: 0.5 }),
        Plot.crosshairX(data, { x: 'date', y: 'sec', textStroke: 'rgb(23 23 23 / var(--un-bg-opacity))' }),
      ],
    }"
  />
</template>

<style>
:root {
  --plot-background: rgb(23 23 23 / var(--un-bg-opacity));
}
</style>
