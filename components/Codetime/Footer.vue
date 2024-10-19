<template>
  <footer class="mt-32 mt-auto pb-8 pt-32 text-center">
    <div class="text-surface-dimmed flex justify-center text-sm">
      <div class="flex items-center gap-5">
        <div class="bg-surface-low h-1px w-16" />
        <div>
          datreks @ {{ new Date().getFullYear() }}
        </div>
        <div class="bg-surface-low h-1px w-16" />
      </div>
    </div>
    <div class="mt-6 flex items-center justify-center gap-4">
      <NuxtLink
        aria-label="github"
        class="text-surface-dimmed hover:op75"
        to="https://github.com/Jannchie/codetime-web-v3"
        target="_blank"
      >
        <i class="i-tabler-brand-github h-6 w-6" />
      </NuxtLink>
      <NuxtLink
        aria-label="twitter"
        class="text-surface-dimmed hover:op75"
        to="https://twitter.com/__codetime"
        target="_blank"
      >
        <i class="i-tabler-brand-twitter h-6 w-6" />
      </NuxtLink>
      <NuxtLink
        aria-label="email"
        class="text-surface-dimmed hover:op75"
        to="mailto:admin@codetime.dev"
        target="_blank"
      >
        <i class="i-tabler-mail h-6 w-6" />
      </NuxtLink>
      <NuxtLink
        aria-label="vscode"
        class="text-surface-dimmed hover:op75"
        to="https://marketplace.visualstudio.com/items?itemName=jannchie.codetime"
        target="_blank"
      >
        <i class="text-surface-dimmed i-tabler-brand-vscode h-6 w-6 hover:op75" />
      </NuxtLink>
      <NuxtLink
        aria-label="jetbrains"
        class="text-surface-dimmed hover:op75"
        target="_blank"
        to="https://plugins.jetbrains.com/plugin/15507-codetime"
      >
        <i class="text-surface-dimmed i-devicon-plain-jetbrains h-5 w-5 hover:op75" />
      </NuxtLink>
    </div>
  </footer>
</template>
