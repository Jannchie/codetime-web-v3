<script setup lang="ts">
import Auxlines from 'auxlines'
import 'auxlines/style.css'

definePageMeta({
  layout: 'landing',
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

  <div class="flex flex-col items-center mt-32">
    <span class="op50">
      已统计编程时间
    </span>
    <div class="text-6xl op75">
      <span class="font-bold font-mono">
        12,412,523,421
      </span>
      <span class="text-xl">
        小时
      </span>
    </div>
  </div>

  <div class="flex justify-center relative mt-32">
    <CardValue
      title="编程时间 / 今日"
      value="4.8"
      unit="小时"
    />
  </div>
</template>
