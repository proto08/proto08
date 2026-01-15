'use client'

import { IconButton, ClientOnly } from '@chakra-ui/react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { useTheme } from 'next-themes'

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <ClientOnly fallback={<IconButton variant="ghost" size="sm" disabled />}>
      <IconButton
        aria-label="toggle color mode"
        onClick={toggleColorMode}
        variant="ghost"
      >
        {colorMode === 'light' ? <LuMoon /> : <LuSun />}
      </IconButton>
    </ClientOnly>
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }
  return {
    colorMode: resolvedTheme,
    setColorMode: setTheme,
    toggleColorMode,
  }
}
