<script setup lang="ts">
import { Image } from '@roku-ui/vue'

const locale = useLocale()
// const currentTab = useCurrentTab(headerTabs)
const user = useUser()

const pending = autoResetRef(false, 1000)
pending.value = true

useHead({
  htmlAttrs: {
    lang: locale.value,
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
  <NuxtLayout name="default">
    <RHeader class="bg-surface-low px-2 pt-2">
      <div class="w-full flex flex-col gap-2 px-2 pt-2">
        <div
          class="h-34px flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <NuxtLink
              :to="`/${locale}`"
            >
              <NuxtImg
                alt="Code Time"
                src="/icon.svg"
                width="26"
                class="ml-2 mr-3"
              />
            </NuxtLink>
            <ClientOnly>
              <NuxtLink
                v-if="user"
                class="flex items-center gap-3 text-sm"
                :to="`/${locale}/dashboard`"
              >
                <Image
                  :src="user.avatar"
                  class="h-7 w-7 rounded-full"
                  height="28px"
                  width="28px"
                />
                <div class="hidden sm:block">
                  {{ user.username }}
                </div>
                <PlanTag
                  :plan="user.plan"
                />
              </NuxtLink>
              <div
                v-else-if="pending "
                class="flex items-center gap-3 text-sm"
              >
                <div
                  class="h-7 w-7 animate-pulse rounded-full bg-surface-variant-1 bg-op50"
                />
                <div class="h-1em w-16 animate-pulse rounded bg-surface-variant-1 bg-op50" />
              </div>
            </ClientOnly>
          </div>
          <div class="hidden items-center gap-2 sm:flex">
            <i class="i-tabler-language-hiragana h-6 w-6" />
            <LanguageSelect />
          </div>
        </div>
        <div class="mt-2 flex gap-2" />
      </div>
    </RHeader>
    <div>
      <slot />
    </div>
    <CodetimeFooter />
  </NuxtLayout>
</template>

<style scoped>
.header-title {
  font-family: "Share Tech Mono", monospace;
  font-size: 1.2rem;
}
</style>
