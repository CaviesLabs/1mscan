import { Box, type BoxProps, Skeleton } from "@chakra-ui/react"
import type React from "react"
import { memo } from "react"
import IconSvg from "ui/shared/IconSvg"
import TooltipV2, { type TooltipV2Props } from "./tootltip/TooltipV2"

type Props = {
  label: React.ReactNode
  tooltipProps?: TooltipV2Props
  isLoading?: boolean
} & BoxProps

const Hint = ({ label, tooltipProps, isLoading, ...props }: Props) => {
  if (isLoading) {
    return <Skeleton boxSize={5} borderRadius="0.75rem" {...props} />
  }

  return (
    <TooltipV2 label={label} {...tooltipProps}>
      <Box
        cursor="pointer"
        boxSize={5}
        flexShrink={0}
        borderRadius="0.75rem"
        {...props}
      >
        <IconSvg color="neutral.light.5" name="info" boxSize="full" />
      </Box>
    </TooltipV2>
  )
}

export type HintProps = Props

export default memo(Hint)
