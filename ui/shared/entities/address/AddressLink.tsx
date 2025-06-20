import { type ReactNode, memo } from "react"
import LinkInternal, { type LinkInternalProps } from "ui/shared/LinkInternal"

type LinkProps = {
  href: string
  isDisabled?: boolean
  isLoading?: boolean
  children: ReactNode
} & LinkInternalProps

const AddressLink = ({
  isDisabled,
  isLoading,
  children,
  href,
  ...props
}: LinkProps) => {
  if (isDisabled || isLoading) return children

  return (
    <LinkInternal isScrollTop href={href} color="accent.blue" {...props}>
      {children}
    </LinkInternal>
  )
}

export type AddressLinkProps = Partial<LinkProps>

export default memo(AddressLink)
