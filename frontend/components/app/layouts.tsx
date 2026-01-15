import { Container } from '@chakra-ui/react'
import { Header } from './header'

export function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container maxW="container.xl" py="8">
        {children}
      </Container>
    </>
  )
}
