export type RuleConditionType = 'CONTAINS' | 'EQUALS' | 'STARTS_WITH' | 'ENDS_WITH' | 'REGEX' | 'NOT_CONTAINS' | 'NOT_EQUALS' | 'NOT_STARTS_WITH' | 'NOT_ENDS_WITH' | 'NOT_REGEX'

export type RuleCondition = {
  field: string
  conditionType: RuleConditionType
  value: string
}

export type RuleGroup = {
  operator: 'AND' | 'OR'
  conditions: (RuleCondition | RuleGroup)[]
}

export type RuleTree = RuleCondition | RuleGroup | null | undefined

/**
 * Number of leaf conditions in a tag's rule tree. The API stores either a
 * single condition, an AND/OR group, or null — all three collapse to a count
 * so list rows can show how "wired up" a tag is without unfolding the tree.
 */
export function countTagConditions(rules: RuleTree): number {
  if (!rules) {
    return 0
  }
  if ('field' in rules) {
    return 1
  }
  return rules.conditions.reduce((sum, child) => sum + countTagConditions(child), 0)
}

export function getTagDisplay(tag: { emoji?: string | null, name: string }) {
  if (tag.emoji) {
    return tag.emoji
  }
  // Return first character of tag name as fallback
  return tag.name.charAt(0).toUpperCase()
}
