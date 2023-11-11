<script setup lang="ts">
import { Icon } from '@iconify/vue'

const locale = useRoute().params.locale as string
const user = useUser()
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      v-if="!user"
      class="flex gap-2"
    >
      <NuxtLink
        :to="`/${locale}/dashboard`"
        class="px-4 py-3 rounded-xl bg-transparent border border-neutral-8 bg-neutral-8 hover:bg-neutral-8 transition-all"
      >
        <div class="flex gap-2 items-center">
          <Icon
            class="w-4 h-4"
            icon="eva:bar-chart-outline"
          />
          <span>
            演示
          </span>
        </div>
      </NuxtLink>
      <NuxtLink
        :href="`${$config.public.apiHost}/auth/github`"
        class="px-4 py-3 rounded-xl bg-transparent border border-sky-8 hover:bg-sky-8 transition-all"
      >
        <div class="flex gap-2 items-center">
          <Icon
            class="w-4 h-4"
            icon="eva:github-outline"
          />
          <span>
            使用 Github 登录
          </span>
        </div>
      </NuxtLink>
    </div>
    <NuxtLink
      v-else
      :to="`/${locale}/dashboard`"
      class="px-4 py-3 flex gap-2 items-center rounded-xl bg-transparent border border-sky-8 hover:bg-sky-8 transition-all"
    >
      <NuxtImg
        :src="user.avatar"
        class="rounded-full w-6 h-6"
      />
      <span>
        仪表盘
      </span>
    </nuxtlink>
    <div class="text-xs op25 mt-2">
      目前完全免费，无需信用卡
    </div>
  </div>
</template>
