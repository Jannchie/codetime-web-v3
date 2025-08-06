<script setup lang="ts">
import type { TagResponse } from '~/api/v3/types.gen'
import { Btn, Modal, Paper, Select, TextField } from '@roku-ui/vue'

// 定义规则相关的类型
type RuleConditionType = 'CONTAINS' | 'EQUALS' | 'STARTS_WITH' | 'ENDS_WITH' | 'REGEX' | 'NOT_CONTAINS' | 'NOT_EQUALS' | 'NOT_STARTS_WITH' | 'NOT_ENDS_WITH' | 'NOT_REGEX'

type RuleCondition = {
  field: string
  conditionType: RuleConditionType
  value: string
}

type RuleGroup = {
  conditions: RuleCondition[]
  name?: string
}

type Props = {
  tag: TagResponse
  rule?: RuleGroup | null
}

type Emits = {
  (e: 'save', data: { name: string | null, conditions: RuleCondition[] }): void
  (e: 'close'): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const modelValue = defineModel<boolean>('modelValue', { required: true })

const t = useI18N()

const formData = reactive({
  conditions: props.rule?.conditions.map((c: RuleCondition) => ({
    field: c.field,
    conditionType: c.conditionType,
    value: c.value,
  })) || [{
    field: 'workspaceName',
    conditionType: 'CONTAINS' as RuleConditionType,
    value: '',
  }],
})

const isEditing = computed(() => !!props.rule)
const saving = ref(false)

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
  { label: `不${t.value.dashboard.tags.conditionTypes.CONTAINS}`, id: 'NOT_CONTAINS' },
  { label: `不${t.value.dashboard.tags.conditionTypes.EQUALS}`, id: 'NOT_EQUALS' },
  { label: `不${t.value.dashboard.tags.conditionTypes.STARTS_WITH}`, id: 'NOT_STARTS_WITH' },
  { label: `不${t.value.dashboard.tags.conditionTypes.ENDS_WITH}`, id: 'NOT_ENDS_WITH' },
  { label: `不${t.value.dashboard.tags.conditionTypes.REGEX}`, id: 'NOT_REGEX' },
])

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

// 保存规则
async function handleSave() {
  if (formData.conditions.some((c: RuleCondition) => !c.value.trim())) {
    return
  }

  try {
    saving.value = true
    emit('save', {
      name: null,
      conditions: formData.conditions.filter((c: RuleCondition) => c.value.trim()),
    })
    modelValue.value = false
  }
  finally {
    saving.value = false
  }
}

function handleClose() {
  modelValue.value = false
  emit('close')
}
</script>

<template>
  <Modal v-model="modelValue">
    <Paper class="max-h-[90vh] max-w-2xl w-full overflow-visible" with-border>
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-xl font-semibold">
          {{ isEditing ? t.dashboard.tags.ruleForm.edit : t.dashboard.tags.ruleForm.create }}
        </h2>
        <Btn
          variant="light"
          size="sm"
          @click="handleClose"
        >
          <template #leftSection>
            <i class="i-tabler-x" />
          </template>
        </Btn>
      </div>

      <form id="rule-form" class="space-y-6" @submit.prevent="handleSave">
        <!-- 条件列表 -->
        <div>
          <div class="mb-4 flex items-center justify-between">
            <label class="text-sm font-medium block">
              {{ t.dashboard.tags.ruleForm.conditions }}
            </label>
            <Btn
              type="button"
              variant="light"
              size="sm"
              @click="addCondition"
            >
              <template #leftSection>
                <i class="i-tabler-plus" />
              </template>
              {{ t.dashboard.tags.ruleForm.addCondition }}
            </Btn>
          </div>

          <div class="space-y-4">
            <div
              v-for="(condition, index) in formData.conditions"
              :key="index"
              class="p-4 border border-surface-variant rounded-lg"
            >
              <div class="gap-4 grid grid-cols-1 md:grid-cols-4">
                <!-- 字段选择 -->
                <div class="relative z-[1000]">
                  <label class="text-xs text-surface-dimmed font-medium mb-1 block">
                    {{ t.dashboard.tags.ruleForm.field }}
                  </label>
                  <Select
                    v-model="condition.field"
                    :options="fieldOptions.map(d => d.id)"
                    :placeholder="t.dashboard.tags.ruleForm.field"
                    class="[&>div]:!z-[1001]"
                  />
                </div>

                <!-- 条件类型 -->
                <div class="relative z-[1000]">
                  <label class="text-xs text-surface-dimmed font-medium mb-1 block">
                    {{ t.dashboard.tags.ruleForm.conditionType }}
                  </label>
                  <Select
                    v-model="condition.conditionType"
                    :options="conditionTypeOptions.map(d => d.id)"
                    :placeholder="t.dashboard.tags.ruleForm.conditionType"
                    class="[&>div]:!z-[1001]"
                  />
                </div>

                <!-- 值 -->
                <div>
                  <label class="text-xs text-surface-dimmed font-medium mb-1 block">
                    {{ t.dashboard.tags.ruleForm.value }}
                  </label>
                  <TextField
                    v-model="condition.value"
                    :placeholder="t.dashboard.tags.ruleForm.valuePlaceholder"
                    required
                  />
                </div>

                <!-- 操作按钮 -->
                <div class="flex gap-2 items-end">
                  <Btn
                    v-if="formData.conditions.length > 1"
                    type="button"
                    variant="light"
                    size="sm"
                    color="error"
                    @click="removeCondition(index)"
                  >
                    <template #leftSection>
                      <i class="i-tabler-trash" />
                    </template>
                  </Btn>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 按钮组 -->
        <div class="mt-6 pt-6 flex gap-3">
          <Btn
            type="button"
            variant="light"
            class="flex-1"
            @click="handleClose"
          >
            {{ t.dashboard.tags.ruleForm.cancel }}
          </Btn>
          <Btn
            form="rule-form"
            type="submit"
            class="flex-1"
            :disabled="formData.conditions.some((c: RuleCondition) => !c.value.trim()) || saving"
            @click="handleSave"
          >
            <template v-if="saving" #leftSection>
              <i class="i-tabler-loader animate-spin" />
            </template>
            {{ isEditing ? t.dashboard.tags.ruleForm.save : t.dashboard.tags.ruleForm.create }}
          </Btn>
        </div>
      </form>
    </Paper>
  </Modal>
</template>
