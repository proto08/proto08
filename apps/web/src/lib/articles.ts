import type { Article, ArticleMeta } from "@/types/article"

// Both globs are compiled at build time by the articles Vite plugin.
const metaModules = import.meta.glob<ArticleMeta>(
  "../../content/articles/*.md",
  { query: "?meta", import: "default", eager: true }
)
const articleModules = import.meta.glob<Article | null>(
  "../../content/articles/*.md",
  { import: "default" }
)

const articles = Object.values(metaModules)
  .filter((article) => article.published)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const allCategories = Array.from(
  new Set(articles.map((article) => article.category))
).sort()

export function getArticles(): ArticleMeta[] {
  return articles
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return articles.filter((article) => article.category === category)
}

export function getAllCategories(): string[] {
  return allCategories
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const key = `../../content/articles/${slug}.md`
  if (!Object.hasOwn(articleModules, key)) return null
  return (await articleModules[key]?.()) ?? null
}
