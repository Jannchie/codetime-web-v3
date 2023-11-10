<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="flex gap-2">
      <button class="p-4 rounded-xl bg-transparent border border-neutral-8 bg-neutral-8 hover:bg-neutral-8 transition-all">
        <div class="flex gap-2 items-center">
          <Icon
            class="w-4 h-4"
            icon="eva:bar-chart-outline"
          />
          <span>
            演示仪表盘
          </span>
        </div>
      </button>
      <button class="p-4 rounded-xl bg-transparent border border-neutral-8 bg-neutral-8 hover:bg-neutral-8 transition-all">
        <div class="flex gap-2 items-center">
          <Icon
            class="w-4 h-4"
            icon="eva:github-outline"
          />
          <span>
            使用 Github 登录
          </span>
        </div>
      </button>
    </div>
    <div class="text-xs op25 mt-2">
      目前完全免费，无需信用卡
    </div>
  </div>
</template>
