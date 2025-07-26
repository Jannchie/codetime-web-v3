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
    class="text-white bg-neutral-900 flex h-full w-full items-center justify-center relative"
    :style="{ backgroundImage: bg }"
  >
    <div
      v-if="image"
      class="opacity-10 h-full w-full inset-0 absolute bg-center"
      :style="{ backgroundImage: `url(${image})` }"
    />
    <div class="text-center flex flex-col items-center">
      <h1 class="text-7xl font-bold flex gap-4">
        <img
          v-if="logo"
          class="h-18 w-18"
          :src="logo"
          :name="logo"
        >
        {{ title }}
      </h1>
      <p class="text-2xl max-w-3xl">
        {{ description }}
      </p>
    </div>

    <div class="p-5 flex flex-row gap-2 bottom-0 left-0 absolute">
      <img
        v-if="avatar"
        :src="avatar"
        class="rounded-full h-10 w-10"
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
