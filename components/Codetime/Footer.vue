<template>
  <footer class="mt-32 mt-auto pb-8 pt-32 text-center">
    <div class="flex justify-center text-sm text-surface-onlow">
      <div class="flex items-center gap-5">
        <div class="h-1px w-16 bg-surface-low" />
        <div>
          datreks @ {{ new Date().getFullYear() }}
        </div>
        <div class="h-1px w-16 bg-surface-low" />
      </div>
    </div>
    <div class="mt-6">
      <NuxtLink
        class="text-surface-onlow hover:op75"
        to="https://github.com/Jannchie/codetime-web-v3"
        target="_blank"
      >
        <i class="i-tabler-brand-github h-6 w-6" />
      </NuxtLink>
    </div>
  </footer>
</template>
