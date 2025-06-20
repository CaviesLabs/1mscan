import { GridItem, Skeleton } from "@chakra-ui/react"
import { memo } from "react"
import type { MetadataAttributes } from "types/client/token"
import LinkExternal from "ui/shared/LinkExternal"
import TruncatedTextTail from "ui/shared/truncate/TruncatedTextTail"

type Props = {
  data: MetadataAttributes
  isLoading?: boolean
}

const TokenInstanceMetadataItem = ({ data, isLoading }: Props) => {
  return (
    <GridItem
      bgColor="neutral.light.2"
      borderRadius="0.375rem"
      borderWidth="1px"
      borderColor="neutral.light.3"
      px={4}
      py={2}
      display="flex"
      flexDir="column"
      alignItems="flex-start"
    >
      <Skeleton
        isLoaded={!isLoading}
        textStyle="875"
        color="neutral.light.7"
        mb={1}
      >
        <span>{data.trait_type}</span>
      </Skeleton>
      {data.value_type === "URL" ? (
        <LinkExternal
          whiteSpace="nowrap"
          display="inline-flex"
          alignItems="center"
          w="100%"
          overflow="hidden"
          href={data.value}
          fontSize="sm"
          lineHeight={5}
        >
          <TruncatedTextTail w="calc(100% - 16px)">
            {data.value}
          </TruncatedTextTail>
        </LinkExternal>
      ) : (
        <TruncatedTextTail
          color="neutral.light.8"
          textStyle="500"
          w="100%"
          isLoading={isLoading}
        >
          {data.value}
        </TruncatedTextTail>
      )}
    </GridItem>
  )
}

export default memo(TokenInstanceMetadataItem, (prev, next) => {
  return prev.data === next.data && prev.isLoading === next.isLoading
})
