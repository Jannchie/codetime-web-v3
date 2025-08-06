<script setup lang="ts">
import type { TagResponse } from '~/api/v3/types.gen'
import { Btn, Paper, Select, TextField } from '@roku-ui/vue'
import { v3UpdateTag } from '~/api/v3'
import { useUser } from '~/utils'
import { getTagDisplay } from '~/utils/tag'

// 定义规则相关的类型
type RuleConditionType = 'CONTAINS' | 'EQUALS' | 'STARTS_WITH' | 'ENDS_WITH' | 'REGEX' | 'NOT_CONTAINS' | 'NOT_EQUALS' | 'NOT_STARTS_WITH' | 'NOT_ENDS_WITH' | 'NOT_REGEX'

type RuleCondition = {
  field: string
  conditionType: RuleConditionType
  value: string
}

type RuleGroup = {
  operator: 'AND' | 'OR'
  conditions: (RuleCondition | RuleGroup)[]
}

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

const saving = ref(false)

// OR 规则组管理 - 内部编辑状态类型
type EditingRuleGroup = {
  id: string
  conditions: RuleCondition[]
}

// 编辑状态管理
const isEditing = ref(false)
const editingRuleGroups = ref<EditingRuleGroup[]>([])

// 从 TagResponse.rules 获取规则结构
const rules = computed(() => {
  return props.tag.rules as (RuleCondition | RuleGroup | null | undefined)
})

// hasGroupChanges 定义
const hasGroupChanges = computed(() => {
  const originalGroups = convertRulesToEditingGroups(rules.value)
  return JSON.stringify(originalGroups) !== JSON.stringify(editingRuleGroups.value)
})

const hasChanges = computed(() => {
  // 如果在编辑状态，允许保存（包括从无规则到有规则的情况）
  return isEditing.value && hasGroupChanges.value
})

// 将 API 规则结构转换为编辑状态的分组结构
function convertRulesToEditingGroups(apiRules: RuleCondition | RuleGroup | null | undefined): EditingRuleGroup[] {
  if (!apiRules) {
    return []
  }

  // 如果是单个条件，包装为一个组
  if ('field' in apiRules) {
    return [{
      id: `group-${Date.now()}`,
      conditions: [apiRules],
    }]
  }

  // 如果是规则组，根据 operator 处理
  if ('operator' in apiRules) {
    if (apiRules.operator === 'OR') {
      // OR 组：每个子条件/组成为独立的编辑组
      return apiRules.conditions.map((condition, index) =>
        'field' in condition
          ? {
              id: `group-${Date.now()}-${index}`,
              conditions: [condition],
            }
          : convertRulesToEditingGroups(condition)[0] || { // 嵌套组，递归处理
            id: `group-${Date.now()}-${index}`,
            conditions: [],
          },
      )
    }
    else if (apiRules.operator === 'AND') {
      // AND 组：所有条件在一个编辑组中
      const conditions: RuleCondition[] = []
      for (const condition of apiRules.conditions) {
        if ('field' in condition) {
          conditions.push(condition)
        }
      }
      return [{
        id: `group-${Date.now()}`,
        conditions,
      }]
    }
  }

  return []
}

// 将编辑状态的分组结构转换为 API 规则结构
function convertEditingGroupsToRules(groups: EditingRuleGroup[]): RuleCondition | RuleGroup | null {
  if (groups.length === 0) {
    return null
  }

  if (groups.length === 1) {
    const group = groups[0]
    if (group && group.conditions.length === 1) {
      // 单条件直接返回
      return group.conditions[0] || null
    }
    else if (group && group.conditions.length > 1) {
      // 多条件用 AND 连接
      return {
        operator: 'AND',
        conditions: group.conditions,
      }
    }
  }

  // 多组用 OR 连接
  const orConditions: (RuleCondition | RuleGroup)[] = groups
    .filter(group => group && group.conditions.length > 0)
    .map(group => group.conditions.length === 1
      ? group.conditions[0]
      : {
          operator: 'AND',
          conditions: group.conditions,
        },
    )
    .filter(condition => condition !== undefined) as (RuleCondition | RuleGroup)[]

  return {
    operator: 'OR',
    conditions: orConditions,
  }
}

// 检查用户是否为 free 用户以及规则数量限制
const isFreeUser = computed(() => user.value?.plan === 'free')
const maxRulesForFree = 1

