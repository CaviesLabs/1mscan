import { Box, Skeleton, chakra } from "@chakra-ui/react"
import type { Falsey } from "lodash"
import { type ForwardedRef, type ReactNode, memo } from "react"
import {
  default as TruncatedString,
  type TruncatedStringProps,
} from "./TruncatedString"
import TruncatedTextTooltip, {
  type TruncatedTextTooltipProps,
} from "./TruncatedTextTooltip"

type Props = {
  isLoading?: boolean
  isDisabled?: boolean
  /**
   * Is only type string is allowed
   */
  children: Primitive | Falsey
  label?: Extract<ReactNode, string>
  tooltipProps?: TruncatedTextTooltipProps
  fallback?: string
  ref?: ForwardedRef<HTMLDivElement>
} & Omit<TruncatedStringProps, "hash" | "children">

const TruncatedTextDynamic = ({
  children,
  label,
  isDisabled,
  isLoading,
  tooltipProps,
  _loading,
  fallback,
  ref,
  ...props
}: Props) => {
  return (
    <TruncatedTextTooltip
      label={<>{String(label || children || "")}</>}
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
        <TruncatedString
          hash={String(children ?? "") || fallback || ""}
          {...props}
        ></TruncatedString>
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

export default memo(TruncatedTextDynamic)
