<template>
  <footer class="mt-32 mt-auto pb-8 pt-32 text-center">
    <div class="text-sm text-surface-dimmed flex justify-center">
      <div class="flex gap-5 items-center">
        <div class="bg-surface-low h-1px w-16" />
        <div>
          datreks @ {{ new Date().getFullYear() }}
        </div>
        <div class="bg-surface-low h-1px w-16" />
      </div>
    </div>
    <div class="mt-6 flex gap-4 items-center justify-center">
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
        <i class="i-tabler-brand-vscode text-surface-dimmed h-6 w-6 hover:op75" />
      </NuxtLink>
      <NuxtLink
        aria-label="jetbrains"
        class="text-surface-dimmed hover:op75"
        target="_blank"
        to="https://plugins.jetbrains.com/plugin/25617-codetime"
      >
        <i class="i-devicon-plain-jetbrains text-surface-dimmed h-5 w-5 hover:op75" />
      </NuxtLink>
      <NuxtLink
        aria-label="discord"
        class="text-surface-dimmed hover:op75"
        to="https://discord.gg/WWEQrWCkkP"
        target="_blank"
      >
        <i class="i-tabler-brand-discord h-6 w-6" />
      </NuxtLink>
    </div>
  </footer>
</template>
