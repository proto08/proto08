import { createFileRoute, notFound } from "@tanstack/react-router"
import { ArticlesPage } from "@/components/articles/articles-page"
import { getAllCategories, getArticlesByCategory } from "@/lib/articles"
import { pageMeta } from "@/lib/seo"

export const Route = createFileRoute("/articles/category/$category")({
  loader: ({ params }) => {
    if (!getAllCategories().includes(params.category)) throw notFound()
  },
  head: ({ params }) => ({
    meta: pageMeta({
      title: `Articles: ${params.category}`,
      description: `${params.category} の記事一覧`,
    }),
  }),
  component: CategoryPage,
})

function CategoryPage() {
  const { category } = Route.useParams()
  return (
    <ArticlesPage
      articles={getArticlesByCategory(category)}
      activeCategory={category}
    />
  )
}
