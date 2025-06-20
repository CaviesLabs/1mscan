import { Flex, Text } from "@chakra-ui/react"
import { memo } from "react"
import LinkExternal from "ui/shared/LinkExternal"
import LinkInternal from "ui/shared/LinkInternal"
import type { FooterHyperlink } from "./types"

type Props = {
  title: string
  items: FooterHyperlink[]
}

const FooterLinkGroup = ({ title, items }: Props) => {
  return (
    <Flex flexDirection="column" gap={3}>
      <Text textStyle="1500" color="neutral.light.1">
        {title}
      </Text>
      <Flex flexDirection="column" gap={1}>
        {items.map((item) => {
          return (
            <Text
              as={
                item.isExternal
                  ? LinkExternal
                  : item.component
                    ? undefined
                    : LinkInternal
              }
              key={item.title}
              textStyle="1"
              color="neutral.light.1"
              opacity={0.7}
              href={item.href}
              whiteSpace="nowrap"
              // @ts-ignore nocheck
              isScrollTop
              // @ts-ignore nocheck
              noIcon={item.isExternal ? true : undefined}
            >
              {item.component || item.title}
            </Text>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default memo(FooterLinkGroup, (prev, next) => {
  return prev.title === next.title && prev.items === next.items
})
