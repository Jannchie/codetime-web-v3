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
  <footer class="text-center mt-32 py-4">
    <div class="text-sm op50">
      datreks @ {{ new Date().getFullYear() }}
    </div>
  </footer>
</template>
