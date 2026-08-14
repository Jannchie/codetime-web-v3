<script setup lang="ts">
import { getTagDisplay } from '~/utils/tag'

// The square colour chip that stands in for a tag everywhere it is named.
// Two sizes are in use: 28 in list rows and the delete confirmation, 32 in
// the panel toolbars (rules, stats) and the create/edit preview.
withDefaults(defineProps<{
  tag: { emoji?: string | null, name: string, color: string }
  size?: number
}>(), {
  size: 28,
})
</script>

<template>
  <div class="tag-glyph" :style="{ 'backgroundColor': tag.color, '--tag-glyph-size': `${size}px` }">
    {{ getTagDisplay(tag) }}
  </div>
</template>

<style scoped>
.tag-glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--tag-glyph-size);
  height: var(--tag-glyph-size);
  font-family: var(--ct-font-mono);
  font-size: 12px;
  font-weight: var(--ct-weight-semibold);
  color: #fff;
  border-radius: var(--ct-radius-md);
  text-transform: uppercase;
}
</style>
