import type { BoxProps } from "@chakra-ui/react"
import { Box, forwardRef } from "@chakra-ui/react"
import type React from "react"

type Props = {
  children: React.ReactNode
} & Partial<BoxProps>

const PopoverModalTrigger = ({ children, ...props }: Props, ref: any) => {
  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  )
}

export default forwardRef(PopoverModalTrigger)
