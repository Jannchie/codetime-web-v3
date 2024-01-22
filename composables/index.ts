export async function useCheckoutLink(isAnuual: Ref<boolean>) {
  const body = computed(() => {
    return {
      type: isAnuual.value ? 'yearly' : 'monthly',
    }
  })

  const resp = await useAPIFetch('/lemonsqueezy/checkout/pro', {
    method: 'POST',
    body,
  })
  const checkoutLink = computed(() => {
    return (resp.data.value as any)?.data?.attributes?.url ?? ''
  })
  return checkoutLink
}
