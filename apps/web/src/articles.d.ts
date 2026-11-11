// Modules produced by the articles Vite plugin (vite/articles.ts).
declare module "*.md?meta" {
  const meta: import("@/types/article").ArticleMeta
  export default meta
}

declare module "*.md" {
  const article: import("@/types/article").Article | null
  export default article
}
