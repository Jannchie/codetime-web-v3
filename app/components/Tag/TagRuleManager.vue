<script setup lang="ts">
import type { RuleConditionType, TagResponse, TagRuleResponse } from '~/api/v3/types.gen'
import { Btn, Modal, Paper, Select, TextField } from '@roku-ui/vue'
import { v3CreateTagRule, v3DeleteRule, v3GetTagRules, v3UpdateRule } from '~/api/v3'
import { useUser } from '~/utils'

type Props = {
  tag: TagResponse
}

type Emits = {
  (e: 'refresh'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const t = useI18N()
const user = useUser()

const showInlineForm = ref(false)
const editingRule = ref<TagRuleResponse | null>(null)
const deleteModal = ref(false)
const ruleToDelete = ref<TagRuleResponse | null>(null)
const saving = ref(false)

// 检查用户是否为 free 用户以及规则数量限制
const isFreeUser = computed(() => user.value?.plan === 'free')
const maxRulesForFree = 1

// 表单数据
const formData = reactive({
  name: '',
  conditions: [{
    field: 'workspaceName',
    conditionType: 'CONTAINS' as RuleConditionType,
    value: '',
  }] as Array<{
    field: string
    conditionType: RuleConditionType
    value: string
  }>,
})

// 获取规则列表
const { data: rules, refresh: refreshRules } = useAsyncData(() => `tag-rules-${props.tag.id}`, async () => {
  const response = await v3GetTagRules({
    path: { tag_id: props.tag.id },
  })
  return response.data
}, {
  server: false,
  watch: [() => props.tag.id],
})

// 检查是否可以创建更多规则
const canCreateMoreRules = computed(() => {
  if (!isFreeUser.value) {
    return true
  }
  return (rules.value?.length || 0) < maxRulesForFree
})

// 字段选项
const fieldOptions = computed(() => [
  { label: t.value.dashboard.tags.fields.workspaceName, id: 'workspaceName' },
  { label: t.value.dashboard.tags.fields.language, id: 'language' },
  { label: t.value.dashboard.tags.fields.gitOrigin, id: 'gitOrigin' },
  { label: t.value.dashboard.tags.fields.gitBranch, id: 'gitBranch' },
  { label: t.value.dashboard.tags.fields.platform, id: 'platform' },
  { label: t.value.dashboard.tags.fields.editor, id: 'editor' },
  { label: t.value.dashboard.tags.fields.absoluteFile, id: 'absoluteFile' },
  { label: t.value.dashboard.tags.fields.relativeFile, id: 'relativeFile' },
])

// 条件类型选项
const conditionTypeOptions = computed(() => [
  { label: t.value.dashboard.tags.conditionTypes.CONTAINS, id: 'CONTAINS' },
  { label: t.value.dashboard.tags.conditionTypes.EQUALS, id: 'EQUALS' },
  { label: t.value.dashboard.tags.conditionTypes.STARTS_WITH, id: 'STARTS_WITH' },
  { label: t.value.dashboard.tags.conditionTypes.ENDS_WITH, id: 'ENDS_WITH' },
  { label: t.value.dashboard.tags.conditionTypes.REGEX, id: 'REGEX' },
  { label: `${t.value.dashboard.tags.common.not}${t.value.dashboard.tags.conditionTypes.CONTAINS}`, id: 'NOT_CONTAINS' },
  { label: `${t.value.dashboard.tags.common.not}${t.value.dashboard.tags.conditionTypes.EQUALS}`, id: 'NOT_EQUALS' },
  { label: `${t.value.dashboard.tags.common.not}${t.value.dashboard.tags.conditionTypes.STARTS_WITH}`, id: 'NOT_STARTS_WITH' },
  { label: `${t.value.dashboard.tags.common.not}${t.value.dashboard.tags.conditionTypes.ENDS_WITH}`, id: 'NOT_ENDS_WITH' },
  { label: `${t.value.dashboard.tags.common.not}${t.value.dashboard.tags.conditionTypes.REGEX}`, id: 'NOT_REGEX' },
])

// 重置表单
function resetForm() {
  formData.name = ''
  formData.conditions = [{
    field: 'workspaceName',
    conditionType: 'CONTAINS' as RuleConditionType,
    value: '',
  }]
}

// 显示内联创建表单
function showCreateForm() {
  resetForm()
  editingRule.value = null
  showInlineForm.value = true
}

// 添加条件
function addCondition() {
  formData.conditions.push({
    field: 'workspaceName',
    conditionType: 'CONTAINS' as RuleConditionType,
    value: '',
  })
}

// 删除条件
function removeCondition(index: number) {
  if (formData.conditions.length > 1) {
    formData.conditions.splice(index, 1)
  }
}

// 创建或更新规则
async function saveRule() {
  if (formData.conditions.some(c => !c.value.trim())) {
    return
  }

  try {
    saving.value = true
    const ruleData = {
      name: formData.name.trim() || null,
      conditions: formData.conditions.filter(c => c.value.trim()),
    }

    editingRule.value
      ? await v3UpdateRule({
          path: { rule_id: editingRule.value.id },
          body: ruleData,
        })
      : await v3CreateTagRule({
          path: { tag_id: props.tag.id },
          body: ruleData,
        })

    await refreshRules()
    closeInlineForm()
    emit('refresh')
  }
  finally {
    saving.value = false
  }
}

// 显示删除确认对话框
function showDeleteConfirm(rule: TagRuleResponse) {
  ruleToDelete.value = rule
  deleteModal.value = true
}

// 确认删除规则
async function confirmDeleteRule() {
  if (ruleToDelete.value) {
    await v3DeleteRule({
      path: { rule_id: ruleToDelete.value.id },
    })
    await refreshRules()
    deleteModal.value = false
    ruleToDelete.value = null
    emit('refresh')
  }
}

// 取消删除
function cancelDelete() {
  deleteModal.value = false
  ruleToDelete.value = null
}

// 编辑规则
function editRule(rule: TagRuleResponse) {
  editingRule.value = rule
  formData.name = rule.name || ''
  formData.conditions = rule.conditions.map(c => ({
    field: c.field,
    conditionType: c.conditionType,
    value: c.value,
  }))
  showInlineForm.value = true
}

// 关闭内联表单
function closeInlineForm() {
  showInlineForm.value = false
  editingRule.value = null
  resetForm()
}

// 取消编辑
function cancelEdit() {
  closeInlineForm()
}

// 格式化条件显示文本
function formatConditions(conditions: any[]) {
  if (!conditions || conditions.length === 0) {
    return t.value.dashboard.tags.tagRules.noRules
  }

  return conditions.map((condition) => {
    const fieldName = t.value.dashboard.tags.fields[condition.field as keyof typeof t.value.dashboard.tags.fields] || condition.field
    const isNegated = condition.conditionType.startsWith('NOT_')
    const baseCondition = isNegated ? condition.conditionType.replace('NOT_', '') : condition.conditionType
    const typeName = t.value.dashboard.tags.conditionTypes[baseCondition as keyof typeof t.value.dashboard.tags.conditionTypes] || baseCondition
    const prefix = isNegated ? t.value.dashboard.tags.common.not : ''
    return `${fieldName} ${prefix}${typeName} "${condition.value}"`
  }).join(' & ')
}
</script>

<template>
  <Paper with-border class="h-full flex flex-col rounded-xl p-6 shadow-sm">
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="h-5 w-5 rounded-full shadow-sm"
          :style="{ backgroundColor: tag.color }"
        />
        <div>
          <h3 class="text-lg font-medium">
            {{ tag.name }}
          </h3>
          <p class="text-xs text-surface-dimmed">
            {{ t.dashboard.tags.common.ruleRelationship }}
          </p>
          <p v-if="isFreeUser" class="text-xs text-surface-dimmed">
            {{ t.dashboard.tags.tagRules.freeUserLimit }} {{ rules?.length || 0 }}/{{ maxRulesForFree }}
          </p>
        </div>
      </div>
      <div class="flex flex-col items-end gap-2">
        <Btn
          variant="light"
          :disabled="!canCreateMoreRules"
          @click="() => showCreateForm()"
        >
          <template #leftSection>
            <i class="i-tabler-plus" />
          </template>
          {{ t.dashboard.tags.tagRules.createRule }}
        </Btn>
        <div v-if="!canCreateMoreRules && isFreeUser" class="text-xs text-surface-dimmed">
          {{ t.dashboard.tags.tagRules.upgradeForMore }}
        </div>
      </div>
    </div>

    <div v-if="!rules" class="flex-1 space-y-2">
      <div
        v-for="i in 2"
        :key="i"
        class="bg-surface-variant h-20 animate-pulse rounded-xl"
      />
    </div>

    <div v-else class="flex-1 space-y-2">
      <!-- 空状态提示 -->
      <div
        v-if="rules.length === 0 && !showInlineForm"
        class="flex flex-col items-center justify-center py-12 text-center text-surface-dimmed"
      >
        <div class="bg-surface-variant-highlight mb-4 rounded-full p-4">
          <i class="i-tabler-rules-off text-4xl text-surface-dimmed" />
        </div>
        <p class="mb-4">
          {{ t.dashboard.tags.tagRules.noRules }}
        </p>
        <div v-if="isFreeUser" class="mb-4 text-xs text-surface-dimmed">
          {{ t.dashboard.tags.common.freeUserRuleLimit }}
        </div>
        <Btn
          variant="light"
          :disabled="!canCreateMoreRules"
          @click="() => showCreateForm()"
        >
          <template #leftSection>
            <i class="i-tabler-plus" />
          </template>
          {{ t.dashboard.tags.tagRules.createRule }}
        </Btn>
        <div v-if="!canCreateMoreRules && isFreeUser" class="mt-2 text-xs text-surface-dimmed">
          {{ t.dashboard.tags.common.upgradeForMoreRules }}
        </div>
      </div>
      <!-- 内联创建/编辑表单 -->
      <div
        v-if="showInlineForm"
        class="bg-surface-variant-highlight border border-primary rounded-xl p-6 shadow-sm"
      >
        <div class="mb-4 flex items-center justify-between">
          <h4 class="font-medium">
            {{ editingRule ? t.dashboard.tags.ruleForm.edit : t.dashboard.tags.ruleForm.create }}
          </h4>
          <Btn
            icon
            variant="subtle"
            color="surface"
            size="sm"
            @click="cancelEdit"
          >
            <i class="i-tabler-x" />
          </Btn>
        </div>

        <form class="space-y-4" @submit.prevent="saveRule">
          <!-- 规则名称 -->
          <div>
            <label class="mb-2 block text-sm font-medium">
              {{ t.dashboard.tags.ruleForm.name }}
              <span class="text-surface-dimmed font-normal">{{ t.dashboard.tags.common.optional }}</span>
            </label>
            <TextField
              v-model="formData.name"
              :placeholder="t.dashboard.tags.ruleForm.namePlaceholder"
            />
          </div>

          <!-- 条件列表 -->
          <div>
            <div class="mb-4 flex items-center justify-between">
              <label class="block text-sm font-medium">
                {{ t.dashboard.tags.ruleForm.conditions }}
              </label>
              <Btn
                type="button"
                variant="light"
                @click="addCondition"
              >
                <template #leftSection>
                  <i class="i-tabler-plus" />
                </template>
                {{ t.dashboard.tags.ruleForm.addCondition }}
              </Btn>
            </div>

            <div class="space-y-2">
              <template v-for="(condition, index) in formData.conditions" :key="index">
                <!-- 条件之间的连接符 -->
                <div
                  v-if="index > 0"
                  class="flex items-center justify-center"
                >
                  <span class="bg-surface-variant rounded px-2 py-0.5 text-xs text-surface-dimmed font-medium">AND</span>
                </div>

                <div
                  class="hover:bg-surface-variant-highlight rounded-xl bg-surface-variant-1 p-4 transition-colors"
                >
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <!-- 字段选择 -->
                    <div>
                      <label class="mb-1 block text-xs text-surface-dimmed font-medium">
                        {{ t.dashboard.tags.ruleForm.field }}
                      </label>
                      <Select
                        v-model="condition.field"
                        :options="fieldOptions.map(d => d.id)"
                        :placeholder="t.dashboard.tags.ruleForm.field"
                      />
                    </div>

                    <!-- 条件类型 -->
                    <div>
                      <label class="mb-1 block text-xs text-surface-dimmed font-medium">
                        {{ t.dashboard.tags.ruleForm.conditionType }}
                      </label>
                      <Select
                        v-model="condition.conditionType"
                        :options="conditionTypeOptions.map(d => d.id)"
                        :placeholder="t.dashboard.tags.ruleForm.conditionType"
                      />
                    </div>

                    <!-- 值 -->
                    <div>
                      <label class="mb-1 block text-xs text-surface-dimmed font-medium">
                        {{ t.dashboard.tags.ruleForm.value }}
                      </label>
                      <TextField
                        v-model="condition.value"
                        :placeholder="t.dashboard.tags.ruleForm.valuePlaceholder"
                        required
                      />
                    </div>

                    <!-- 操作按钮 -->
                    <div class="flex items-end gap-2">
                      <Btn
                        v-if="formData.conditions.length > 1"
                        icon
                        type="button"
                        variant="light"
                        size="sm"
                        color="error"
                        @click="removeCondition(index)"
                      >
                        <i class="i-tabler-trash" />
                      </Btn>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- 按钮组 -->
          <div class="mt-2 flex justify-end gap-3 pt-6">
            <Btn
              type="button"
              @click="cancelEdit"
            >
              {{ t.dashboard.tags.ruleForm.cancel }}
            </Btn>
            <Btn
              type="submit"
              variant="filled"
              :disabled="formData.conditions.some(c => !c.value.trim()) || saving"
              :loading="saving"
            >
              <template v-if="saving" #leftSection>
                <i class="i-tabler-loader animate-spin" />
              </template>
              {{ editingRule ? t.dashboard.tags.ruleForm.save : t.dashboard.tags.ruleForm.create }}
            </Btn>
          </div>
        </form>
      </div>

      <!-- 现有规则列表 -->
      <template v-for="(rule, index) in rules" :key="rule.id">
        <!-- 规则之间的连接符 -->
        <div
          v-if="index > 0"
          class="flex items-center justify-center py-2"
        >
          <span class="bg-surface-variant-highlight rounded-full px-3 py-1 text-sm text-surface-dimmed font-medium">OR</span>
        </div>

        <div
          class="group bg-surface-variant hover:border-surface-variant-2 border border-transparent rounded-xl p-4 transition-all duration-200 hover:bg-surface-variant-1 hover:shadow-md"
        >
          <div class="flex items-start justify-between">
            <div class="min-w-0 flex-1">
              <div class="mb-2 flex items-center gap-2">
                <h4 class="truncate font-medium" :class="{ 'text-surface-dimmed italic': !rule.name }">
                  {{ rule.name || t.dashboard.tags.common.ruleIdFormat(rule.id) }}
                </h4>
              </div>
              <p class="line-clamp-2 text-sm text-surface-dimmed">
                {{ formatConditions(rule.conditions) }}
              </p>
            </div>

            <div class="ml-4 flex items-center gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100">
              <Btn
                icon
                variant="light"
                size="sm"
                @click="editRule(rule)"
              >
                <i class="i-tabler-edit" />
              </Btn>

              <Btn
                icon
                variant="light"
                size="sm"
                color="error"
                @click="showDeleteConfirm(rule)"
              >
                <i class="i-tabler-trash" />
              </Btn>
            </div>
          </div>
        </div>
      </template>
    </div>
  </Paper>

  <!-- 删除确认模态框 -->
  <Modal v-model="deleteModal">
    <Paper class="w-md" with-border>
      <div class="mb-4">
        <h3 class="text-lg text-error font-semibold">
          {{ t.dashboard.tags.deleteConfirm.deleteRule }}
        </h3>
      </div>

      <div class="mb-6 text-sm text-surface-dimmed">
        <p class="mb-2">
          {{ t.dashboard.tags.deleteConfirm.deleteRuleMessage }}
        </p>
        <div v-if="ruleToDelete" class="bg-surface-variant border-surface-variant-2 border rounded-xl p-4">
          <div class="font-medium" :class="{ 'text-surface-dimmed italic': !ruleToDelete.name }">
            {{ ruleToDelete.name || t.dashboard.tags.common.ruleIdFormat(ruleToDelete.id) }}
          </div>
          <div class="mt-1 text-xs text-surface-dimmed">
            {{ formatConditions(ruleToDelete.conditions) }}
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Btn
          variant="default"
          @click="cancelDelete"
        >
          {{ t.dashboard.tags.deleteConfirm.cancel }}
        </Btn>
        <Btn
          variant="filled"
          color="error"
          @click="confirmDeleteRule"
        >
          {{ t.dashboard.tags.deleteConfirm.delete }}
        </Btn>
      </div>
    </Paper>
  </Modal>
</template>
