import { Box, type BoxProps } from "@chakra-ui/react"
import { keyframes } from "@chakra-ui/system"
import { memo } from "react"

const kf = keyframes`
    0% {
        left: -100%;
    }
    100% {
        left: 100%;
    }
`

type Props = Omit<BoxProps, "number"> & {
  duration: number
  count: number
}

const BlockCountDownAnimation = ({ duration, count, ...props }: Props) => {
  return (
    <Box
      position="relative"
      width="full"
      height="0.5rem"
      backgroundColor="secondary.05"
      borderRadius="6.25rem"
      overflow="hidden"
      sx={{
        _before: {
          content: '""',
          width: "15%",
          position: "absolute",
          top: 0,
          bottom: 0,
          backdropBlur: "1rem",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.3) 62%, rgba(255,255,255,0) 100%)",
          boxShadow:
            "0 0 0 1px rgb(255 255 255 / var(--glass-border-opacity, 10%)) inset,0 0 0 2px #0000000d",
          animationName: `${kf}`,
          animationDuration: `${duration ?? 3}s`,
          animationTimingFunction: "ease-out",
          animationIterationCount: count,
          animationFillMode: "both",
        },
      }}
      {...props}
    ></Box>
  )
}

export default memo(BlockCountDownAnimation)
