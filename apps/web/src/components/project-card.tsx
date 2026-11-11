import { ExternalLinkIcon, TrophyIcon } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import type { Project } from "@/lib/data"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full transition-transform hover:-translate-y-0.5">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardDescription>{project.event}</CardDescription>
          {project.award && (
            <Badge>
              <TrophyIcon /> {project.award}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Badge key={s} variant="secondary">
              {s}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
            >
              {l.label} <ExternalLinkIcon className="size-3" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
