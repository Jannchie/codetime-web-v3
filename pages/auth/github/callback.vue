<script setup lang="ts">
import { v3GithubAuth } from '~/api/v3'

const route = useRoute()

const isProcessing = ref(true)
const error = ref<string | null>(null)

// 处理 GitHub OAuth 回调
onMounted(async () => {
  const code = route.query.code as string
  const state = route.query.state as string
  const errorParam = route.query.error as string

  // 检查是否有错误参数
  if (errorParam) {
    error.value = `GitHub OAuth Error: ${errorParam}`
    isProcessing.value = false
    return
  }

  if (!code || !state) {
    error.value = 'Missing authorization code or state parameter'
    isProcessing.value = false
    return
  }

  // 验证 state 参数
  const storedState = sessionStorage.getItem('github_oauth_state')
  if (state !== storedState) {
    error.value = 'Invalid state parameter. Possible CSRF attack.'
    isProcessing.value = false
    return
  }

  try {
    // 调用后端 GitHub OAuth API
    const response = await v3GithubAuth({
      body: {
        code,
        redirectUri: `${globalThis.location.origin}/auth/github/callback`,
      },
    })

    if (response.data) {
      // 清理 OAuth 相关的 sessionStorage
      sessionStorage.removeItem('github_oauth_state')
      const redirectUrl = sessionStorage.getItem('github_oauth_redirect')
      sessionStorage.removeItem('github_oauth_redirect')

      // 强制重新加载页面以刷新用户状态
      // 这确保了 app.vue 中的 fetchUser() 会重新执行
      if (redirectUrl) {
        globalThis.location.href = redirectUrl
      }
      else {
        // 获取当前语言设置
        const locale = useRoute().params.locale as string || 'en'
        globalThis.location.href = `/${locale}/dashboard`
      }
    }
    else {
      error.value = 'Authentication failed. Please try again.'
    }
  }
  catch (error_: any) {
    console.error('GitHub OAuth error:', error_)
    error.value = error_.message || 'Authentication failed. Please try again.'
  }
  finally {
    isProcessing.value = false
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-base">
    <div class="max-w-md p-6 text-center space-y-4">
      <div v-if="isProcessing" class="space-y-4">
        <div class="mx-auto h-12 w-12 animate-spin">
          <i class="i-eva-loader-outline text-surface-high h-full w-full" />
        </div>
        <h2 class="text-surface-high text-lg font-medium">
          Processing GitHub Authentication...
        </h2>
        <p class="text-sm text-surface-dimmed">
          Please wait while we complete your login.
        </p>
      </div>

      <div v-else-if="error" class="space-y-4">
        <div class="text-danger mx-auto h-12 w-12">
          <i class="i-eva-alert-circle-outline h-full w-full" />
        </div>
        <h2 class="text-surface-high text-lg font-medium">
          Authentication Failed
        </h2>
        <p class="text-danger text-sm">
          {{ error }}
        </p>
        <div class="pt-4">
          <NuxtLink
            to="/"
            class="text-surface-high bg-surface-low border-surface-border-low hover:bg-surface-moderate inline-flex items-center border rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            Return to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
