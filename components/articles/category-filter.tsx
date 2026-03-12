import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  categories: string[]
  activeCategory?: string
}

export function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-5">
      <Link
        href="/articles"
        className={cn(
          'text-sm transition-colors',
          !activeCategory
            ? 'font-medium text-foreground underline underline-offset-4'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        すべて
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/articles?category=${category}`}
          className={cn(
            'text-sm transition-colors',
            activeCategory === category
              ? 'font-medium text-foreground underline underline-offset-4'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {category}
        </Link>
      ))}
    </div>
  )
}
