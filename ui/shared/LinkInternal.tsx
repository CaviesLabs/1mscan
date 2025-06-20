"use client"

import type { ChakraProps, FlexProps, LinkProps } from "@chakra-ui/react"
import { Link, Skeleton } from "@chakra-ui/react"
import { chainKey } from "configs/frontend/chain/utils"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { type ForwardedRef, memo, useMemo } from "react"

type Props = Partial<Omit<LinkProps, "href" | "color">> & {
  isLoading?: boolean
  isDisabled?: boolean
  isScrollTop?: boolean
  href?: string | LinkProps["href"]
  color?: ChakraProps["color"]
  ref?: ForwardedRef<HTMLAnchorElement>
} & Partial<Omit<NextLinkProps, "href" | "color">>

export function addChainParamSearchParams(_href: any): string {
  const href = String(_href || "")
  const sym = String(href).includes("?") ? "&" : "?"
  return `${href}${sym}chain=${chainKey}`
}

const LinkInternal = ({
  isLoading,
  isDisabled,
  isScrollTop = true,
  onClick,
  children,
  href: _href,
  ref,
  ...props
}: Props) => {
  const href = useMemo(() => addChainParamSearchParams(_href), [_href])

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
      as={NextLink}
      href={href as any}
      scroll={isScrollTop}
      shallow={true}
      // prefetch={true}
      onClick={(e) => {
        if (isScrollTop) {
          document.body.scrollTo({
            top: 0,
            behavior: "instant",
          })
        }

        onClick?.(e)
      }}
      display="inline-flex"
      alignItems="center"
      gap={2}
      {...props}
      ref={ref}
    >
      <>{children}</>
    </Link>
  )
}

export type LinkInternalProps = Props

export default memo(LinkInternal)
