import { memo } from "react"
import LinkInternal from "ui/shared/LinkInternal"
import type { TokenLinkProps } from "./types"

const TokenLink = ({
  isDisabled,
  isLoading,
  children,
  href,
  ...props
}: TokenLinkProps) => {
  if (isDisabled || isLoading) return children

  return (
    <LinkInternal
      isScrollTop
      href={href}
      overflow="hidden"
      color="accent.blue"
      {...props}
    >
      {children}
    </LinkInternal>
  )
}

export default memo(TokenLink)
