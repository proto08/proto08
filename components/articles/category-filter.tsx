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
    <div className="flex flex-wrap gap-2">
      <Link
        href="/articles"
        className={cn(
          'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
          !activeCategory
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        )}
      >
        すべて
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/articles?category=${category}`}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            activeCategory === category
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          {category}
        </Link>
      ))}
    </div>
  )
}