// 检查是否可以创建更多规则组
const canCreateMoreRules = computed(() => {
  if (!isFreeUser.value) {
    return true
  }
  const currentLength = isEditing.value
    ? editingRuleGroups.value.length
    : convertRulesToEditingGroups(rules.value).length
  return currentLength < maxRulesForFree
})

// 监听 rules 数据变化，同步到编辑状态
watch(rules, (newRules) => {
  if (!isEditing.value) {
    editingRuleGroups.value = convertRulesToEditingGroups(newRules)
  }
}, { immediate: true })

// 监听 tag 变化，自动取消编辑状态
watch(() => props.tag.id, () => {
  if (isEditing.value) {
    isEditing.value = false
  }
})

// 显示的规则组（编辑状态或实际规则）
const displayRuleGroups = computed(() => {
  if (isEditing.value) {
    return editingRuleGroups.value
  }
  return convertRulesToEditingGroups(rules.value)
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
const fieldDisplayMap = computed(() => {
  return Object.fromEntries(fieldOptions.value.map(f => [f.id, f.label]))
})
// 条件类型选项
const conditionTypeOptions = computed(() => [
  { label: t.value.dashboard.tags.conditionTypes.CONTAINS, id: 'CONTAINS' },
  { label: t.value.dashboard.tags.conditionTypes.EQUALS, id: 'EQUALS' },
  { label: t.value.dashboard.tags.conditionTypes.STARTS_WITH, id: 'STARTS_WITH' },
  { label: t.value.dashboard.tags.conditionTypes.ENDS_WITH, id: 'ENDS_WITH' },
  { label: t.value.dashboard.tags.conditionTypes.REGEX, id: 'REGEX' },
  { label: t.value.dashboard.tags.conditionTypes.NOT_CONTAINS, id: 'NOT_CONTAINS' },
  { label: t.value.dashboard.tags.conditionTypes.NOT_EQUALS, id: 'NOT_EQUALS' },
  { label: t.value.dashboard.tags.conditionTypes.NOT_STARTS_WITH, id: 'NOT_STARTS_WITH' },
  { label: t.value.dashboard.tags.conditionTypes.NOT_ENDS_WITH, id: 'NOT_ENDS_WITH' },
  { label: t.value.dashboard.tags.conditionTypes.NOT_REGEX, id: 'NOT_REGEX' },
])
const conditionTypeDisplayMap = computed(() => {
  return Object.fromEntries(conditionTypeOptions.value.map(c => [c.id, c.label]))
})
// 开始编辑
function startEditing() {
  isEditing.value = true
  editingRuleGroups.value = rules.value ? convertRulesToEditingGroups(rules.value) : []
}

// 创建新 OR 规则组
function createRuleGroup() {
  if (!isEditing.value) {
    startEditing()
  }

  const newCondition: RuleCondition = {
    field: 'workspaceName',
    conditionType: 'CONTAINS' as RuleConditionType,
    value: '',
  }

  const newGroup: EditingRuleGroup = {
    id: `temp-group-${Date.now()}`,
    conditions: [newCondition],
  }

  editingRuleGroups.value.push(newGroup)
}

// 更新条件
function updateCondition(groupId: string, conditionIndex: number, field: string, conditionType: RuleConditionType, value: string) {
  if (!isEditing.value) {
    startEditing()
  }

  const group = editingRuleGroups.value.find(g => g.id === groupId)
  if (group && group.conditions[conditionIndex]) {
    group.conditions[conditionIndex] = {
      ...group.conditions[conditionIndex],
      field,
      conditionType,
      value,
    }
  }
}

// 添加 AND 条件到规则组
function addConditionToGroup(groupId: string) {
  if (!isEditing.value) {
    startEditing()
  }

  const group = editingRuleGroups.value.find(g => g.id === groupId)
  if (group) {
    const newCondition: RuleCondition = {
      field: 'workspaceName',
      conditionType: 'CONTAINS' as RuleConditionType,
      value: '',
    }
    group.conditions.push(newCondition)
  }
}

// 删除条件
function removeCondition(groupId: string, conditionIndex: number) {
  if (!isEditing.value) {
    startEditing()
  }

  const group = editingRuleGroups.value.find(g => g.id === groupId)
  if (group && group.conditions.length > 1) {
    group.conditions.splice(conditionIndex, 1)
  }
}

// 保存更改
async function saveChanges() {
  try {
    saving.value = true

    // 将编辑状态转换为 API 格式
    const newRules = convertEditingGroupsToRules(editingRuleGroups.value)

    // 使用 v3UpdateTag API 更新 tag 的 rules 字段
    await v3UpdateTag({
      path: { tag_id: props.tag.id },
      body: {
        name: props.tag.name,
        color: props.tag.color,
        emoji: props.tag.emoji,
        rules: newRules as unknown,
      } as any,
    })

    emit('refresh')
    isEditing.value = false
  }
  catch (error) {
    console.error('Failed to save changes:', error)
  }
  finally {
    saving.value = false
  }
}

// 取消编辑
function cancelEditing() {
  isEditing.value = false
  editingRuleGroups.value = rules.value ? convertRulesToEditingGroups(rules.value) : []
}

// 删除规则组
function removeRuleGroup(groupId: string) {
  if (!isEditing.value) {
    startEditing()
  }

  const groupIndex = editingRuleGroups.value.findIndex(g => g.id === groupId)
  if (groupIndex !== -1) {
    editingRuleGroups.value.splice(groupIndex, 1)
  }
}
</script>

<template>
  <Paper with-border class="rounded-xl flex flex-col h-full shadow-sm">
    <div class="mb-6 flex items-center justify-between">
      <div class="flex gap-3 items-center">
        <div
          class="text-sm font-medium rounded-full flex h-6 w-6 items-center justify-center"
          :style="{ backgroundColor: tag.color, color: 'white' }"
        >
          {{ getTagDisplay(tag) }}
        </div>
        <div>
          <h3 class="text-lg font-medium">
            {{ tag.name }}
          </h3>
          <p class="text-xs text-surface-dimmed">
            {{ isEditing ? t.dashboard.tags.common.editingMode : t.dashboard.tags.common.ruleRelationship }}
          </p>
          <p v-if="isFreeUser" class="text-xs text-surface-dimmed">
            {{ t.dashboard.tags.tagRules.freeUserLimit }} {{ convertRulesToEditingGroups(rules || null).length }}/{{ maxRulesForFree }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-2 items-end">
        <!-- 编辑模式的保存/取消按钮 -->
        <div v-if="isEditing" class="flex gap-2">
          <Btn
            variant="light"
            @click="cancelEditing"
          >
            {{ t.dashboard.tags.ruleForm.cancel }}
          </Btn>
          <Btn
            variant="filled"
            :disabled="!hasChanges || saving"
            :loading="saving"
            @click="saveChanges"
          >
            <template v-if="saving" #leftSection>
              <i class="i-tabler-loader animate-spin" />
            </template>
            {{ t.dashboard.tags.ruleForm.save }}
          </Btn>
        </div>

        <!-- 非编辑模式的编辑按钮 -->
        <div v-else class="flex gap-2">
          <Btn
            variant="light"
            @click="startEditing"
          >
            <template #leftSection>
              <i class="i-tabler-edit text-xs" />
            </template>
            {{ t.dashboard.tags.tagRules.edit }}
          </Btn>
        </div>

        <div v-if="!canCreateMoreRules && isFreeUser" class="text-xs text-surface-dimmed">
          {{ t.dashboard.tags.tagRules.upgradeForMore }}
        </div>
      </div>
    </div>

    <div class="flex-1 space-y-2">
      <!-- 空状态提示 -->
      <div
        v-if="displayRuleGroups.length === 0"
        class="text-surface-dimmed py-12 text-center flex flex-col items-center justify-center"
      >
        <div class="bg-surface-variant-highlight mb-4 p-4 rounded-full">
          <i class="i-tabler-rules-off text-4xl text-surface-dimmed" />
        </div>
        <p class="mb-4">
          {{ t.dashboard.tags.tagRules.noRules }}
        </p>
        <div v-if="isFreeUser" class="text-xs text-surface-dimmed mb-4">
          {{ t.dashboard.tags.common.freeUserRuleLimit }}
        </div>
        <Btn
          variant="light"
          :disabled="!canCreateMoreRules"
          @click="createRuleGroup"
        >
          <template #leftSection>
            <i class="i-tabler-plus" />
          </template>
          {{ t.dashboard.tags.tagRules.createRule }}
        </Btn>
        <div v-if="!canCreateMoreRules && isFreeUser" class="text-xs text-surface-dimmed mt-2">
          {{ t.dashboard.tags.common.upgradeForMoreRules }}
        </div>
      </div>

      <!-- OR 规则组列表 -->
      <template v-for="(group, groupIndex) in displayRuleGroups" :key="group.id">
        <!-- 规则组之间的 OR 连接符 -->
        <div
          v-if="groupIndex > 0"
          class="flex items-center"
        >
          <span class="text-xs text-surface-dimmed font-medium font-mono px-2 py-1 rounded bg-surface-variant-2">OR</span>
        </div>

        <!-- 遍历规则组 -->
        <div class="border-surface-variant-1 p-2 border rounded bg-surface">
          <!-- 条件行容器 -->
          <div class="flex gap-2 items-center justify-between">
            <!-- 左侧：条件列表 -->
            <div class="flex flex-1 flex-wrap gap-1 w-full items-center">
              <template v-for="(condition, conditionIndex) in group.conditions" :key="conditionIndex">
                <div>
                  <!-- 条件编辑/显示 -->
                  <div class="flex gap-1 items-center">
                    <template v-if="isEditing">
                      <!-- 编辑模式：字段选择 -->
                      <Select
                        :model-value="condition.field"
                        :options="fieldOptions.map(f => f.id)"
                        :label-getter="f => fieldDisplayMap[f] ?? f"
                        class="text-xs min-w-24"
                        size="sm"
                        @update:model-value="(value) => updateCondition(group.id, conditionIndex, value as string, condition.conditionType, condition.value)"
                      />

                      <!-- 操作符选择 -->
                      <Select
                        :model-value="condition.conditionType"
                        :options="conditionTypeOptions.map(c => c.id)"
                        :label-getter="c => conditionTypeDisplayMap[c] ?? c"
                        class="text-xs min-w-20"
                        size="sm"
                        @update:model-value="(value) => updateCondition(group.id, conditionIndex, condition.field, value as RuleConditionType, condition.value)"
                      />

                      <!-- 值输入 -->
                      <TextField
                        :model-value="condition.value"
                        :placeholder="t.dashboard.tags.ruleForm.valuePlaceholder"
                        class="text-xs min-w-24"
                        size="sm"
                        @update:model-value="(value) => updateCondition(group.id, conditionIndex, condition.field, condition.conditionType, value as string)"
                      />
                    </template>

                    <template v-else>
                      <!-- 只读模式：文本显示 -->
                      <span class="text-xs px-2 py-1 rounded bg-surface-variant-2">
                        {{ fieldDisplayMap[condition.field] || condition.field }}
                      </span>
                      <span class="text-xs px-2 py-1 rounded bg-surface-variant-2">
                        {{ conditionTypeDisplayMap[condition.conditionType] || condition.conditionType }}
                      </span>
                      <span class="text-xs font-mono px-2 py-1 rounded bg-surface-variant-2">
                        "{{ condition.value }}"
                      </span>
                    </template>

                    <!-- 条件之间的 AND 连接符 -->
                    <span
                      v-if="conditionIndex < group.conditions.length - 1"
                      class="text-xs text-surface-dimmed font-medium font-mono px-2 py-1 rounded bg-surface-variant-2"
                    >
                      AND
                    </span>
                    <!-- 添加 AND 条件按钮（仅编辑模式） -->
                    <Btn
                      v-if="isEditing && conditionIndex === group.conditions.length - 1"
                      variant="light"
                      size="sm"
                      @click="addConditionToGroup(group.id)"
                    >
                      <template #leftSection>
                        <i class="i-tabler-plus text-xs" />
                      </template>
                      <span class="text-xs">AND</span>
                    </Btn>
                  </div>
                </div>
                <div v-if="isEditing">
                  <!-- 删除单个条件按钮（仅在有多个条件时显示） -->
                  <Btn
                    v-if="group.conditions.length > 1"
                    class="self-end"
                    icon
                    variant="light"
                    size="sm"
                    color="error"
                    title="删除此条件"
                    @click="removeCondition(group.id, conditionIndex)"
                  >
                    <i class="i-tabler-x text-xs" />
                  </Btn>
                  <Btn
                    v-if="group.conditions.length === 1"
                    icon
                    variant="light"
                    size="sm"
                    color="error"
                    title="删除整个规则组"
                    @click="removeRuleGroup(group.id)"
                  >
                    <i class="i-tabler-x text-xs" />
                  </Btn>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>

      <!-- 添加新 OR 组按钮（仅编辑模式） -->
      <div v-if="isEditing && editingRuleGroups.length > 0" class="pt-2 flex justify-left">
        <Btn
          variant="light"
          :disabled="!canCreateMoreRules"
          size="sm"
          @click="createRuleGroup"
        >
          <template #leftSection>
            <i class="i-tabler-plus" />
          </template>
          <span class="text-sm">OR</span>
        </Btn>
      </div>
    </div>
  </Paper>
</template>
