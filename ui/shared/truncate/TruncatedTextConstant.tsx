import type { TextProps } from "@chakra-ui/react"
import { Box, Skeleton, chakra } from "@chakra-ui/react"
import { type ForwardedRef, type ReactNode, memo, useMemo } from "react"
import shortenString from "ui/shared/truncate/shortenString"
import TruncatedTextTooltip, {
  type TruncatedTextTooltipProps,
} from "./TruncatedTextTooltip"

type Props = {
  isDisabled?: boolean
  headLength?: number
  tailLength?: number
  isLoading?: boolean
  fallback?: ReactNode
  tooltipProps?: TruncatedTextTooltipProps
  children: string
  label?: string
  ref?: ForwardedRef<HTMLSpanElement>
} & Omit<TextProps, "children">

const TruncatedTextConstant = ({
  children,
  isDisabled,
  as = "span",
  color,
  headLength,
  tailLength,
  isLoading,
  fallback = "",
  tooltipProps,
  label,
  _loading,
  ref,
  ...props
}: Props) => {
  const { text, isCut } = useMemo(() => {
    if (!children)
      return {
        text: fallback || "",
        isCut: false,
      }
    if (!(children?.length >= 8)) {
      return {
        text: children,
        isCut: false,
      }
    }
    return {
      isCut: true,
      text: shortenString(children, headLength, tailLength),
    }
  }, [children, headLength, tailLength, fallback])
  return (
    <TruncatedTextTooltip
      highPriorityIsTruncated={isCut}
      defaultIsTruncated={isCut}
      label={label || children}
      isDisabled={isDisabled || !text}
      isLoading={isLoading}
      {...tooltipProps}
    >
      <chakra.div
        ref={ref}
        as={as}
        position="relative"
        color={color || "inherit"}
        aria-busy={isLoading}
        _loading={{
          visibility: "hidden",
          "& > #keep": {
            visibility: "visible",
          },
          ...(_loading || {}),
        }}
        {...props}
      >
        {text}

        {isLoading && (
          <Box
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

export default memo(TruncatedTextConstant)
