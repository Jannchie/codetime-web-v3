<script setup lang="ts">
import Auxlines from 'auxlines'
import 'auxlines/style.css'

definePageMeta({
  layout: 'landing',
})

useSeoMeta({
  title: 'CodeTime - 追迹你的编程时间',
  description: 'CodeTime 是一款专为开发者设计的应用，帮助您追踪、分析和提高您的编程时间管理技能。',
  ogTitle: 'CodeTime - 追迹你的编程时间',
  ogDescription: 'CodeTime 是一款专为开发者设计的应用，帮助您追踪、分析和提高您的编程时间管理技能。',
  ogImage: '/icon.png',
  ogUrl: 'https://codetime.dev',
  twitterTitle: 'CodeTime - 追迹你的编程时间',
  twitterDescription: 'CodeTime 是一款专为开发者设计的应用，帮助您追踪、分析和提高您的编程时间管理技能。',
  twitterImage: '/icon.png',
  twitterCard: 'summary',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/icon.png',
    },
  ],
})
</script>

<template>
  <Auxlines
    :min-deepth="1"
    :max-deepth="4"
  >
    <div class="flex justify-center pt-24">
      <div
        class="flex flex-col items-center"
      >
        <LandingTitle />
        <div class="text-sm op50 p-2">
          CodeTime 是一款专为开发者设计的应用，帮助您追踪、分析和提高您的编程时间管理技能。
        </div>
      </div>
    </div>
  </Auxlines>
  <div class="flex justify-center m-8">
    <LoginButton />
  </div>

  <div class="mt-32">
    <LandingSumHours />
  </div>

  <div class="flex justify-center relative mt-32">
    <CardValue
      title="编程时间 / 今日"
      value="4.8"
      unit="小时"
    />
  </div>
  <div class="flex justify-center relative mt-32">
    <CardBase>
      <PoltLine />
    </CardBase>
  </div>
</template>

<style>
.plot {
  --plot-background: rgb(23 23 23 / var(--un-bg-opacity));
  background: rgb(23 23 23 / var(--un-bg-opacity)) !important;
}
.y-grid {
  stroke-dasharray: 2 2;
}
</style>
