import { Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import { Mail, Rss } from "lucide-react"
import { Github } from "@/components/icons/github"
import { profile } from "@/lib/data"

const LINKS = [
  { label: "GitHub", icon: <Github />, href: profile.links.github },
  { label: "Email", icon: <Mail />, href: profile.links.email },
]

const LINK_CLASS = "scale-140 transition-opacity hover:opacity-70"

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen items-center justify-center px-4"
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mb-6 text-4xl md:text-6xl">
          Hello, I&apos;m {profile.nameEn} 👋
        </h2>
        <p className="mb-12 text-muted-foreground">{profile.tagline}</p>

        <div className="mx-auto mb-24 flex flex-row justify-center gap-8">
          {LINKS.map((l) => (
            <a
              href={l.href}
              key={l.label}
              aria-label={l.label}
              className={LINK_CLASS}
            >
              {l.icon}
            </a>
          ))}
          <Link to="/articles" aria-label="Blog" className={LINK_CLASS}>
            <Rss />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
