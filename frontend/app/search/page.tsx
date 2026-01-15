'use client'

import { useArticlesSearchQuery } from '@/services/articles/articles-search-query-hooks'
import {
  Box,
  Card,
  Heading,
  Input,
  Separator,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense>
      <Suspended />
    </Suspense>
  )
}

function Suspended() {
  const { initialQ, initialIsAiSearch, page, sort } = useArticlesSearchQuery()
  console.log(initialQ, initialIsAiSearch, page, sort)
  return (
    <Box gap="4">
      <SearchBar />
      <Separator my="10" />
      <Body />
    </Box>
  )
}

function SearchBar() {
  return (
    <form action="">
      <Input></Input>
    </form>
  )
}

function Body() {
  return (
    <VStack gap="4" align="stretch">
      <ArtilceCard />
      <ArtilceCard />
      <ArtilceCard />
    </VStack>
  )
}

function ArtilceCard() {
  return (
    <Card.Root>
      <Card.Header>
        <Heading>タイトル1</Heading>
      </Card.Header>
      <Card.Body>
        <Stack separator={<Separator />}>
          <Box>
            <Text>とてもniceな記事</Text>
          </Box>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}
