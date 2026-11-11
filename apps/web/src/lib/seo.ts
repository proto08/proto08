import { profile } from "@/lib/data"

/** Head tags for a page, following the site's `Page | Name` title pattern. */
export function pageMeta({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  const fullTitle = `${title} | ${profile.name}`
  return [
    { title: fullTitle },
    { property: "og:title", content: fullTitle },
    ...(description
      ? [
          { name: "description", content: description },
          { property: "og:description", content: description },
        ]
      : []),
  ]
}
