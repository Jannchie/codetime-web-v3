<script setup lang="ts">
import type { RuleConditionType, TagResponse, TagRuleResponse } from '~/api/v3/types.gen'
import { Btn, Paper, Select, TextField } from '@roku-ui/vue'
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

const saving = ref(false)

// OR 规则组管理
type RuleGroup = {
  id: string
  rules: TagRuleResponse[]
}

// 编辑状态管理
const isEditing = ref(false)
const editingRules = ref<TagRuleResponse[]>([])
const editingRuleGroups = ref<RuleGroup[]>([])

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

// hasGroupChanges 定义
const hasGroupChanges = computed(() => {
  if (!rules.value || editingRuleGroups.value.length === 0) {
    return false
  }
  const originalGroups = convertRulesToGroups(rules.value)
  return JSON.stringify(originalGroups) !== JSON.stringify(editingRuleGroups.value)
})

const hasChanges = computed(() => {
  return hasGroupChanges.value
})

// 将平铺的规则转换为分组结构
function convertRulesToGroups(ruleList: TagRuleResponse[]): RuleGroup[] {
  return ruleList.map(rule => ({
    id: rule.id,
    rules: [rule],
  }))
}

// 将分组结构转换为平铺规则
function convertGroupsToRules(groups: RuleGroup[]): TagRuleResponse[] {
  return groups.flatMap(group => group.rules)
}

// 检查用户是否为 free 用户以及规则数量限制
const isFreeUser = computed(() => user.value?.plan === 'free')
const maxRulesForFree = 1

// 检查是否可以创建更多规则组
const canCreateMoreRules = computed(() => {
  if (!isFreeUser.value) {
    return true
  }
  const currentLength = isEditing.value ? editingRuleGroups.value.length : (rules.value?.length || 0)
  return currentLength < maxRulesForFree
})

// 监听 rules 数据变化，同步到编辑状态
watch(rules, (newRules) => {
  if (newRules && !isEditing.value) {
    editingRules.value = structuredClone(newRules)
    editingRuleGroups.value = convertRulesToGroups(editingRules.value)
  }
}, { immediate: true })

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
  { label: `${t.value.dashboard.tags.common.not}${t.value.dashboard.tags.conditionTypes.CONTAINS}`, id: 'NOT_CONTAINS' },
  { label: `${t.value.dashboard.tags.common.not}${t.value.dashboard.tags.conditionTypes.EQUALS}`, id: 'NOT_EQUALS' },
  { label: `${t.value.dashboard.tags.common.not}${t.value.dashboard.tags.conditionTypes.STARTS_WITH}`, id: 'NOT_STARTS_WITH' },
  { label: `${t.value.dashboard.tags.common.not}${t.value.dashboard.tags.conditionTypes.ENDS_WITH}`, id: 'NOT_ENDS_WITH' },
  { label: `${t.value.dashboard.tags.common.not}${t.value.dashboard.tags.conditionTypes.REGEX}`, id: 'NOT_REGEX' },
])
const conditionTypeDisplayMap = computed(() => {
  return Object.fromEntries(conditionTypeOptions.value.map(c => [c.id, c.label]))
})
// 开始编辑
function startEditing() {
  isEditing.value = true
  if (rules.value) {
    editingRules.value = structuredClone(rules.value)
    editingRuleGroups.value = convertRulesToGroups(editingRules.value)
  }
}

