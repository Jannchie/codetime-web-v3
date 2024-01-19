<script setup lang="ts">
// import { vAutoAnimate } from '@formkit/auto-animate'

const locale = useRoute().params.locale as string
const { data: user } = await fetchUser()
const t = useI18N()
</script>

<template>
  <ClientOnly>
    <template #placeholder>
      <div class="h-46px w-132px animate-pulse rounded-xl bg-surface-onlow" />
    </template>
    <div
      class="flex flex-col items-center"
    >
      <div>
        <div
          v-if="!user"
          class="flex gap-2"
        >
          <NuxtLink
            key="demo"
            :to="`/${locale}/dashboard`"
            class="border border-surface-border-low rounded-xl bg-surface-base bg-transparent px-4 py-3 transition-all hover:bg-surface-low"
          >
            <div class="flex items-center gap-2 text-sm">
              <i class="i-eva-bar-chart-outline h-4 w-4" />
              <span>
                {{ t.landing.demo }}
              </span>
            </div>
          </NuxtLink>
          <NuxtLink
            key="main"
            :href="`${$config.public.apiHost}/auth/github`"
            class="border border-primary-container rounded-xl bg-transparent px-4 py-3 transition-all hover:bg-primary-container"
          >
            <div class="flex items-center gap-2 text-sm">
              <i class="i-eva-github-outline h-4 w-4" />
              <span>
                {{ t.landing.loginWithGithub }}
              </span>
            </div>
          </NuxtLink>
        </div>
        <NuxtLink
          v-else
          :to="`/${locale}/dashboard`"
          class="flex items-center gap-2 border border-primary-container rounded-xl bg-transparent px-4 py-3 transition-all hover:bg-primary-container hover:text-white"
        >
          <NuxtImg
            v-if="user.avatar"
            key="main"
            :src="user.avatar"
            class="h-5 w-5 rounded-full"
          />
          <span class="text-sm">
            {{ t.landing.toDashboard }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </ClientOnly>
</template>
