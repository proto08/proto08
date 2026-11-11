import { createFileRoute, notFound } from "@tanstack/react-router"
import { Badge } from "@workspace/ui/components/badge"
import { ArticleProse } from "@/components/articles/article-prose"
import { TableOfContents } from "@/components/articles/table-of-contents"
import { getArticleBySlug } from "@/lib/articles"
import { pageMeta } from "@/lib/seo"

export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ params }) => {
    const article = await getArticleBySlug(params.slug)
    if (!article) throw notFound()
    return article
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? pageMeta({
          title: loaderData.title,
          description: loaderData.description,
        })
      : [],
  }),
  component: ArticlePage,
})

function ArticlePage() {
  const article = Route.useLoaderData()

  const formattedDate = new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "long",
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
        <h1 className="mb-4 text-4xl leading-tight font-bold">
          {article.title}
        </h1>
        <p className="text-lg text-muted-foreground">{article.description}</p>
      </div>

      <div className="flex gap-10">
        <article className="min-w-0 flex-1">
          <ArticleProse hast={article.hast} />
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
