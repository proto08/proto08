'use client'

import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'

export default function Page() {
  return (
    <Flex minH="60vh" align="center" justify="center" py="12">
      <Card.Root maxW="400px" w="full">
        <Card.Header>
          <Heading size="lg">Login</Heading>
        </Card.Header>
        <Card.Body>
          <VStack gap="4" align="stretch" as="form">
            <Box>
              <Text as="label" fontSize="sm" fontWeight="medium">
                Mail
              </Text>
              <Input type="email" placeholder="example@email.com" mt="1" />
            </Box>
            <Box>
              <Text as="label" fontSize="sm" fontWeight="medium">
                Password
              </Text>
              <Input type="password" placeholder="••••••••" mt="1" />
            </Box>
            <Button type="submit" w="full" mt="2">
              Login
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Flex>
  )
}
