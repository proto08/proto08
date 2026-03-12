'use client'

import { Check, Copy } from 'lucide-react'
import { useCopyCode } from '@/services/articles'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const { copied, copy } = useCopyCode(text)

  return (
    <button
      onClick={copy}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      className="copy-button"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  )
}
