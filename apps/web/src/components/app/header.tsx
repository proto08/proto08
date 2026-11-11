import { Link, useLocation } from "@tanstack/react-router"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@workspace/ui/lib/utils"
import { profile } from "@/lib/data"

export default function Header() {
  const pathname = useLocation({ select: (l) => l.pathname })

  return (
    <header className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
      <nav className="flex items-center gap-0.5 rounded-full border border-border/50 bg-background/75 px-2 py-1.5 shadow-sm shadow-black/10 backdrop-blur-md dark:shadow-black/30">
        <Link
          to="/"
          className="rounded-full px-3 py-1 text-sm font-semibold text-foreground/70 transition-colors select-none hover:text-foreground"
        >
          {profile.handle}
        </Link>

        <div className="mx-1 h-3.5 w-px bg-border/70" />

        <NavLink to="/" active={pathname === "/"}>
          Home
        </NavLink>
        <NavLink to="/" hash="works" active={false}>
          Works
        </NavLink>
        <NavLink to="/" hash="experience" active={false}>
          Experience
        </NavLink>
        <NavLink to="/articles" active={pathname.startsWith("/articles")}>
          Blogs
        </NavLink>

        <div className="mx-1 h-3.5 w-px bg-border/70" />

        <ThemeToggle />
      </nav>
    </header>
  )
}

function NavLink({
  to,
  hash,
  active,
  children,
}: {
  to: "/" | "/articles"
  hash?: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      to={to}
      hash={hash}
      className={cn(
        "rounded-full px-3 py-1 text-sm font-medium transition-all duration-150",
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
      )}
    >
      {children}
    </Link>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-150 hover:bg-accent/60 hover:text-foreground"
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
    element.scrollIntoView({ behavior: "smooth" })
  }
}
