<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate'

const locale = useRoute().params.locale as string
const user = useUser()
const t = useI18N()
</script>

<template>
  <div
    class="flex flex-col items-center"
  >
    <div
      v-auto-animate
    >
      <div
        v-if="!user"
        class="flex gap-2"
      >
        <NuxtLink
          key="demo"
          :to="`/${locale}/dashboard`"
          class="px-4 py-3 rounded-xl bg-transparent border border-border-1 bg-back-2 hover:bg-back-1 transition-all"
        >
          <div class="flex gap-2 items-center text-sm">
            <i class="w-4 h-4 i-eva-bar-chart-outline" />
            <span>
              {{ t.landing.demo }}
            </span>
          </div>
        </NuxtLink>
        <NuxtLink
          key="main"
          :href="`${$config.public.apiHost}/auth/github`"
          class="px-4 py-3 rounded-xl bg-transparent border border-primary-2 hover:bg-primary-2 transition-all"
        >
          <div class="flex gap-2 items-center text-sm">
            <i class="w-4 h-4 i-eva-github-outline" />
            <span>
              {{ t.landing.loginWithGithub }}
            </span>
          </div>
        </NuxtLink>
      </div>
      <NuxtLink
        v-else
        :to="`/${locale}/dashboard`"
        class="px-4 py-3 flex gap-2 items-center rounded-xl bg-transparent border border-primary-2 hover:bg-primary-2 transition-all hover:text-white"
      >
        <NuxtImg
          v-if="user.avatar"
          key="main"
          :src="user.avatar"
          class="rounded-full w-5 h-5"
        />
        <span class="text-sm">
          {{ t.landing.toDashboard }}
        </span>
      </nuxtlink>
    </div>
    <div
      key="freeMessage"
      class="text-xs op25 mt-2"
    >
      {{ t.landing.freeMessage }}
    </div>
  </div>
</template>
