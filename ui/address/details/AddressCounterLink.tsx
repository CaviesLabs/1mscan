import { memo } from "react"
import LinkInternal, { type LinkInternalProps } from "ui/shared/LinkInternal"
import { smoothScroll } from "ui/utils/dom"

type Props = LinkInternalProps

const AddressCounterLink = ({ children, href, isLoading, ...props }: Props) => {
  return (
    <LinkInternal
      href={href}
      onClick={() => {
        smoothScroll("routed-tabs")
      }}
      isLoading={isLoading}
      {...props}
    >
      {children}
    </LinkInternal>
  )
}

export default memo(AddressCounterLink, (prev, next) => {
  return (
    prev.href === next.href &&
    prev.isLoading === next.isLoading &&
    prev.children === next.children &&
    prev.isDisabled === next.isDisabled
  )
})
