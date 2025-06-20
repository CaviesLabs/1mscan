import type { BoxProps } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import { castArray } from "lodash"
import { memo, useMemo } from "react"
import type { OSType } from "types/base"
import Tag from "ui/shared/chakra/Tag"

type Props = {
  isLoading?: boolean
  tags?: string[] | null | undefined | string
  transactionType: OSType | undefined
} & Omit<BoxProps, "children">

const TxTags = ({ tags, isLoading, transactionType, ...props }: Props) => {
  const formatedTags = useMemo(() => {
    return castArray(tags).filter(Boolean)
  }, [tags])
  return (
    <Flex
      columnGap={2}
      rowGap={2}
      flexWrap="wrap"
      alignItems="center"
      flexGrow={1}
      {...props}
    >
      {formatedTags?.map((tag) => (
        <Tag
          key={tag}
          isLoading={isLoading}
          isTruncated
          maxWidth={{ base: "115px", lg: "initial" }}
          variant="outline"
        >
          {tag}
        </Tag>
      ))}
      {transactionType && (
        <Tag
          variant="outline"
          isLoading={isLoading}
          colorScheme={
            (transactionType === "EVM" && "orange") ||
            (transactionType === "Cosmos" && "purple") ||
            undefined
          }
        >
          {(transactionType === "EVM" && "EVM") ||
            (transactionType === "Cosmos" && "Native Cosmos")}
        </Tag>
      )}
    </Flex>
  )
}

export default memo(TxTags, (prev, next) => {
  return (
    prev.isLoading === next.isLoading &&
    prev.tags === next.tags &&
    prev.transactionType === next.transactionType
  )
})
