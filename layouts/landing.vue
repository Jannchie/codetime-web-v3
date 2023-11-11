<template>
  <header class="relative border-b border-neutral-8 mb-8 flex gap-2 p-2 justify-between items-center">
    <div> Code Time </div>
    <div>
      <LanguageSelect />
    </div>
  </header>
  <NuxtLayout
    name="default"
  >
    <slot />
  </NuxtLayout>
  <footer class="text-center mt-32 py-4 mt-auto">
    <div class="text-sm op50">
      datreks @ {{ new Date().getFullYear() }}
    </div>
  </footer>
</template>

<style>
#__nuxt {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
