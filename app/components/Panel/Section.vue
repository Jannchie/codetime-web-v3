<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  meta?: string
  flush?: boolean
  // When true, the header acts as a button toggling the body. Useful for
  // long-form help blocks (install guides) that should stay reachable but
  // collapsed by default once the user has data.
  collapsible?: boolean
  defaultOpen?: boolean
}>(), {
  collapsible: false,
  defaultOpen: false,
})

const open = ref(props.defaultOpen)
function toggle() {
  if (props.collapsible) {
    open.value = !open.value
  }
}

// A collapsible header renders as a <button>, so actions can't be nested
// inside it. Fail loudly in dev rather than silently dropping the buttons.
const slots = useSlots()
if (import.meta.dev && props.collapsible && slots.actions) {
  console.warn('[PanelSection] `actions` slot is ignored when `collapsible` is set.')
}
</script>

<template>
  <section class="up-section" :class="{ 'up-section-collapsible': collapsible, 'is-open': open }">
    <div class="up-section-divider" aria-hidden="true">
      <span class="up-section-divider-fill" />
    </div>
    <component
      :is="collapsible ? 'button' : 'header'"
      :type="collapsible ? 'button' : undefined"
      class="up-section-header"
      :aria-expanded="collapsible ? open : undefined"
      @click="toggle"
    >
      <slot name="icon" />
      <span class="up-section-title">{{ title }}</span>
      <span v-if="meta" class="up-section-meta tabular-nums">{{ meta }}</span>
      <!-- Header-level actions (e.g. "Create tag"). Skipped when collapsible,
           since the header is a <button> there and nesting one is invalid. -->
      <span v-if="!collapsible && $slots.actions" class="up-section-actions">
        <slot name="actions" />
      </span>
      <i
        v-if="collapsible"
        class="up-section-chevron"
        :class="open ? 'i-tabler-chevron-up' : 'i-tabler-chevron-down'"
        aria-hidden="true"
      />
    </component>
    <div v-if="!collapsible || open" :class="flush ? '' : 'up-section-body'">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.up-section {
  position: relative;
  background: transparent;
}
/* Diagonal-stripes divider — shown between adjacent sections, hidden
   on the first section so it doesn't double up against page header. */
.up-section-divider {
  position: relative;
  height: 22px;
}
.up-section:first-child .up-section-divider { display: none; }
.up-section-divider::before,
.up-section-divider::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--ct-border);
  pointer-events: none;
}
.up-section-divider::before { top: 0; }
.up-section-divider::after  { bottom: 0; }
.up-section-divider-fill {
  position: absolute;
  inset: 1px 0;
  background-color: var(--ct-border);
  opacity: 0.85;
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><line x1='0' y1='8' x2='8' y2='0' stroke='black' stroke-width='1.2'/><line x1='-1' y1='1' x2='1' y2='-1' stroke='black' stroke-width='1.2'/><line x1='7' y1='9' x2='9' y2='7' stroke='black' stroke-width='1.2'/></svg>");
          mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><line x1='0' y1='8' x2='8' y2='0' stroke='black' stroke-width='1.2'/><line x1='-1' y1='1' x2='1' y2='-1' stroke='black' stroke-width='1.2'/><line x1='7' y1='9' x2='9' y2='7' stroke='black' stroke-width='1.2'/></svg>");
  -webkit-mask-size: 8px 8px;
          mask-size: 8px 8px;
  -webkit-mask-repeat: repeat;
          mask-repeat: repeat;
  pointer-events: none;
}

.up-section-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  background: var(--ct-surface-1);
  border-bottom: 1px solid var(--ct-border);
}

/* When collapsible, the header is rendered as a <button>. Reset native
   button styling so it visually matches the static <header> variant, and
   add a hover affordance so users see it's interactive. */
button.up-section-header {
  width: 100%;
  text-align: left;
  font: inherit;
  color: inherit;
  border: 0;
  border-bottom: 1px solid var(--ct-border);
  cursor: pointer;
  transition: background-color 180ms ease;
}
button.up-section-header:hover {
  background: var(--ct-surface-2);
}
.up-section-collapsible:not(.is-open) > .up-section-header {
  border-bottom-color: transparent;
}
.up-section-chevron {
  margin-left: auto;
  font-size: 16px;
  color: var(--ct-fg-subtle);
  transition: color 180ms ease;
  flex-shrink: 0;
}
button.up-section-header:hover .up-section-chevron {
  color: var(--ct-fg);
}
/* When meta is present, chevron should still sit at the far right.
   The meta uses `margin-left: auto` on wide screens, so chevron needs
   its own `margin-left: 0` to fall in line behind it. */
.up-section-meta + .up-section-chevron {
  margin-left: 0;
}
@media (min-width: 640px) {
  .up-section-header { flex-wrap: nowrap; }
}

.up-section-title {
  font-size: var(--ct-text-base);
  font-weight: var(--ct-weight-semibold);
  color: var(--ct-fg);
}

.up-section-meta {
  font-family: var(--ct-font-mono);
  font-size: var(--ct-text-xs);
  color: var(--ct-fg-subtle);
  margin-left: 0;
  text-align: left;
  flex-basis: 100%;
  min-width: 0;
  word-break: break-word;
}
@media (min-width: 640px) {
  .up-section-meta { margin-left: auto; flex-basis: auto; text-align: right; }
}

.up-section-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  flex-shrink: 0;
}
/* Meta already claimed the auto margin on wide screens — actions just trail
   it under the header's own gap. Below 640px meta wraps to its own line, so
   actions keep the auto. */
@media (min-width: 640px) {
  .up-section-meta + .up-section-actions { margin-left: 0; }
}

.up-section-body { padding: 10px 18px; }
</style>
