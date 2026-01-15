import { Button, ButtonProps } from '@chakra-ui/react'
import NextLink from 'next/link'

type LinkButtonProps = {
  href: string
  isActive?: boolean
} & ButtonProps

export function LinkButton({
  href,
  isActive,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Button asChild {...props}>
      <NextLink href={href}>{children}</NextLink>
    </Button>
  )
}
