export const profile = {
  name: "test",
  nameEn: "test",
  handle: "test",
  role: "test",
  tagline: "test",
  bio: ["test", "test"],
  location: "test",
  siteUrl: "test",
  links: {
    github: "test",
    x: "test",
    email: "test",
  },
  skills: ["test", "test", "test", "test", "test", "test", "test", "test", "test", "test"],
}

export type Project = {
  title: string
  event: string
  year: string
  award?: string
  description: string
  stack: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    title: "OpenDopa",
    event: "Progateハッカソン Powered By ProjectLINKS",
    year: "2026",
    award: "最優秀賞 / ProjectLINKS賞",
    description:
      "",
    stack: [""],
    links: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "Topaz", href: "https://topaz.dev" },
    ],
  },
]

export type Experience = {
  company: string
  role: string
  period: string
  type: string
  summary: string
  highlights: string[]
  stack: string[]
}

export const experiences: Experience[] = [
  {
    company: "test",
    role: "test",
    period: "test",
    type: "test",
    summary: "test",
    highlights: [
      "test"
    ],
    stack: ["test", "test", "test"],
  },
]
