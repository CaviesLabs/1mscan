import type { FlexProps } from "@chakra-ui/react"
import { Box, Flex } from "@chakra-ui/react"
import type React from "react"

type Props = {
  firstChildren?: React.ReactNode
  secondChildren?: React.ReactNode
  children?: React.ReactNode
  title?: string
  isMerge?: boolean
} & Partial<FlexProps>

const ContractVerificationFormRow = ({
  firstChildren,
  secondChildren,
  children,
  isMerge,
  ...props
}: Props) => {
  return (
    <Flex
      columnGap={5}
      rowGap={2}
      width="full"
      flexDirection={{ base: "column", lg: "row" }}
      {...props}
    >
      <Box flexShrink={0} flex={{ base: 1, lg: 0.5 }}>
        {firstChildren}
        {children}
      </Box>

      {!isMerge && (
        <Box
          flexShrink={0}
          flex={{ base: 1, lg: 0.5 }}
          _empty={{ display: { base: "none", lg: "unset" } }}
        >
          {secondChildren}
        </Box>
      )}
    </Flex>
  )
}

export default ContractVerificationFormRow
