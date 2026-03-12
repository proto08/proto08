import Link from 'next/link'
import type { ArticleMeta } from '@/types/article'

interface ArticleCardProps {
  article: ArticleMeta
}

export function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'long',
  }).format(new Date(article.date))

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group -mx-4 block rounded-lg px-4 py-5 transition-colors hover:bg-muted/40"
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{article.category}</span>
        <time className="text-xs text-muted-foreground">{formattedDate}</time>
      </div>
      <h2 className="mb-1 text-lg font-semibold transition-colors group-hover:text-primary">
        {article.title}
      </h2>
      <p className="line-clamp-2 text-sm text-muted-foreground">
        {article.description}
      </p>
    </Link>
  )
}
