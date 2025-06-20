import type { FlexProps } from "@chakra-ui/react"
import { Box, Flex, Skeleton } from "@chakra-ui/react"

import ipfsUrlParser from "lib/token/metadata/ipfsUrlParser"
import LinkExternal from "ui/shared/LinkExternal"
import { checkIsURL } from "utils/validate"
import { useTokenInstanceMetadataContext } from "../TokenInstanceMetadataProvider"
import MetadataAccordionItem from "./MetadataAccordionItem"
import MetadataAccordionItemTitle from "./MetadataAccordionItemTitle"

interface Props extends FlexProps {
  name?: string
  value: any
  isItem?: boolean
  isFlat?: boolean
  level: number
}

const MetadataItemPrimitive = ({
  name,
  value,
  isItem = true,
  isFlat,
  level,
  ...props
}: Props) => {
  const { isLoading } = useTokenInstanceMetadataContext()
  const content = (() => {
    if (checkIsURL(value)) {
      const url = ipfsUrlParser(value)!
      return (
        <LinkExternal textStyle="875" width="full" href={url.toString()}>
          {value}
        </LinkExternal>
      )
    }

    return <Box textStyle="875">{String(value)}</Box>
  })()

  const contentLayout = (
    <>
      {name && <MetadataAccordionItemTitle name={name} />}
      <Skeleton isLoaded={!isLoading}>{content}</Skeleton>
    </>
  )

  if (isItem) {
    return (
      <MetadataAccordionItem textStyle="875" level={level} isFlat={isFlat}>
        {contentLayout}
      </MetadataAccordionItem>
    )
  }

  return (
    <Flex alignItems="center" textStyle="875" columnGap={2} {...props}>
      {contentLayout}
    </Flex>
  )
}

export default MetadataItemPrimitive
