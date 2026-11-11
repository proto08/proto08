import { ArticleList } from "@/components/articles/article-list"
import { CategoryFilter } from "@/components/articles/category-filter"
import { getAllCategories } from "@/lib/articles"
import type { ArticleMeta } from "@/types/article"

interface ArticlesPageProps {
  articles: ArticleMeta[]
  activeCategory?: string
}

export function ArticlesPage({ articles, activeCategory }: ArticlesPageProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-2 text-4xl font-bold">Articles</h1>
      <p className="mb-8 text-muted-foreground">{articles.length}件の記事</p>
      <div className="mb-8">
        <CategoryFilter
          categories={getAllCategories()}
          activeCategory={activeCategory}
        />
      </div>
      <ArticleList articles={articles} />
    </main>
  )
}
