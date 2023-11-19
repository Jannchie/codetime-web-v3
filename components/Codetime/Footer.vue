<template>
  <footer class="text-center mt-32 pb-8 pt-32 mt-auto">
    <div class="text-sm op50 flex justify-center">
      <div class="flex items-center gap-5">
        <div class="w-16 h-1px bg-back-1" />
        <div>
          datreks @ {{ new Date().getFullYear() }}
        </div>
        <div class="w-16 h-1px bg-back-1" />
      </div>
    </div>
    <div class="mt-6">
      <NuxtLink
        class="op50 hover:op75 transition-all"
        to="https://github.com/Jannchie/codetime-web-v3"
        target="_blank"
      >
        <i class="i-tabler-brand-github h-6 w-6" />
      </NuxtLink>
    </div>
  </footer>
</template>
