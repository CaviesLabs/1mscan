import type { TextProps } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/react"
import type React from "react"
import { memo } from "react"

type Props = {
  children?: React.ReactNode
} & TextProps

const ErrorMessage = ({ children, ...props }: Props) => {
  return (
    <chakra.span
      textColor="accent.red"
      lineHeight="1.25rem"
      fontSize="0.875rem"
      fontWeight={400}
      marginLeft={1}
      marginTop={1}
      padding={0}
      isTruncated
      transition="all 0.15s ease-in-out"
      minHeight="1.25rem"
      whiteSpace="pre-wrap"
      wordBreak="break-word"
      _empty={{
        display: "none",
      }}
      {...props}
    >
      {children}
    </chakra.span>
  )
}

export default memo(ErrorMessage)
