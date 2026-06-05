'use client'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-0.5 bg-background/75 backdrop-blur-md border border-border/50 rounded-full px-2 py-1.5 shadow-sm shadow-black/10 dark:shadow-black/30">
        <NavLink href="/" active={pathname === '/'}>
          Home
        </NavLink>
        <NavLink href="/articles" active={pathname.startsWith('/articles')}>
          Blogs
        </NavLink>

        <div className="w-px h-3.5 bg-border/70 mx-1" />

        <ThemeToggle />
      </nav>
    </header>
  )
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        'px-3 py-1 text-sm font-medium rounded-full transition-all duration-150',
        active
          ? 'bg-foreground text-background'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
      )}
    >
      {children}
    </Link>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-150"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </button>
  )
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
