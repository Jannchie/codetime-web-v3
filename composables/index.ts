export async function useCheckoutLink(isAnuual: Ref<boolean>, isOneTime: Ref<boolean>) {
  const body = computed(() => {
    return {
      type: isAnuual.value ? 'yearly' : 'monthly',
      product: isOneTime.value ? 'onetime' : 'subscription',
    }
  })

  const user = useUser()
  const resp = await useAPIFetch('/lemonsqueezy/checkout/pro', {
    method: 'POST',
    body,
    lazy: false,
    dedupe: 'defer',
    immediate: false,
  })

  return asyncComputed(async () => {
    if (!user.value) {
      return ''
    }
    if (user.value.plan === 'pro') {
      return ''
    }
    await resp.execute()
    return (resp.data?.value as any)?.data?.attributes?.url ?? ''
  })
}
