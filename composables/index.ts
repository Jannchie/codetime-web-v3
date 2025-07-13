import { v3CreateCheckout } from '~/api/v3'

export async function useCheckoutLink(isAnuual: Ref<boolean>, isOneTime: Ref<boolean>) {
  const user = useUser()

  return asyncComputed(async () => {
    if (!user.value) {
      return ''
    }
    if (user.value.plan === 'pro') {
      return ''
    }

    const resp = await v3CreateCheckout({
      body: {
        type: isAnuual.value ? 'yearly' : 'monthly',
        product: isOneTime.value ? 'onetime' : 'subscription',
      },
    })

    return resp.data?.checkoutUrl ?? ''
  })
}
