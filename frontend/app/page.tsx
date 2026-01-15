'use client'

import {
  Box,
  Flex,
  VStack,
  Avatar,
  HStack,
  Link,
  Text,
  Heading,
} from '@chakra-ui/react'
import {
  LuGithub,
  LuTwitter,
  LuInstagram,
  LuLinkedin,
  LuSend,
} from 'react-icons/lu'

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: <LuGithub size="32" />,
    href: 'test',
  },
  {
    name: 'Twitter',
    icon: <LuTwitter size="32" />,
    href: 'test',
  },
  {
    name: 'Telegram',
    icon: <LuSend size="32" />,
    href: 'test',
  },
]

export default function Page() {
  return (
    <Flex
      align="center"
      justify="center"
      minH="calc(100vh - 200px)"
      gap="16"
      px="8"
      py="8"
    >
      <Avatar.Root size="2xl" style={{ width: '120px', height: '120px' }}>
        <Avatar.Image src="/icon.webp" />
        <Avatar.Fallback fontSize="7xl">Y</Avatar.Fallback>
      </Avatar.Root>
      <VStack align="flex-start" gap="6">
        <Heading size="2xl">Hello, I'm test</Heading>
        <HStack gap="6">
          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              color="fg.muted"
              _hover={{ color: 'fg' }}
              _focus={{ outline: 'none' }}
              transition="color 0.2s"
            >
              {social.icon}
            </Link>
          ))}
        </HStack>
      </VStack>
    </Flex>
  )
}
