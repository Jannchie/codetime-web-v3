<script setup lang="ts">
import Auxlines from 'auxlines'
import 'auxlines/style.css'

definePageMeta({
  middleware: ['i18n'],
  layout: 'landing',
})
const t = useI18N()
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
        <div class="p-2 text-sm op50">
          {{ t.landing.description }}
        </div>
      </div>
    </div>
  </Auxlines>
  <div class="m-8 flex justify-center">
    <LoginButton />
  </div>
  <div class="mt-32">
    <LandingSumHours />
  </div>
</template>
