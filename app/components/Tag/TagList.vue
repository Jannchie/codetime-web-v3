<script setup lang="ts">
import type { TagResponse } from '~/api/v3/types.gen'
import type { RuleTree } from '~/utils/tag'
import { useUser } from '~/utils'
import { countTagConditions } from '~/utils/tag'

type Props = {
  tags: TagResponse[]
  selectedTag: TagResponse | null
  loading: boolean
}

type Emits = {
  (e: 'select', tag: TagResponse): void
  (e: 'edit', tag: TagResponse): void
  (e: 'delete', tagId: string): void
  (e: 'createNew'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const t = useI18N()
const user = useUser()

const deleteModal = ref(false)
const tagToDelete = ref<TagResponse | null>(null)

const isFreeUser = computed(() => user.value?.plan === 'free')
const maxTagsForFree = 3
const canCreateMoreTags = computed(() => {
  if (!isFreeUser.value) {
    return true
  }
  return (props.tags?.length || 0) < maxTagsForFree
})

const meta = computed(() => {
  if (isFreeUser.value) {
    return `${props.tags?.length || 0} / ${maxTagsForFree}`
  }
  return `${props.tags?.length || 0} TAGS`
})

// Row view models — derived once per tags change instead of walking the rule
// tree and formatting a date on every re-render of the list.
const rows = computed(() => (props.tags ?? []).map(tag => ({
  tag,
  ruleCount: countTagConditions(tag.rules as RuleTree),
  created: new Date(tag.createdAt).toLocaleDateString(),
})))

// Trailing blanks keep the hairline grid rectangular when the tag count isn't
// a multiple of the column count. The grid is 3-up ≥1024px, 2-up ≥640px and
// 1-up below that (where a partial row can't happen), so at most two blanks
// are needed and each breakpoint shows only the ones it uses.
const need3 = computed(() => (3 - ((props.tags?.length || 0) % 3)) % 3)
const need2 = computed(() => (props.tags?.length || 0) % 2)
const fillerCount = computed(() => Math.max(need3.value, need2.value))

function showDeleteConfirm(tag: TagResponse) {
  tagToDelete.value = tag
  deleteModal.value = true
}

function confirmDelete() {
  if (tagToDelete.value) {
    emit('delete', tagToDelete.value.id)
    deleteModal.value = false
    tagToDelete.value = null
  }
}

function cancelDelete() {
  deleteModal.value = false
  tagToDelete.value = null
}
</script>

<template>
  <PanelSection :title="t.dashboard.tags.tagList.title" :meta="meta" flush>
    <template #icon>
      <i class="i-tabler-tag text-[15px] text-ct-fg-muted" />
    </template>

    <template #actions>
      <UButton
        variant="subtle"
        size="sm"
        icon-left="i-tabler-plus"
        :disabled="!canCreateMoreTags"
        @click="emit('createNew')"
      >
        {{ t.dashboard.tags.tagList.createTag }}
      </UButton>
    </template>

    <!-- Same plan notice (and Upgrade CTA) the widget tabs use. -->
    <div v-if="isFreeUser" class="tag-quota">
      <WidgetPlanLimitNotice
        :variant="canCreateMoreTags ? 'info' : 'warning'"
        :text="canCreateMoreTags
          ? t.dashboard.tags.tagList.freeUserLimit(maxTagsForFree)
          : t.dashboard.tags.tagList.upgradeForMore"
        :cta-text="t.dashboard.widget?.limit.upgrade"
      />
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="tag-grid">
      <div
        v-for="i in 6"
        :key="i"
        class="tag-cell tag-cell-skel"
      >
        <div class="h-6 w-6 animate-pulse" style="background: var(--ct-surface-2); border-radius: var(--ct-radius-md)" />
        <div class="flex-1 space-y-1.5">
          <div class="h-3 w-24 animate-pulse" style="background: var(--ct-surface-2)" />
          <div class="h-2 w-16 animate-pulse" style="background: var(--ct-surface-2); opacity: 0.7" />
        </div>
      </div>
    </div>

    <!-- EMPTY -->
    <div v-else-if="tags.length === 0" class="tag-empty">
      <i class="i-tabler-tag-off text-3xl text-ct-fg-muted" />
      <p class="tag-empty-text">
        {{ t.dashboard.tags.tagList.noTags }}
      </p>
    </div>

    <!-- GRID -->
    <div v-else class="tag-grid">
      <button
        v-for="row in rows"
        :key="row.tag.id"
        type="button"
        class="tag-cell group"
        :class="selectedTag?.id === row.tag.id ? 'tag-cell-active' : ''"
        @click="emit('select', row.tag)"
      >
        <TagGlyph :tag="row.tag" />
        <div class="tag-cell-body">
          <div class="tag-cell-name">
            {{ row.tag.name }}
          </div>
          <div class="tag-cell-meta">
            <span
              class="tag-cell-rules"
              :class="{ 'is-empty': row.ruleCount === 0 }"
              :title="t.dashboard.tags.tagRules.title"
            >
              <i class="i-tabler-filter text-[11px]" />
              <span class="tabular-nums">{{ row.ruleCount }}</span>
            </span>
            <span class="tag-cell-dot">·</span>
            <span class="tabular-nums">{{ row.created }}</span>
          </div>
        </div>
        <div class="tag-cell-actions" @click.stop>
          <button
            type="button"
            class="tag-cell-action"
            :title="t.dashboard.tags.tagList.editTag"
            @click="emit('edit', row.tag)"
          >
            <i class="i-tabler-edit text-sm" />
          </button>
          <button
            type="button"
            class="tag-cell-action tag-cell-action-danger"
            :title="t.dashboard.tags.tagList.deleteTag"
            @click="showDeleteConfirm(row.tag)"
          >
            <i class="i-tabler-trash text-sm" />
          </button>
        </div>
      </button>

      <div
        v-for="i in fillerCount"
        :key="`filler-${i}`"
        class="tag-filler"
        :class="{ 'is-lg': i <= need3, 'is-md': i <= need2 }"
        aria-hidden="true"
      />
    </div>
  </PanelSection>

  <!-- DELETE CONFIRM -->
  <UModal v-model="deleteModal" :title="t.dashboard.tags.deleteConfirm.deleteTag" width="440px">
    <p class="confirm-message">
      {{ t.dashboard.tags.deleteConfirm.deleteTagMessage }}
    </p>
    <div v-if="tagToDelete" class="confirm-target">
      <TagGlyph :tag="tagToDelete" />
      <span class="confirm-target-name">{{ tagToDelete.name }}</span>
    </div>
    <template #footer>
      <UButton variant="ghost" @click="cancelDelete">
        {{ t.dashboard.tags.deleteConfirm.cancel }}
      </UButton>
      <UButton variant="danger" icon-left="i-tabler-trash" @click="confirmDelete">
        {{ t.dashboard.tags.deleteConfirm.delete }}
      </UButton>
    </template>
  </UModal>
</template>

<style scoped>
/* Quota strip — only free plans see it, so paid users get the grid flush
   against the header instead of an empty toolbar row. */
.tag-quota {
  padding: 12px 18px;
  border-bottom: 1px solid var(--ct-border-subtle);
}

/* Hairline grid */
.tag-grid { display: grid; grid-template-columns: 1fr; }
@media (min-width: 640px) { .tag-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .tag-grid { grid-template-columns: 1fr 1fr 1fr; } }

.tag-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 18px;
  background: transparent;
  border: 0;
  border-top: 1px solid var(--ct-border-subtle);
  border-left: 1px solid var(--ct-border-subtle);
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: background-color var(--ct-duration-fast) var(--ct-ease);
}
.tag-cell:hover { background: var(--ct-surface-1); }
.tag-cell-active { background: var(--ct-primary-soft); }
.tag-cell-active:hover { background: color-mix(in srgb, var(--ct-primary) 18%, transparent); }
.tag-cell-active::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: var(--ct-primary);
}
/* The first row's border-top would double up against the header rule. */
.tag-cell:first-child { border-top: 0; }
@media (min-width: 640px) {
  .tag-cell:nth-child(2n+1) { border-left: 0; }
  .tag-cell:nth-child(-n+2) { border-top: 0; }
}
@media (min-width: 1024px) {
  .tag-cell:nth-child(2n+1) { border-left: 1px solid var(--ct-border-subtle); }
  .tag-cell:nth-child(3n+1) { border-left: 0; }
  .tag-cell:nth-child(-n+3) { border-top: 0; }
}
@media (max-width: 639px) {
  .tag-cell { border-left: 0; }
}

