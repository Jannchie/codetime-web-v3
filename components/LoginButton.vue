<script setup lang="ts">
const locale = useRoute().params.locale as string
const user = useUser()
const t = useI18N()
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
          <i
            class="w-4 h-4 i-eva-bar-chart-outline"
          />
          <span>
            {{ t.landing.demo }}
          </span>
        </div>
      </NuxtLink>
      <NuxtLink
        :href="`${$config.public.apiHost}/auth/github`"
        class="px-4 py-3 rounded-xl bg-transparent border border-sky-8 hover:bg-sky-8 transition-all"
      >
        <div class="flex gap-2 items-center">
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
      class="px-4 py-3 flex gap-2 items-center rounded-xl bg-transparent border border-sky-8 hover:bg-sky-8 transition-all"
    >
      <NuxtImg
        v-if="user.avatar"
        :src="user.avatar"
        class="rounded-full w-5 h-5"
      />
      <span class="text-sm">
        {{ t.landing.toDashboard }}
      </span>
    </nuxtlink>
    <div class="text-xs op25 mt-2">
      {{ t.landing.freeMessage }}
    </div>
  </div>
</template>
