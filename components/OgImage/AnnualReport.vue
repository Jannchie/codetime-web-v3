<script setup lang="ts">
/**
 * @credits @arashsheyda <https://github.com/arashsheyda>
 */
withDefaults(defineProps<{
  title?: string
  description?: string
  bg?: string
  logo?: string
  avatar?: string
  image?: string
  username?: string
}>(), {
  bg: 'linear-gradient(to bottom right, #0067cc, #131313)',
})
</script>

<template>
  <div
    class="relative h-full w-full flex items-center justify-center border-2 border-white bg-neutral-900 text-white"
    :style="{ backgroundImage: bg }"
  >
    <div
      v-if="image"
      class="absolute inset-0 h-full w-full bg-center opacity-10"
      :style="{ backgroundImage: `url(${image})` }"
    />
    <div class="flex flex-col items-center text-center">
      <h1 class="flex gap-4 text-7xl font-bold">
        <img
          v-if="logo"
          class="h-18 w-18"
          :src="logo"
          :name="logo"
        >
        {{ title }}
      </h1>
      <p class="max-w-3xl text-2xl">
        {{ description }}
      </p>
    </div>

    <div class="absolute bottom-0 left-0 flex flex-row gap-2 p-5">
      <img
        v-if="avatar"
        :src="avatar"
        class="h-12 w-12 rounded-full"
      >
      <div
        v-if="username"
        class="text-4xl font-bold"
      >
        {{ username }}
      </div>
    </div>
  </div>
</template>
