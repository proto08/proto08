import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import readingTime from "reading-time"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSanitize from "rehype-sanitize"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import type { Plugin } from "vite"
import type { Element, ElementContent, Root } from "hast"
import type { Article, ArticleMeta, TocItem } from "../src/types/article.ts"

export const articlesDir = path.resolve(
  import.meta.dirname,
  "../content/articles"
)

const SAFE_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: "wrap" })
  .use(rehypePrettyCode, {
    theme: { dark: "github-dark", light: "github-light" },
    keepBackground: false,
  })

// Source positions are only useful for debugging and bloat the client chunk.
function stripPositions(node: unknown): void {
  if (!node || typeof node !== "object") return
  const n = node as { position?: unknown; children?: unknown[] }
  delete n.position
  n.children?.forEach(stripPositions)
}

function textOf(node: ElementContent): string {
  if (node.type === "text") return node.value
  return "children" in node ? node.children.map(textOf).join("") : ""
}

// Read the TOC from the rendered tree so its ids always match rehype-slug's.
function extractToc(tree: Root): TocItem[] {
  return tree.children
    .filter(
      (n): n is Element =>
        n.type === "element" && (n.tagName === "h2" || n.tagName === "h3")
    )
    .filter((h) => typeof h.properties.id === "string")
    .map((h) => ({
      id: h.properties.id as string,
      text: textOf(h),
      depth: h.tagName === "h2" ? 2 : 3,
    }))
}

function toMeta(
  slug: string,
  data: Record<string, unknown>,
  content: string
): ArticleMeta {
  return {
    title: data.title as string,
    slug,
    description: data.description as string,
    date: data.date as string,
    category: data.category as string,
    tags: data.tags as string[] | undefined,
    published: data.published === true,
    readingTime: readingTime(content).text,
  }
}

/** Published article slugs, for prerendering. */
export async function listPublishedSlugs(): Promise<string[]> {
  const files = await fs.readdir(articlesDir).catch(() => [])
  const slugs = await Promise.all(
    files
      .filter((f) => f.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(articlesDir, file), "utf8")
        return matter(raw).data.published === true
          ? path.basename(file, ".md")
          : null
      })
  )
  return slugs.filter((s) => s !== null)
}

/**
 * Compiles `content/articles/*.md` at build time so no markdown tooling or
 * server runtime is needed to serve articles.
 *
 * - `foo.md?meta` → frontmatter + reading time (cheap, bundled eagerly)
 * - `foo.md`      → meta + toc + rendered HAST (one lazy chunk per article)
 *
 * Unpublished articles compile to `null` so drafts never reach the output.
 */
export function articles(): Plugin {
  return {
    name: "portfolio:articles",
    enforce: "pre",
    async load(id) {
      const [file = "", query] = id.split("?")
      if (path.dirname(file) !== articlesDir || !file.endsWith(".md")) return
      if (query !== undefined && query !== "meta") return

      const slug = path.basename(file, ".md")
      if (!SAFE_SLUG_RE.test(slug)) {
        this.error(`Article filename must be kebab-case: ${slug}.md`)
      }

      const { data, content } = matter(await fs.readFile(file, "utf8"))
      if (data.slug !== undefined && data.slug !== slug) {
        this.error(
          `Frontmatter slug "${data.slug}" does not match filename ${slug}.md`
        )
      }

      const meta = toMeta(slug, data, content)
      if (query === "meta") {
        return `export default ${JSON.stringify(meta)}`
      }
      if (!meta.published) return "export default null"

      const hast = await processor.run(processor.parse(content))
      stripPositions(hast)
      const article: Article = { ...meta, toc: extractToc(hast), hast }
      return `export default ${JSON.stringify(article)}`
    },
  }
}
