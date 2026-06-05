import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { PreWithCopy } from './pre-with-copy'

interface ArticleProseProps {
  content: string
}

export async function ArticleProse({ content }: ArticleProseProps) {
  const { content: rendered } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSanitize,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [
            rehypePrettyCode,
            {
              theme: {
                dark: 'github-dark',
                light: 'github-light',
              },
              keepBackground: false,
            },
          ],
        ],
      },
    },
    components: {
      pre: PreWithCopy,
    },
  })

  return <div className="article-prose">{rendered}</div>
}
