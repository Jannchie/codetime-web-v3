<script setup lang="ts">
import { Avatar, Btn } from '@roku-ui/vue'

const user = useUser()
const t = useI18N()
const checkoutLink = await useCheckoutLink(ref(false), ref(true))
</script>

<template>
  <CardBase
    sparse
  >
    <div class="mb-4 text-xl">
      {{ t.dashboard.settings.account.title }}
    </div>
    <div class="mb-4 text-sm op75">
      {{ t.dashboard.settings.account.description }}
    </div>
    <div v-if="user" class="mb-2 flex items-center gap-4">
      <Avatar v-if="user.avatar" :src="user?.avatar" />
      <div
        v-if="user"
        class="flex-grow"
      >
        <div class="flex items-center gap-2 text-sm">
          {{ user.username }}
          <PlanTag
            class="inline"
            :plan="user?.plan ?? 'free'"
          />
          <StatusTag
            v-if="user.plan !== 'free' && user.planStatus"
            class="inline"
            :status="t.plan.status(user.planStatus ?? 'paused')"
          />
          <div
            v-if="(user?.plan ?? 'free') !== 'free' && user?.planStatus !== 'active'"
            class="text-surface-dimmed/80 text-xs"
          >
            {{ t.dashboard.settings.account.expiresIn }}
            {{ new Date(user?.planExpiresAt ?? '').toLocaleDateString() }}
          </div>
        </div>
        <div class="text-xs text-surface-dimmed">
          {{ user?.email }}
        </div>
      </div>
      <div>
        <Btn
          is="a"
          v-if="user?.plan !== 'free'"
          target="_blank"
          href="https://codetime.lemonsqueezy.com/billing"
        >
          {{ t.dashboard.settings.account.manageSubscription }}
        </Btn>
        <Btn
          is="a"
          v-else
          variant="subtle"
          :href="checkoutLink"
        >
          {{ t.dashboard.settings.account.subscribe }}
        </Btn>
      </div>
    </div>
  </CardBase>
</template>
