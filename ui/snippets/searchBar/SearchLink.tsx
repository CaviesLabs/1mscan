import { memo } from "react"
import type { LinkInternalProps } from "ui/shared/LinkInternal"
import LinkInternal from "ui/shared/LinkInternal"

type Props = {} & LinkInternalProps

const SearchLink = ({ children, onClick, href, ...props }: Props) => {
  return (
    <LinkInternal
      href={href}
      onClick={onClick}
      paddingY={3}
      paddingX={4}
      display="flex"
      rowGap={2}
      _hover={{
        backgroundColor: "primary.light.1",
      }}
      color="unset"
      {...props}
    >
      {children}
    </LinkInternal>
  )
}

export default memo(SearchLink)
