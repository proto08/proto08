import { createFileRoute } from "@tanstack/react-router"
import { NotFound } from "@/components/app/not-found"
import { pageMeta } from "@/lib/seo"

// Prerendered to /404.html (see vite.config.ts) for static hosts.
export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [
      ...pageMeta({ title: "Page Not Found" }),
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFound,
})
