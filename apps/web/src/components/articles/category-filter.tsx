import { Link } from "@tanstack/react-router"
import { cn } from "@workspace/ui/lib/utils"

interface CategoryFilterProps {
  categories: string[]
  activeCategory?: string
}

function linkClass(active: boolean) {
  return cn(
    "text-sm transition-colors",
    active
      ? "font-medium text-foreground underline underline-offset-4"
      : "text-muted-foreground hover:text-foreground"
  )
}

export function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-5">
      <Link to="/articles" className={linkClass(!activeCategory)}>
        すべて
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          to="/articles/category/$category"
          params={{ category }}
          className={linkClass(activeCategory === category)}
        >
          {category}
        </Link>
      ))}
    </div>
  )
}
