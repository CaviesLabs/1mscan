import type { FlexProps, LinkProps } from "@chakra-ui/react"
import { Link, Skeleton } from "@chakra-ui/react"
import { memo } from "react"

import IconSvg from "ui/shared/IconSvg"

type Props = {
  isLoading?: boolean
  noIcon?: boolean
  isDisabled?: boolean
} & Partial<LinkProps>

const LinkExternal = ({
  href,
  children,
  isLoading,
  noIcon,
  isDisabled,
  ...props
}: Props) => {
  if (isLoading) {
    return (
      <Skeleton alignItems="center" {...(props as FlexProps)}>
        <span>{children}</span>
      </Skeleton>
    )
  }

  if (isDisabled || !href) {
    return children
  }

  return (
    <Link
      href={href as any}
      target="_blank"
      display="inline-flex"
      alignItems="center"
      gap={2}
      {...props}
    >
      <>{children}</>
      {!noIcon && (
        <IconSvg
          display="inline-block"
          name="arrows/north-east"
          boxSize={4}
          verticalAlign="middle"
          color="inherit"
          flexShrink={0}
        />
      )}
    </Link>
  )
}

export default memo(LinkExternal)
