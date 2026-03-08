'use client'

import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { CopyButton } from './copy-button'

interface ArticleProseProps {
  content: string
}

export function ArticleProse({ content }: ArticleProseProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const roots: ReturnType<typeof createRoot>[] = []

    ref.current.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('[data-copy-button]')) return

      const code = pre.querySelector('code')
      const text = code?.textContent ?? ''

      const wrapper = document.createElement('div')
      wrapper.setAttribute('data-copy-button', '')
      pre.appendChild(wrapper)

      const root = createRoot(wrapper)
      root.render(<CopyButton text={text} />)
      roots.push(root)
    })

    return () => {
      roots.forEach((root) => {
        setTimeout(() => root.unmount(), 0)
      })
    }
  }, [content])

  return (
    <div
      ref={ref}
      className="article-prose"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
