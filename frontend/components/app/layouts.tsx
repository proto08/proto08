import { Container } from '@chakra-ui/react'
import { Header } from './header'

export function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container maxW="1100px" py="8">
        {children}
      </Container>
    </>
  )
}
