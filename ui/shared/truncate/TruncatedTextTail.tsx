import { Box, Skeleton, type TextProps, chakra } from "@chakra-ui/react"
import { type ForwardedRef, type ReactNode, memo } from "react"
import TruncatedTextTooltip, {
  type TruncatedTextTooltipProps,
} from "./TruncatedTextTooltip"

type Props = {
  isLoading?: boolean
  children?: ReactNode
  isDisabled?: boolean
  fallback?: ReactNode
  tooltipProps?: TruncatedTextTooltipProps
  label?: ReactNode
  ref?: ForwardedRef<HTMLDivElement | null>
} & Omit<TextProps, "children">

const TruncatedTextTail = ({
  isLoading,
  children,
  isDisabled,
  label,
  fallback = "",
  tooltipProps,
  _loading,
  ref,
  ...props
}: Props) => {
  return (
    <TruncatedTextTooltip
      label={label || children}
      isDisabled={isDisabled || !children}
      isLoading={isLoading}
      {...tooltipProps}
    >
      <chakra.div
        isTruncated
        position="relative"
        aria-busy={isLoading}
        ref={ref}
        _loading={{
          visibility: "hidden",
          "& > #keep": {
            visibility: "visible",
          },
          ...(_loading || {}),
        }}
        {...props}
      >
        {children || fallback}
        {isLoading && (
          <Box
            id="keep"
            position="absolute"
            inset={0}
            zIndex={1}
            overflow="hidden"
            borderRadius="0.5rem"
            backgroundColor="inherit"
          >
            <Skeleton overflow="hidden" borderRadius="0.5rem" boxSize="full" />
          </Box>
        )}
      </chakra.div>
    </TruncatedTextTooltip>
  )
}

export default memo(TruncatedTextTail)
