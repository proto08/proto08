'use client'

import { motion } from 'framer-motion'
import { ChevronUp, Rss, Send } from 'lucide-react'
import { Github } from '@/components/icons/github'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { scrollToSection } from '@/components/app/header'

const CARDS = [
  {
    icon: <Github />,
    link: 'test',
  },
  {
    icon: <Send />,
    link: 'test',
  },
  {
    icon: <Rss />,
    link: 'test',
  },
]

export default function Page() {
  return (
    <main className="min-h-screen">
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl mb-12">
            Hello, I&apos;m test 👋
          </h2>

          <div className="flex flex-row gap-8 mx-auto justify-center mb-24">
            {CARDS.map((card, index) => (
              <Link href={card.link} key={index} className="scale-140">
                {card.icon}
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      <Button
        onClick={() => scrollToSection('hero')}
        size="icon"
        className="fixed bottom-8 right-8 rounded-full shadow-lg"
      >
        <ChevronUp className="w-4 h-4" />
      </Button>
    </main>
  )
}
