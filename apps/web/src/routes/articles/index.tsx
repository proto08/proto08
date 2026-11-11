import { createFileRoute } from "@tanstack/react-router"
import { ArticlesPage } from "@/components/articles/articles-page"
import { getAllArticles } from "@/lib/articles"
import { pageMeta } from "@/lib/seo"

export const Route = createFileRoute("/articles/")({
  head: () => ({
    meta: pageMeta({ title: "Articles", description: "ブログ記事一覧" }),
  }),
  component: () => <ArticlesPage articles={getAllArticles()} />,
})
