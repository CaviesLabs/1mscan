import { Flex, chakra } from "@chakra-ui/react"
import type React from "react"

interface Props {
  children: React.ReactNode
  level?: number
  className?: string
  isFlat?: boolean
}

const MetadataAccordionItem = ({ children, className }: Props) => {
  return (
    <Flex
      className={className}
      alignItems="center"
      // flexDir={{ base: "column", lg: "row" }}
      // pl={isFlat ? 0 : 6}
      columnGap={3}
      wordBreak="break-all"
      rowGap={1}
      borderWidth="0px"
      // _last={{
      //   borderBottomWidth: level === 0 ? "1px" : "0px",
      // }}
      // _first={{
      //   borderTopWidth: level === 0 ? "1px" : "0px",
      // }}
    >
      {children}
    </Flex>
  )
}

export default chakra(MetadataAccordionItem)
