import { Badge } from "@workspace/ui/components/badge"
import type { Experience } from "@/lib/data"

export function ExperienceItem({ exp }: { exp: Experience }) {
  return (
    <li className="relative border-l border-border pb-10 pl-6 last:pb-0">
      <span className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-foreground" />
      <p className="font-mono text-xs text-muted-foreground">
        {exp.period} · {exp.type}
      </p>
      <h3 className="mt-1 text-lg font-semibold">
        {exp.company}
        <span className="ml-2 text-sm font-normal text-muted-foreground">
          {exp.role}
        </span>
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{exp.summary}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed">
        {exp.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {exp.stack.map((s) => (
          <Badge key={s} variant="outline">
            {s}
          </Badge>
        ))}
      </div>
    </li>
  )
}