.tag-cell-body { flex: 1; min-width: 0; }
.tag-cell-name {
  font-size: var(--ct-text-sm);
  font-weight: var(--ct-weight-medium);
  color: var(--ct-fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tag-cell-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 3px;
  font-size: var(--ct-text-xs);
  color: var(--ct-fg-subtle);
}
.tag-cell-rules {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: var(--ct-fg-muted);
}
.tag-cell-rules.is-empty { opacity: 0.55; }
.tag-cell-dot { opacity: 0.5; }

/* Blank cells that finish the last grid row (see fillerCount). */
.tag-filler {
  display: none;
  border-top: 1px solid var(--ct-border-subtle);
  border-left: 1px solid var(--ct-border-subtle);
}
@media (min-width: 640px) and (max-width: 1023px) {
  .tag-filler.is-md { display: block; }
}
@media (min-width: 1024px) {
  .tag-filler.is-lg { display: block; }
}

.tag-cell-actions {
  display: inline-flex;
  gap: 4px;
  opacity: 0;
  transition: opacity var(--ct-duration-fast) var(--ct-ease);
}
.tag-cell:hover .tag-cell-actions,
.tag-cell-active .tag-cell-actions { opacity: 1; }

.tag-cell-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: var(--ct-fg-muted);
  border-radius: var(--ct-radius-md);
  transition: color var(--ct-duration-fast) var(--ct-ease),
              background-color var(--ct-duration-fast) var(--ct-ease);
}
.tag-cell-action:hover { color: var(--ct-fg); background: var(--ct-surface-2); }
.tag-cell-action-danger:hover { color: var(--ct-danger); background: var(--ct-danger-soft); }

.tag-cell-skel { pointer-events: none; }

.tag-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 56px 16px;
  border-top: 1px solid var(--ct-border-subtle);
}
.tag-empty-text {
  font-size: var(--ct-text-sm);
  color: var(--ct-fg-subtle);
}

/* Confirm modal */
.confirm-message {
  font-size: var(--ct-text-base);
  line-height: 1.6;
  color: var(--ct-fg-muted);
  margin: 0 0 12px;
}
.confirm-target {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: var(--ct-surface-1);
  border: 1px solid var(--ct-border);
}
.confirm-target-name {
  font-size: var(--ct-text-sm);
  font-weight: var(--ct-weight-medium);
}
</style>
