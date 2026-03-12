import type { TocItem } from '@/types/article'

// Matches rehype-slug's ID generation (github-slugger compatible)
function toSlugId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function extractToc(markdown: string): TocItem[] {
  const toc: TocItem[] = []
  const seen = new Map<string, number>()
  let inCodeBlock = false

  for (const line of markdown.split('\n')) {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const match = line.match(/^(#{2,3})\s+(.+)/)
    if (match) {
      const depth = match[1].length as 2 | 3
      const text = match[2].trim()
      const base = toSlugId(text) || `heading-${toc.length}`

      // Deduplicate like github-slugger: append -1, -2, ...
      const count = seen.get(base) ?? 0
      const id = count === 0 ? base : `${base}-${count}`
      seen.set(base, count + 1)

      toc.push({ id, text, depth })
    }
  }

  return toc
}
