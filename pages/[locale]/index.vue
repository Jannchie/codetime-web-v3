<script setup lang="ts">
import Auxlines from 'auxlines'
import 'auxlines/style.css'

definePageMeta({
  layout: 'landing',
})
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
        <div class="text-sm op50 p-2">
          {{ t.landing.description }}
        </div>
      </div>
    </div>
  </Auxlines>
  <div class="flex justify-center m-8">
    <LoginButton />
  </div>

  <div class="mt-32">
    <LandingSumHours />
  </div>
</template>
