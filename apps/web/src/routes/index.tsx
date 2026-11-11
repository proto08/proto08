import { Link, createFileRoute } from "@tanstack/react-router"
import { Badge } from "@workspace/ui/components/badge"
import { Hero } from "@/components/app/hero"
import { ScrollTopButton } from "@/components/app/scroll-top-button"
import { ArticleList } from "@/components/articles/article-list"
import { ExperienceItem } from "@/components/experience-item"
import { ProjectCard } from "@/components/project-card"
import { Section } from "@/components/section"
import { getArticles } from "@/lib/articles"
import { experiences, profile, projects } from "@/lib/data"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  const articles = getArticles().slice(0, 3)

  return (
    <main className="min-h-screen">
      <Hero />

      <Section id="about" title="About">
        <div className="space-y-4 leading-relaxed">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {profile.skills.map((s) => (
            <Badge key={s} variant="secondary">
              {s}
            </Badge>
          ))}
        </div>
      </Section>

      <Section id="works" title="Hackathon Works">
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </Section>

      <Section id="experience" title="Internships">
        <ol>
          {experiences.map((e) => (
            <ExperienceItem key={e.company + e.period} exp={e} />
          ))}
        </ol>
      </Section>

      <Section id="articles" title="Articles">
        <ArticleList articles={articles} />
        <Link
          to="/articles"
          className="mt-4 inline-block text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          すべての記事 →
        </Link>
      </Section>

      <ScrollTopButton />
    </main>
  )
}
