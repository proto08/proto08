'use client'

import { motion } from 'framer-motion'
import { ChevronUp, Github, Rss, Send } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { scrollToSection } from '@/components/app/header'

const CARDS = [
  {
    icon: <Github />,
    link: 'https://github.com/proto08',
  },
  {
    icon: <Send />,
    link: 'https://t.me/traderjwjajs',
  },
  {
    icon: <Rss />,
    link: 'https://zenn.dev/64919',
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
            Hello, I&apos;m Proto 👋
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
