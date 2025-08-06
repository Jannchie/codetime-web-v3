export function getTagDisplay(tag: { emoji?: string | null, name: string }) {
  if (tag.emoji) {
    return tag.emoji
  }
  // Return first character of tag name as fallback
  return tag.name.charAt(0).toUpperCase()
}

export function getTagFullDisplay(tag: { emoji?: string | null, name: string }) {
  const display = getTagDisplay(tag)
  return `${display} ${tag.name}`
}
