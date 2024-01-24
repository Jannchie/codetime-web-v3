<script setup lang="ts">
// import { vAutoAnimate } from '@formkit/auto-animate'

const locale = useRoute().params.locale as string
const { data: user, pending } = await fetchUser()
const t = useI18N()

watchEffect(() => {
  if (!pending.value && !user.value) {
    setTimeout(() => {
      useHead({
        script: [
          {
            src: 'https://accounts.google.com/gsi/client',
            async: true,
          },
        ],
      })
    }, 1000)
  }
})
</script>

<template>
  <div
    class="h-96px flex flex-col items-center"
  >
    <ClientOnly>
      <div>
        <div
          v-if="pending"
          class="h-96px"
        />
        <div
          v-else-if="!user"
          class="flex flex-col gap-8"
          style="color-scheme: light;"
        >
          <div class="flex">
            <NuxtLink
              key="demo"
              :to="`/${locale}/dashboard`"
              class="hidden border border-surface-border-low rounded-xl bg-surface-base bg-transparent px-4 py-3 transition-all hover:bg-surface-low"
            >
              <div class="flex items-center gap-2 text-sm">
                <i class="i-eva-bar-chart-outline h-4 w-4" />
                <span>
                  {{ t.landing.demo }}
                </span>
              </div>
            </NuxtLink>
          <!-- <NuxtLink
            key="main"
            :href="`${$config.public.apiHost}/auth/github`"
            class="border border-primary-container rounded-xl bg-transparent px-4 py-3 transition-all hover:bg-primary-container hover:text-white"
          >
            <div class="flex items-center gap-2 text-sm">
              <i class="i-eva-github-outline h-4 w-4" />
              <span>
                {{ t.landing.loginWithGithub }}
              </span>
            </div>
          </NuxtLink> -->
          </div>
          <div class="flex flex-col items-center gap-3">
            <div class="text-sm text-surface-onlow">
              {{ t.landing.login }}
            </div>
            <div class="flex gap-2">
              <div
                id="g_id_onload"
                class="hidden"
                data-itp_support="true"
                data-client_id="1020029657488-f66ubcmj6qqg4h4ptjk505ljmkv55jkv.apps.googleusercontent.com"
                :data-login_uri="`${$config.public.apiHost}/auth/google`"
                data-nonce=""
              />
              <div
                class="g_id_signin"
                data-type="icon"
                data-shape="circle"
                data-theme="outline"
                data-text="signin_with"
                data-size="medium"
                data-locale="en-US"
              />
              <NuxtLink
                key="main"
                :href="`${$config.public.apiHost}/auth/github`"
                class="h-32px w-32px flex items-center justify-center rounded-full bg-white"
              >
                <i class="i-eva-github-fill h-5 w-5 bg-black" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <div
          v-else-if="user"
          class="h-96px"
        >
          <NuxtLink
            :to="`/${locale}/dashboard`"
            class="flex items-center gap-2 border border-primary-container rounded-xl bg-transparent px-4 py-3 transition-all hover:bg-primary-container hover:text-white"
          >
            <ClientOnly>
              <template #placeholder>
                <div class="h-5 w-5 animate-pulse rounded-full bg-surface-onlow" />
              </template>
              <NuxtImg
                v-if="user && user.avatar"
                key="main"
                :src="user.avatar"
                class="h-5 w-5 rounded-full"
              />
            </ClientOnly>
            <span class="text-sm">
              {{ t.landing.toDashboard }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style>
iframe {
  color-scheme: light !important;
}
</style>
