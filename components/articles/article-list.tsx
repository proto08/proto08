import type { ArticleMeta } from '@/types/article'
import { ArticleCard } from './article-card'

interface ArticleListProps {
  articles: ArticleMeta[]
}

export function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-lg">記事がありません</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  )
}