// 创建新 OR 规则组
function createRuleGroup() {
  if (!isEditing.value) {
    startEditing()
  }

  const newRule: TagRuleResponse = {
    id: `temp-${Date.now()}`,
    tagId: props.tag.id,
    name: null,
    enabled: true,
    conditions: [{
      id: `temp-condition-${Date.now()}`,
      field: 'workspaceName',
      conditionType: 'CONTAINS' as RuleConditionType,
      value: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const newGroup: RuleGroup = {
    id: `temp-group-${Date.now()}`,
    rules: [newRule],
  }

  editingRuleGroups.value.push(newGroup)
  syncGroupsToRules()
}

// 同步规则组到平铺规则数组
function syncGroupsToRules() {
  editingRules.value = convertGroupsToRules(editingRuleGroups.value)
}

// 更新条件
function updateCondition(ruleId: string, conditionIndex: number, field: string, conditionType: RuleConditionType, value: string) {
  if (!isEditing.value) {
    startEditing()
  }

  for (const group of editingRuleGroups.value) {
    const rule = group.rules.find(r => r.id === ruleId)
    if (rule && rule.conditions[conditionIndex]) {
      rule.conditions[conditionIndex] = {
        ...rule.conditions[conditionIndex],
        field,
        conditionType,
        value,
      }
      syncGroupsToRules()
      break
    }
  }
}

// 添加 AND 条件到规则
function addConditionToRule(ruleId: string) {
  if (!isEditing.value) {
    startEditing()
  }

  for (const group of editingRuleGroups.value) {
    const rule = group.rules.find(r => r.id === ruleId)
    if (rule) {
      const newCondition = {
        id: `temp-condition-${Date.now()}`,
        field: 'workspaceName',
        conditionType: 'CONTAINS' as RuleConditionType,
        value: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      rule.conditions.push(newCondition)
      syncGroupsToRules()
      break
    }
  }
}

// 删除条件
function removeCondition(ruleId: string, conditionIndex: number) {
  if (!isEditing.value) {
    startEditing()
  }

  for (const group of editingRuleGroups.value) {
    const rule = group.rules.find(r => r.id === ruleId)
    if (rule && rule.conditions.length > 1) {
      rule.conditions.splice(conditionIndex, 1)
      syncGroupsToRules()
      break
    }
  }
}

// 保存更改
async function saveChanges() {
  try {
    saving.value = true

    // 处理删除的规则
    const originalIds = rules.value?.map(r => r.id) || []
    const editingIds = new Set(editingRules.value.map(r => r.id).filter(id => !id.startsWith('temp-')))
    const toDelete = originalIds.filter(id => !editingIds.has(id))

    for (const ruleId of toDelete) {
      await v3DeleteRule({ path: { rule_id: ruleId } })
    }

    // 处理新增和更新的规则
    for (const rule of editingRules.value) {
      const cleanConditions = rule.conditions.map(c => ({
        field: c.field,
        conditionType: c.conditionType,
        value: c.value,
      }))

      rule.id.startsWith('temp-')
        ? await v3CreateTagRule({
            path: { tag_id: props.tag.id },
            body: {
              name: null,
              conditions: cleanConditions,
            },
          })
        : await v3UpdateRule({
            path: { rule_id: rule.id },
            body: {
              name: null,
              conditions: cleanConditions,
            },
          })
    }

    await refreshRules()
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
  if (rules.value) {
    editingRules.value = structuredClone(rules.value)
    editingRuleGroups.value = convertRulesToGroups(editingRules.value)
  }
}

// 删除规则组
function removeRuleGroup(groupId: string) {
  if (!isEditing.value) {
    startEditing()
  }

  const groupIndex = editingRuleGroups.value.findIndex(g => g.id === groupId)
  if (groupIndex !== -1) {
    editingRuleGroups.value.splice(groupIndex, 1)
    syncGroupsToRules()
  }
}
</script>

<template>
  <Paper with-border class="rounded-xl flex flex-col h-full shadow-sm">
    <div class="mb-6 flex items-center justify-between">
      <div class="flex gap-3 items-center">
        <div
          class="rounded-full h-5 w-5 shadow-sm"
          :style="{ backgroundColor: tag.color }"
        />
        <div>
          <h3 class="text-lg font-medium">
            {{ tag.name }}
          </h3>
          <p class="text-xs text-surface-dimmed">
            {{ isEditing ? t.dashboard.tags.common.editingMode : t.dashboard.tags.common.ruleRelationship }}
          </p>
          <p v-if="isFreeUser" class="text-xs text-surface-dimmed">
            {{ t.dashboard.tags.tagRules.freeUserLimit }} {{ rules?.length || 0 }}/{{ maxRulesForFree }}
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

        <div v-if="!canCreateMoreRules && isFreeUser" class="text-xs text-surface-dimmed">
          {{ t.dashboard.tags.tagRules.upgradeForMore }}
        </div>
      </div>
    </div>

    <div v-if="!rules" class="flex-1 space-y-2">
      <div
        v-for="i in 2"
        :key="i"
        class="bg-surface-variant rounded-xl h-20 animate-pulse"
      />
    </div>

    <div v-else class="flex-1 space-y-2">
      <!-- 空状态提示 -->
      <div
        v-if="editingRuleGroups.length === 0"
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
      <template v-for="(group, groupIndex) in editingRuleGroups" :key="group.id">
        <!-- 规则组之间的 OR 连接符 -->
        <div
          v-if="groupIndex > 0"
          class="flex items-center"
        >
          <span class="text-xs text-surface-dimmed font-medium font-mono px-2 py-1 rounded bg-surface-variant-2">OR</span>
        </div>

        <!-- 遍历组内规则（当前简化为只有一个规则） -->
        <template v-for="rule in group.rules.slice(0, 1)" :key="rule.id">
          <div class="border-surface-variant-1 p-2 border rounded bg-surface">
            <!-- 条件行容器 -->
            <div class="flex gap-2 items-center justify-between">
              <!-- 左侧：条件列表 -->
              <div class="flex flex-1 flex-wrap gap-2 w-full items-center justify-between">
                <template v-for="(condition, conditionIndex) in rule.conditions" :key="conditionIndex">
                  <div>
                    <!-- 条件编辑表单 -->
                    <div class="flex gap-1 items-center">
                      <!-- 字段选择 -->
                      <Select
                        :model-value="condition.field"
                        :options="fieldOptions.map(f => f.id)"
                        :label-getter="f => fieldDisplayMap[f] ?? f"
                        class="text-xs min-w-24"
                        size="sm"
                        @update:model-value="(value) => updateCondition(rule.id, conditionIndex, value as string, condition.conditionType, condition.value)"
                      />

                      <!-- 操作符选择 -->
                      <Select
                        :model-value="condition.conditionType"
                        :options="conditionTypeOptions.map(c => c.id)"
                        :label-getter="c => conditionTypeDisplayMap[c] ?? c"
                        class="text-xs min-w-20"
                        size="sm"
                        @update:model-value="(value) => updateCondition(rule.id, conditionIndex, condition.field, value as RuleConditionType, condition.value)"
                      />

                      <!-- 值输入 -->
                      <TextField
                        :model-value="condition.value"
                        :placeholder="t.dashboard.tags.ruleForm.valuePlaceholder"
                        class="text-xs min-w-24"
                        size="sm"
                        @update:model-value="(value) => updateCondition(rule.id, conditionIndex, condition.field, condition.conditionType, value as string)"
                      />

                      <!-- 条件之间的 AND 连接符 -->
                      <span
                        v-if="conditionIndex < rule.conditions.length - 1"
                        class="text-xs text-surface-dimmed font-medium font-mono px-2 py-1 rounded bg-surface-variant-2"
                      >
                        AND
                      </span>
                      <!-- 添加 AND 条件按钮 -->
                      <Btn
                        v-if="conditionIndex === rule.conditions.length - 1"
                        variant="light"
                        size="sm"
                        @click="addConditionToRule(rule.id)"
                      >
                        <template #leftSection>
                          <i class="i-tabler-plus text-xs" />
                        </template>
                        <span class="text-xs">AND</span>
                      </Btn>
                    </div>
                  </div>
                  <div>
                    <!-- 删除单个条件按钮（仅在有多个条件时显示） -->
                    <Btn
                      v-if="rule.conditions.length > 1"
                      class="self-end"
                      icon
                      variant="light"
                      size="sm"
                      color="error"
                      title="删除此条件"
                      @click="removeCondition(rule.id, conditionIndex)"
                    >
                      <i class="i-tabler-x text-xs" />
                    </Btn>
                    <Btn
                      v-if="rule.conditions.length === 1"
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
      </template>

      <!-- 添加新 OR 组按钮 -->
      <div v-if="editingRuleGroups.length > 0" class="pt-2 flex justify-left">
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
