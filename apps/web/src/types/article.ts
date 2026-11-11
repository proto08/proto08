import type { Root } from "hast"

export interface TocItem {
  id: string
  text: string
  depth: 2 | 3
}

export interface ArticleFrontmatter {
  title: string
  slug: string
  description: string
  date: string
  category: string
  tags?: string[]
  published: boolean
}

export interface ArticleMeta extends ArticleFrontmatter {
  readingTime: string
}

export interface Article extends ArticleMeta {
  /** Rendered markdown as a HAST tree, compiled at build time. */
  hast: Root
  toc: TocItem[]
}
