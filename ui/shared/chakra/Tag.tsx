import type { TagProps as ChakraTagProps } from "@chakra-ui/react"
import { Center, Tag as ChakraTag, Skeleton } from "@chakra-ui/react"
import { type ForwardedRef, type ReactNode, memo } from "react"
import TooltipV2 from "../tootltip/TooltipV2"

type Props = {
  isLoading?: boolean
  tooltipLabel?: ReactNode
  ref?: ForwardedRef<HTMLDivElement>
  tagProps?: ChakraTagProps
  hasTooltip?: boolean
} & ChakraTagProps

const Tag = ({
  isLoading,
  isTruncated,
  children,
  tooltipLabel,
  ref,
  tagProps,
  hasTooltip,
  ...props
}: Props) => {
  if (!children) return null

  return (
    <TooltipV2
      label={tooltipLabel || children}
      isDisabled={!hasTooltip || isLoading}
    >
      <ChakraTag
        colorScheme="gray"
        textStyle="875"
        variant="subtle"
        position="relative"
        display={isTruncated ? "inline-block" : "inline-flex"}
        justifyContent="center"
        alignItems="center"
        width="max-content"
        paddingX={1}
        flexShrink={0}
        isTruncated={isTruncated}
        data-loading={isLoading || undefined}
        {...props}
        {...tagProps}
        ref={ref}
        _loading={{
          overflow: "visible",
        }}
      >
        {isLoading && (
          <Center
            backgroundColor="inherit"
            position="absolute"
            zIndex={2}
            inset="-1px"
            overflow="hidden"
            rounded={1}
          >
            <Skeleton
              borderRadius="unset"
              flex={1}
              width="full"
              height="full"
            />
          </Center>
        )}
        {children}
      </ChakraTag>
    </TooltipV2>
  )
}

export type TagProps = Props

export default memo(Tag)
