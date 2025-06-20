import { Link, type LinkProps } from "@chakra-ui/next-js"
import { Flex, Tag, chakra } from "@chakra-ui/react"
import { chainKey } from "configs/frontend/chain/utils"
import { omit } from "lodash"
import { route } from "nextjs-routes"
import { type ReactNode, memo, useMemo } from "react"
import IconSvg from "ui/shared/IconSvg"
import type { INavItem } from "./types"

type Props = {
  item: INavItem
  onClick?: LinkProps["onClick"]
  isActive: boolean
  children?: ReactNode
  isScrollTop?: boolean
} & Omit<LinkProps, "href">

const NavItem = ({
  item,
  onClick,
  children,
  isActive,
  isScrollTop,
  ...props
}: Props) => {
  const isExternal = Boolean(item.href)

  const href = useMemo(() => {
    if (item.route?.pathname) {
      return route({
        ...(item.route as any),
        query: {
          ...item.route.query,
          chain: chainKey,
        },
      })
    }

    return item.href
  }, [item.route, item.href])

  const Component = !href ? Flex : Link
  return (
    <Component
      aria-selected={isActive}
      aria-label={`${item.title} link`}
      onClick={(e) => {
        onClick?.(e as any)
        if (isScrollTop) {
          document.body.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      }}
      target={isExternal ? "_blank" : "_self"}
      prefetch={true}
      shallow={true}
      display="flex"
      cursor="pointer"
      alignItems="center"
      gap={2}
      width="full"
      minWidth="max-content"
      textDecoration="none !important"
      paddingX={{
        base: 0,
        lg: 3,
      }}
      paddingY={{
        base: 3,
        lg: 2,
      }}
      href={(href || undefined) as any}
      color={
        {
          base: "neutral.light.6",
          lg: "neutral.light.6",
        } as any
      }
      _hover={{
        lg: {
          color: "primary.light.4",
          textDecoration: "none",
          backgroundColor: "primary.light.1",
        },
      }}
      whiteSpace="nowrap"
      flexShrink={0}
      transitionProperty="background-color, color"
      transitionDuration="normal"
      transitionTimingFunction="ease-in-out"
      _selected={{
        color: "primary.light.4",
      }}
      role="group"
      {...(props as any)}
    >
      {item.preProps?.children && (
        <Tag
          variant={{
            base: "outline",
            lg: "subtle",
          }}
          size="sm"
          flexShrink={0}
          display="flex"
          alignItems="center"
          gap={1}
          fontSize="0.625rem"
          fontWeight={400}
          lineHeight="0.875rem"
          paddingY={0}
          height="fit-content"
          minHeight="unset"
          borderRadius="0.125rem"
          borderWidth="1px"
          paddingX={1}
          aria-selected={isActive}
          {...omit(item.preProps, "iconProps", "children")}
        >
          {item.preProps.iconProps && (
            <IconSvg color="inherit" {...item.preProps.iconProps} />
          )}
          <span>{item.preProps.children}</span>
        </Tag>
      )}
      {item.title && <chakra.span textStyle="1">{item.title}</chakra.span>}
      {children}
      {item.postProps?.children && (
        <Tag
          variant={{
            base: "outline",
            lg: "subtle",
          }}
          size="sm"
          flexShrink={0}
          display="flex"
          alignItems="center"
          gap={1}
          fontSize="0.625rem"
          fontWeight={400}
          lineHeight="0.875rem"
          paddingY={0}
          height="fit-content"
          minHeight="unset"
          borderRadius="0.125rem"
          borderWidth="1px"
          paddingX={1}
          aria-selected={isActive}
          {...omit(item.postProps, "iconProps", "children")}
        >
          {item.postProps.iconProps && (
            <IconSvg
              display="inline-flex"
              color="inherit"
              {...item.postProps.iconProps}
            />
          )}
          {item.postProps.children}
        </Tag>
      )}
    </Component>
  )
}

export default memo(NavItem)
