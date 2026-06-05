'use client'

import { useCallback, useState } from 'react'

export function useCopyCode(text: string, timeout = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
    } catch {
      // clipboard API not available
    }
  }, [text, timeout])

  return { copied, copy }
}
