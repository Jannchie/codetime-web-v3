<template>
  <header>
    <LanguageSelect />
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
