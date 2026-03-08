import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'
import type { TocItem } from '@/types/article'

function getTextContent(node: any): string {
  if (node.type === 'text') return node.value as string
  if (node.children)
    return (node.children as any[]).map(getTextContent).join('')
  return ''
}

function rehypeExtractToc(toc: TocItem[]) {
  return () => (tree: any) => {
    function walk(node: any) {
      if (
        node.type === 'element' &&
        (node.tagName === 'h2' || node.tagName === 'h3')
      ) {
        const depth = (node.tagName === 'h2' ? 2 : 3) as 2 | 3
        const id = node.properties?.id as string | undefined
        if (id) {
          const text = getTextContent(node)
          toc.push({ id, text, depth })
        }
      }
      if (node.children) {
        ;(node.children as any[]).forEach(walk)
      }
    }
    walk(tree)
  }
}

export async function renderMarkdown(
  raw: string
): Promise<{ html: string; toc: TocItem[] }> {
  const toc: TocItem[] = []

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeExtractToc(toc))
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypePrettyCode, {
      theme: {
        dark: 'github-dark',
        light: 'github-light',
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(raw)

  return { html: String(file), toc }
}
