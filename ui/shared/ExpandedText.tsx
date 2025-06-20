import { Text } from "@chakra-ui/react"
import { type ReactNode, memo } from "react"
import Collapse from "./Collapse"

const ExpandedText = ({ children }: { children: ReactNode }) => {
  return (
    <Collapse
      startHeight={100}
      startOpacity={1}
      endOpacity={1}
      groupProps={{ gap: 1 }}
      header={({ isExpanded }) => (
        <Text
          order={2}
          color="accent.blue"
          textStyle="1"
          cursor="pointer"
          width="fit-content"
          _hover={{ textDecoration: "underline" }}
        >
          {isExpanded ? "See less" : "See more"}
        </Text>
      )}
    >
      <Text
        whiteSpace="pre-line"
        wordBreak="break-all"
        color="neutral.light.7"
        textStyle="1"
        as="span"
        order={1}
      >
        {children}
      </Text>
    </Collapse>
  )
}

export default memo(ExpandedText, (prev, next) => {
  return prev.children === next.children
})
