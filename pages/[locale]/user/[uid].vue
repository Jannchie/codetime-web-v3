<script setup lang="ts">
definePageMeta({
  middleware: ['i18n'],
  layout: 'user',
})
const route = useRoute()
const uid = computed(() => route.params.uid)
</script>

<template>
  <div>
    {{
      uid
    }}
    <h1>user</h1>
  </div>
</template>
