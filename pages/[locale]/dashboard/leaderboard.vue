<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
})
const t = useI18N()
</script>

<template>
  <DashboardPageTitle
    :title="t.dashboard.pageHeader.title.leaderboard"
    :description="t.dashboard.pageHeader.description.leaderboard"
  />
  <DashboardPageContent>
    <div class="flex gap-2">
      <div>
        <LeaderboardCard :days="28" />
      </div>
      <div>
        <LeaderboardCard :days="7" />
      </div>
      <div>
        <LeaderboardCard :days="1" />
      </div>
    </div>
  </DashboardPageContent>
</template>
