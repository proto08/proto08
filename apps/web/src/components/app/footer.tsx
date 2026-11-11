import { profile } from "@/lib/data"

export default function Footer() {
  return (
    <footer className="border-t border-border/50 px-4 py-12">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-2 text-sm text-muted-foreground">
          Made with ❤️ using{" "}
          <a
            href="https://tanstack.com/start"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            TanStack Start
          </a>
          {" & "}
          <a
            href="https://ui.shadcn.com"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            shadcn/ui
          </a>
        </p>
        <p className="text-sm text-muted-foreground">
          Source code available on{" "}
          <a
            href={profile.links.github}
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
}
