import { cn } from '@/lib/utils'
import type { TocItem } from '@/types/article'

interface TableOfContentsProps {
  toc: TocItem[]
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  if (toc.length === 0) return null

  return (
    <nav aria-label="目次" className="rounded-xl border border-border p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        目次
      </p>
      <ol className="space-y-1.5">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                'block text-sm text-muted-foreground transition-colors hover:text-foreground',
                item.depth === 3 && 'pl-4'
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
