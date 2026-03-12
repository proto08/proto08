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
  content: string
  toc: TocItem[]
}
