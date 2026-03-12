import type { Metadata } from 'next'
import {
  getAllArticles,
  getAllCategories,
  getArticlesByCategory,
} from '@/lib/articles'
import { ArticleList } from '@/components/articles/article-list'
import { CategoryFilter } from '@/components/articles/category-filter'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'ブログ記事一覧',
}

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function ArticlesPage({ searchParams }: Props) {
  const { category } = await searchParams

  const [articles, categories] = await Promise.all([
    category ? getArticlesByCategory(category) : getAllArticles(),
    getAllCategories(),
  ])

  // Validate category parameter
  const validCategory = category && categories.includes(category) ? category : undefined

  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-2 text-4xl font-bold">Articles</h1>
      <p className="mb-8 text-muted-foreground">{articles.length}件の記事</p>
      <div className="mb-8">
        <CategoryFilter categories={categories} activeCategory={validCategory} />
      </div>
      <ArticleList articles={articles} />
    </main>
  )
}
