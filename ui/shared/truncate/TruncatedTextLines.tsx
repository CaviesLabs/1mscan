import { Box, Flex, Skeleton, type TextProps, chakra } from "@chakra-ui/react"
import { type ForwardedRef, type ReactNode, memo } from "react"
import { TEXT_PROPS } from "../entities/base/utils"
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
  contentIsDisabled?: boolean
  ref?: ForwardedRef<HTMLDivElement | null>
} & Omit<TextProps, "children">

const TruncatedTextLines = ({
  isLoading,
  children,
  isDisabled,
  label,
  fallback = "",
  tooltipProps,
  _loading,
  contentIsDisabled,
  ref,
  ...props
}: Props) => {
  const [textProps, otherProps] = useSplitProps(props, TEXT_PROPS)

  return (
    <TruncatedTextTooltip
      label={label || children}
      isDisabled={isDisabled || !children}
      isLoading={isLoading}
      compareWith="mixed"
      {...tooltipProps}
    >
      <Flex
        width="calc(100% + 2px)"
        position="relative"
        justifySelf="flex-start"
        aria-busy={isLoading}
        _loading={{
          visibility: "hidden",
          "& > #keep": {
            visibility: "visible",
          },
          ...(_loading || {}),
        }}
        {...otherProps}
        ref={ref}
      >
        <chakra.div
          aria-disabled={contentIsDisabled}
          _groupHover={{
            textDecoration: "underline",
            _disabled: {
              textDecoration: "none",
            },
          }}
          _disabled={{
            textDecoration: "none",
          }}
          maxWidth="calc(100% - 2px)"
          width="max-content"
          whiteSpace="pre-line"
          noOfLines={2}
          {...textProps}
        >
          {children || fallback}
        </chakra.div>
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
      </Flex>
    </TruncatedTextTooltip>
  )
}

export default memo(TruncatedTextLines)
