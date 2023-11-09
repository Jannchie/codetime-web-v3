<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('A')
</script>

<template>
  <select v-model="selected">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</template>
