import type { CenterProps } from "@chakra-ui/react"
import { Box, Skeleton } from "@chakra-ui/react"
import { memo } from "react"
import IconSvg from "./IconSvg"

type Props = {
  isLoading: boolean | undefined
  direction?: "down" | "right"
} & Partial<CenterProps>

const FromTo = ({ isLoading, direction = "down", ...props }: Props) => {
  return (
    <Skeleton
      display="flex"
      justifyContent="center"
      alignItems="center"
      isLoaded={!isLoading}
      borderRadius="full"
      overflow="hidden"
      width="max-content"
      flexShrink={0}
      // _groupHover={{ borderColor: "neutral.light.5" }}
      {...props}
    >
      <Box
        borderColor="neutral.light.4"
        _groupHover={{ borderColor: "neutral.light.5" }}
        borderWidth="1px"
        boxSize="full"
        borderRadius="full"
        padding={1}
        transitionProperty="border-color"
        transitionDuration="normal"
        transitionTimingFunction="ease-in-out"
      >
        <IconSvg
          borderRadius="full"
          name="arrows/east"
          boxSize={3}
          color="neutral.light.5"
          isLoading={isLoading}
          transform={`rotate(${direction === "down" ? "90deg" : "0deg"})`}
          flexShrink={0}
        />
      </Box>
    </Skeleton>
  )
}

export default memo(FromTo, (prev, next) => prev.isLoading === next.isLoading)
