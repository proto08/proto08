import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { extractToc } from '@/lib/markdown'
import type { Article, ArticleMeta } from '@/types/article'

const articlesDir = path.join(process.cwd(), 'content/articles')

async function readAllMeta(): Promise<ArticleMeta[]> {
  let files: string[]
  try {
    files = await fs.readdir(articlesDir)
  } catch {
    return []
  }

  const articles = await Promise.all(
    files
      .filter((f) => f.endsWith('.md'))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(articlesDir, file), 'utf8')
        const { data, content } = matter(raw)
        if (!data.published) return null
        return {
          title: data.title as string,
          slug: data.slug as string,
          description: data.description as string,
          date: data.date as string,
          category: data.category as string,
          tags: data.tags as string[] | undefined,
          published: data.published as boolean,
          readingTime: readingTime(content).text,
        } as ArticleMeta
      })
  )

  return articles
    .filter((a): a is ArticleMeta => a !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  return readAllMeta()
}

export async function getArticlesByCategory(
  category: string
): Promise<ArticleMeta[]> {
  const all = await readAllMeta()
  return all.filter((a) => a.category === category)
}

export async function getAllCategories(): Promise<string[]> {
  const all = await readAllMeta()
  return Array.from(new Set(all.map((a) => a.category))).sort()
}

const SAFE_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!SAFE_SLUG_RE.test(slug)) return null
  const filePath = path.join(articlesDir, `${slug}.md`)
  let raw: string
  try {
    raw = await fs.readFile(filePath, 'utf8')
  } catch {
    return null
  }

  const { data, content } = matter(raw)
  if (!data.published) return null

  return {
    title: data.title as string,
    slug: data.slug as string,
    description: data.description as string,
    date: data.date as string,
    category: data.category as string,
    tags: data.tags as string[] | undefined,
    published: data.published as boolean,
    readingTime: readingTime(content).text,
    content, // raw markdown — rendered by ArticleProse via react-markdown
    toc: extractToc(content),
  }
}
