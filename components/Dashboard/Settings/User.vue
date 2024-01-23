<script setup lang="ts">
import { Avatar, Btn, Modal, Paper, TextField } from '@roku-ui/vue'

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
    <div class="mb-2 flex items-center gap-4">
      <Avatar :src="user?.avatar" />
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
            v-if="user.plan !== 'free' && user.plan_status"
            class="inline"
            :status="t.plan.status(user.plan_status)"
          />
          <div
            v-if="(user?.plan ?? 'free') !== 'free'"
            class="text-xs text-surface-onlow/80"
          >
            {{ t.dashboard.settings.account.expiresIn }}
            {{ new Date(user?.plan_expires_at ?? '').toLocaleDateString() }}
          </div>
        </div>
        <div class="text-xs text-surface-onlow">
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
