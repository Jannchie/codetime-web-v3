<script setup lang="ts">
import type { UserSelfPublic } from '~/api/v3'
import { Btn } from '@roku-ui/vue'
import NuxtLink from '~/i18n/NuxtLink.vue'

const locale = useRoute().params.locale as string
const user = inject<Ref<UserSelfPublic | null>>('user', ref(null))
const t = useI18N()

const userPending = inject('user-pending')
const notLogin = computed(() => user.value === null || !userPending)

const isGitHubLoading = ref(false)

watchEffect(() => {
  if (notLogin.value && globalThis.window !== undefined) {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    setTimeout(() => {
      document.head.append(script)
    }, 1000)
  }
})

// Handle GitHub OAuth
async function handleGitHubLogin() {
  isGitHubLoading.value = true

  try {
    const clientId = 'ace5a9368bb676886187' // GitHub App Client ID
    const scope = 'user:email'
    const state = Math.random().toString(36).slice(2, 15)

    // Store state for verification
    sessionStorage.setItem('github_oauth_state', state)
    sessionStorage.setItem('github_oauth_redirect', globalThis.location.href)

    const authUrl = `https://github.com/login/oauth/authorize?`
      + `client_id=${clientId}&`
      + `scope=${encodeURIComponent(scope)}&`
      + `state=${state}`

    globalThis.location.href = authUrl
  }
  catch (error) {
    console.error('GitHub OAuth initiation failed:', error)
    isGitHubLoading.value = false
  }
}
</script>

<template>
  <div
    class="h-96px flex flex-col items-center"
  >
    <ClientOnly>
      <div>
        <div
          v-if="userPending"
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
              aria-label="demo"
              :to="`/${locale}/dashboard`"
              class="border-surface-border-low hover:bg-surface-low hidden border rounded-xl bg-surface-base bg-transparent px-4 py-3 transition-all"
            >
              <div class="flex items-center gap-2 text-sm">
                <i class="i-eva-bar-chart-outline h-4 w-4" />
                <span>
                  {{ t.landing.demo }}
                </span>
              </div>
            </NuxtLink>
          </div>
          <div class="flex flex-col items-center gap-3">
            <div class="text-sm text-surface-dimmed">
              {{ t.landing.login }}
            </div>
            <div class="flex gap-2">
              <div
                id="g_id_onload"
                class="hidden"
                data-itp_support="true"
                data-client_id="1020029657488-f66ubcmj6qqg4h4ptjk505ljmkv55jkv.apps.googleusercontent.com"
                :data-login_uri="`${$config.public.apiHost}/v3/auth/google`"
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
              <button
                key="github"
                aria-label="github"
                :disabled="isGitHubLoading"
                class="h-32px w-32px flex items-center justify-center border border-[#dadce0] rounded-full bg-white transition-colors disabled:cursor-not-allowed hover:bg-gray-50 disabled:opacity-50"
                @click="handleGitHubLogin"
              >
                <i
                  v-if="!isGitHubLoading"
                  class="i-eva-github-fill h-5 w-5 bg-black"
                />
                <i
                  v-else
                  class="i-eva-loader-outline h-5 w-5 animate-spin bg-black"
                />
              </button>
            </div>
          </div>
        </div>

        <div
          v-else-if="user"
          class="h-96px"
        >
          <Btn
            :is="NuxtLink"
            variant="light"
            size="lg"
            color="black"
            aria-label="dashboard"
            :to="`/${locale}/dashboard`"
            class="flex items-center gap-2 rounded-xl px-4 py-3"
          >
            <ClientOnly>
              <template #placeholder>
                <div class="h-5 w-5 animate-pulse rounded-full" />
              </template>
              <NuxtImg
                v-if="user && user.avatar"
                key="main"
                alt="avatar"
                :src="user.avatar"
                class="h-5 w-5 rounded-full"
              />
            </ClientOnly>
            <span class="text-sm">
              {{ t.landing.toDashboard }}
            </span>
          </Btn>
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
