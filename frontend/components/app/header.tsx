'use client'

import { ColorModeToggle } from '@/components/shared/color-mode-toggle'
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Menu,
  Text,
  Separator,
  Input,
  IconButton,
  Group,
} from '@chakra-ui/react'
import Link from 'next/link'
import {
  LuBell,
  LuSearch,
  LuUser,
  LuLogOut,
  LuLayoutDashboard,
  LuHeart,
} from 'react-icons/lu'
import { LinkButton } from '@/components/shared/link-button'

const MENU_ITEMS = [
  {
    value: 'profile',
    label: 'プロフィール',
    href: '/account/profile',
    icon: <LuUser />,
  },
  {
    value: 'articles',
    label: '記事一覧',
    href: '/dashboard/articles',
    icon: <LuLayoutDashboard />,
  },
  {
    value: 'likes',
    label: 'いいねした記事',
    href: '/dashboard/likes',
    icon: <LuHeart />,
  },
]

export function Header() {
  return (
    <Box
      as="header"
      borderBottomWidth="1px"
      py="2"
      bg="bg.panel"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between" h="12">
          <HStack gap="3" flex="1" justify="flex-end">
            <HStack gap="1">
              <ColorModeToggle />
              <LinkButton
                href="/search"
                variant="ghost"
                size="sm"
                aria-label="search"
              >
                <LuSearch size="16" />
              </LinkButton>
            </HStack>
            <Separator orientation="vertical" h="6" />
            <AvatarButton />
            <LinkButton href="/articles/new" size="sm" variant="solid">
              執筆する
            </LinkButton>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

function AvatarButton() {
  return (
    <Menu.Root positioning={{ placement: 'bottom-end' }}>
      <Menu.Trigger asChild>
        <HStack
          cursor="pointer"
          gap="2"
          p="1"
          borderRadius="full"
          _hover={{ bg: 'bg.muted' }}
        >
          <Avatar.Root size="xs">
            <Avatar.Fallback>U</Avatar.Fallback>
          </Avatar.Root>
          <Text fontSize="sm" fontWeight="medium" hideBelow="md">
            User
          </Text>
        </HStack>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content minW="200px" p="1">
          {MENU_ITEMS.map((item) => (
            <Menu.Item
              key={item.value}
              value={item.value}
              asChild
              cursor="pointer"
            >
              <Link href={item.href}>
                <HStack gap="2">
                  {item.icon}
                  {item.label}
                </HStack>
              </Link>
            </Menu.Item>
          ))}
          <Separator my="1" />
          <Menu.Item
            value="logout"
            color="fg.error"
            _hover={{ bg: 'bg.error', color: 'white' }}
            cursor="pointer"
          >
            <HStack gap="2">
              <LuLogOut />
              ログアウト
            </HStack>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
