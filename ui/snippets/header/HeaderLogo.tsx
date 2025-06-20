import { Image, Link, type LinkProps } from "@chakra-ui/react"
import { chainKey } from "configs/frontend/chain/utils"
import NextLink from "next/link"
import { route } from "nextjs-routes"
import { memo } from "react"

type Props = {
  onClick?: LinkProps["onClick"]
} & LinkProps

const HeaderLogo = ({ onClick, ...props }: Props) => {
  return (
    <Link
      as={NextLink}
      href={route({ pathname: "/", query: { chain: chainKey } })}
      prefetch
      scroll
      display="inline-flex"
      overflow="hidden"
      flexShrink={0}
      aria-label="Link to home"
      alignItems="center"
      gap={2}
      onClick={onClick}
      {...props}
    >
      <Image
        src="/icons/logo/logo.svg"
        alt="1Mscan logo"
        boxSize={{ base: 8, lg: 7, xl: 8 }}
        flexShrink={0}
      ></Image>
      <Image
        alt="1Mscan"
        src="/icons/logo/seitrace.svg"
        flexShrink={0}
        color="neutral.light.8"
        width={{ base: "4.59688rem", lg: "4.64725rem", xl: "4.59688rem" }}
        height={{ base: "1.58rem", lg: "0.945rem", xl: "1.58rem" }}
      ></Image>
    </Link>
  )
}

export default memo(HeaderLogo, (prev, next) => {
  return prev.onClick === next.onClick
})
