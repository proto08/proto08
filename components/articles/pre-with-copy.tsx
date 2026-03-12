'use client'

import { useRef, useEffect, useState } from 'react'
import { CopyButton } from './copy-button'

export function PreWithCopy({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [codeText, setCodeText] = useState('')

  useEffect(() => {
    setCodeText(preRef.current?.querySelector('code')?.textContent ?? '')
  }, [])

  return (
    <pre ref={preRef} {...props}>
      {children}
      <CopyButton text={codeText} />
    </pre>
  )
}
