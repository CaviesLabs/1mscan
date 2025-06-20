import type { TagProps as ChakraTagProps } from "@chakra-ui/react"
import { memo } from "react"
import Tag from "ui/shared/chakra/Tag"

type Props = {
  chainKey: string
  tagProps?: Partial<ChakraTagProps>
  isLoading?: boolean
} & ChakraTagProps

const ChainTag = ({ chainKey, tagProps, ...props }: Props) => {
  return (
    <Tag
      paddingX={1}
      paddingY={0}
      height="0.875rem"
      minHeight="unset"
      display="flex"
      minWidth="unset"
      lineHeight="0.875rem"
      tagProps={{
        borderRadius: "0.125rem",
        minHeight: "unset",
        textStyle: "625",
        height: "0.875rem",
        width: "unset",
        display: "inline-flex",
        textAlign: "center",
        verticalAlign: "middle",
        variant: "outline",
        colorScheme: "orange",
        minWidth: "unset",
        fontSize: "0.625rem",
        ...tagProps,
      }}
      {...props}
    >
      {chainKey}
    </Tag>
  )
}
export default memo(ChainTag, (prev, next) => {
  return prev.chainKey === next.chainKey && prev.isLoading === next.isLoading
})
