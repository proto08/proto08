import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
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
      className="group block rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-2">
        <Badge variant="secondary">{article.category}</Badge>
        <span className="text-xs text-muted-foreground">
          {article.readingTime}
        </span>
      </div>
      <h2 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
        {article.title}
      </h2>
      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
        {article.description}
      </p>
      <time className="text-xs text-muted-foreground">{formattedDate}</time>
    </Link>
  )
}
