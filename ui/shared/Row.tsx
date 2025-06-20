import type { FlexProps } from "@chakra-ui/react"
import { Flex, forwardRef } from "@chakra-ui/react"
import type { ForwardedRef } from "react"
import React from "react"

const Row = (props: FlexProps, ref?: ForwardedRef<HTMLDivElement>) => {
  return <Flex flexDirection="row" {...props} ref={ref}></Flex>
}

export default forwardRef(Row)
