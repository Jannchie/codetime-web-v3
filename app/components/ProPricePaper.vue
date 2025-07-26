<script setup lang="ts">
import { Btn, Paper, useContainerFilledCS } from '@roku-ui/vue'

const props = defineProps<{
  variant: 'monthly' | 'annual' | 'one-time'
}>()
const isAnuual = computed(() => props.variant === 'annual')
const isOneTime = computed(() => props.variant === 'one-time')
const annualGradientCls = 'bg-gradient-to-rb from-red-600 via-purple-600 to-purple-500 bg-purple-500 inline-block text-transparent bg-clip-text'
const monthlyGradientCls = 'bg-gradient-to-r from-primary-800 via-primary-600 to-primary-500 inline-block text-transparent bg-clip-text bg-primary'

const user = useUser()

const t = useI18N()

function onLogin() {
  if (globalThis.window === undefined) {
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const { getCheckoutLink } = useCheckoutLink(isAnuual, isOneTime)
const locale = useLocale()
const discountRef = ref()
watchEffect(() => {
  if (discountRef.value) {
    try {
      const dom = discountRef.value
      const body = document.querySelector('body')
      body?.insertBefore(dom, body.firstChild)
    }
    catch (error) {
      console.error(error)
    }
  }
})
const discountText = computed(() => {
  switch (locale.value) {
    case 'en': {
      return 'Apply discount code "CODETIME2024" for 50% Off.'
    }
    case 'zh-CN': {
      return '使用折扣码 "CODETIME2024" 享受所有产品 5 折优惠。'
    }
    case 'de': {
      return 'Verwenden Sie den Rabattcode "CODETIME2024", um 50% Rabatt auf alle unsere Produkte zu erhalten.'
    }
    case 'es': {
      return 'Utilice el código de descuento "CODETIME2024" para obtener un 50% de descuento en todos nuestros productos.'
    }
    case 'fr': {
      return 'Utilisez le code de réduction "CODETIME2024" pour obtenir 50% de réduction sur tous nos produits.'
    }
    case 'it': {
      return 'Utilizza il codice sconto "CODETIME2024" per ottenere il 50% di sconto su tutti i nostri prodotti.'
    }
    case 'ja': {
      return 'すべての製品が 50% オフの割引コード "CODETIME2024" を適用してください。'
    }
    case 'ms': {
      return 'Gunakan kod diskaun "CODETIME2024" untuk mendapatkan 50% diskaun pada semua produk kami.'
    }
    case 'ko': {
      return '모든 제품에 대해 50% 할인 코드 "CODETIME2024" 를 적용하십시오.'
    }
    case 'pt-BR': {
      return 'Use o código de desconto "CODETIME2024" para obter 50% de desconto em todos os nossos produtos.'
    }
    case 'ru': {
      return 'Используйте код скидки "CODETIME2024" для получения 50% скидки на все наши продукты.'
    }
    case 'ua': {
      return 'Використовуйте код знижки "CODETIME2024" для отримання 50% знижки на всі наші продукти.'
    }
    case 'zh-TW': {
      return '使用折扣碼 "CODETIME2024" 享受所有產品 5 折優惠。'
    }
    default: {
      return 'Apply discount code "CODETIME2024" for 50% Off on all our products.'
    }
  }
})
const filledContainerCS = useContainerFilledCS('primary')
async function toCheckoutLink() {
  if (globalThis.window === undefined) {
    return
  }
  const checkoutLink = await getCheckoutLink()
  if (checkoutLink) {
    globalThis.location.href = checkoutLink
  }
}
</script>

<template>
  <Paper
    class="flex flex-col h-full min-h-600px w-full justify-between"
  >
    <Teleport to="body">
      <div
        v-if="user && user.plan !== 'pro'"
        ref="discountRef"
        class="text-sm text-white px-1 py-2 bg-sky-900 flex min-h-2em w-full items-center justify-center relative z-110"
      >
        {{ discountText }}
      </div>
    </Teleport>
    <div
      v-bind="filledContainerCS"
      class="text-sm text-white px-4 py-1 rounded-full right-4 top-0 absolute -translate-y-50%"
    >
      {{ !isAnuual ? t.plan.mostPopular : t.plan.bestValue }}
    </div>
    <div>
      <div class="text-base font-light">
        {{ t.plan.pro.title }}
      </div>
      <div
        class="font-light flex gap-2 items-end"
      >
        <div
          :class="{
            [monthlyGradientCls]: !isAnuual,
            [annualGradientCls]: isAnuual,
          }"
          class="text-4xl"
        >
          {{ isAnuual ? '$36' : '$4' }}
        </div>
        <div class="text-sm text-surface-dimmed">
          {{ isAnuual ? t.plan.pro.preYear : t.plan.pro.preMonth }}
        </div>
      </div>
      <div class="text-xl mb-2 mt-4">
        {{ t.plan.basic.features.title }}
      </div>
      <div class="text-sm text-surface-dimmed flex flex-col gap-2">
        <FeatureItem>
          {{ t.plan.pro.features.item.include }}
        </FeatureItem>
        <FeatureItem>
          {{ t.plan.pro.features.item.browseAll }}
        </FeatureItem>
        <FeatureItem not-yet>
          {{ t.plan.pro.features.item.rule }}
        </FeatureItem>
        <FeatureItem not-yet>
          {{ t.plan.pro.features.item.tag }}
        </FeatureItem>
      </div>
    </div>
    <div>
      <ClientOnly>
        <div
          v-if="user && user.plan === 'pro'"
          class="flex gap-2"
        >
          <Btn
            v-if="user.planStatus"
            class="w-full"
            variant="transparent"
            disabled
          >
            <template #leftSection>
              <i class="i-tabler-check" />
            </template>
            {{ t.plan.status(user.planStatus) }}
          </Btn>
        </div>
        <div v-else-if="user && user.plan === 'free'">
          <Btn
            variant="filled"
            class="lemonsqueezy-button w-full"
            color="primary"
            @click="toCheckoutLink"
          >
            <template #leftSection>
              <i class="i-tabler-credit-card" />
              <i
                v-if="isOneTime"
                class="i-ant-design-alipay-circle-outlined"
              />
              <i
                v-if="isOneTime"
                class="i-ant-design-wechat-filled"
              />
              <i
                v-if="isOneTime"
                class="i-entypo-social-paypal"
              />
            </template>
            <div class="text-center">
              {{ t.plan.pro.button }}
            </div>
          </Btn>
        </div>
        <div
          v-else
        >
          <Btn
            v-if="!user"
            class="w-full"
            variant="transparent"
            @click="onLogin"
          >
            {{ t.plan.needLogin }}
          </Btn>
        </div>
      </ClientOnly>
    </div>
  </Paper>
</template>
