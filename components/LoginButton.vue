<script setup lang="ts">
const locale = useRoute().params.locale as string
const user = inject<Ref<User | null>>('user', ref(null))
const t = useI18N()

const userPending = inject('user-pending')
const notLogin = computed(() => user.value === null || !userPending)
watchEffect(() => {
  if (notLogin.value && typeof window !== 'undefined') {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    setTimeout(()=>{
      document.head.appendChild(script)
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
              class="hidden border border-surface-border-low rounded-xl bg-surface-base bg-transparent px-4 py-3 transition-all hover:bg-surface-low"
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
            <div class="text-surface-onlow text-sm">
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
                aria-label="github"
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
            aria-label="dashboard"
            :to="`/${locale}/dashboard`"
            class="flex items-center gap-2 border border-primary-container rounded-xl bg-transparent px-4 py-3 transition-all hover:bg-primary-container hover:text-white"
          >
            <ClientOnly>
              <template #placeholder>
                <div class="h-5 w-5 animate-pulse rounded-full bg-surface-on-low" />
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
