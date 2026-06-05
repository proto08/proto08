import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleProse } from '@/components/articles/article-prose'
import { TableOfContents } from '@/components/articles/table-of-contents'
import { Badge } from '@/components/ui/badge'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const formattedDate = new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'long',
  }).format(new Date(article.date))

  return (
    <main className="mx-auto max-w-5xl px-4 py-20">
      <div className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge variant="secondary">{article.category}</Badge>
          <span className="text-sm text-muted-foreground">
            {article.readingTime}
          </span>
          <time className="text-sm text-muted-foreground">{formattedDate}</time>
        </div>
        <h1 className="mb-4 text-4xl font-bold leading-tight">
          {article.title}
        </h1>
        <p className="text-lg text-muted-foreground">{article.description}</p>
      </div>

      <div className="flex gap-10">
        <article className="min-w-0 flex-1">
          <ArticleProse content={article.content} />
        </article>
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-24">
            <TableOfContents toc={article.toc} />
          </div>
        </aside>
      </div>
    </main>
  )
}
