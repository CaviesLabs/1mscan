import type { BoxProps } from "@chakra-ui/react"
import { Box, Flex, Skeleton, chakra } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { useAsset } from "lib/hooks/useAssets"
import getCurrencyValue from "lib/utils/getCurrencyValue"
import _ from "lodash"
import { type ReactNode, memo, useMemo } from "react"
import type { OSType } from "types/base"
import TruncatedTextTooltip from "./truncate/TruncatedTextTooltip"

type Props = {
  value?: string | undefined | null | BigNumber | number
  preCurrency?: ReactNode | null
  currency?: ReactNode | null
  className?: string
  isLoading?: boolean
  accuracyUsd?: number | "full" | null
  decimals?: string | number | null | BigNumber
  fixedAccuracy?: boolean
  usdPrice?: string | null | number
  // fiatBalance?: string | number | BigNumber | null | undefined;
  osType?: OSType
  prefix?: ReactNode
  postfix?: ReactNode
  accuracy?: number | "full"
  defaultIsTruncated?: boolean
  fallback?: ReactNode
  fallbackUsd?: ReactNode | true
  stickyCurrency?: boolean
  usdProps?: BoxProps
  contentProps?: BoxProps
  usdHasParenthesis?: boolean
  hasParenthesis?: boolean
  autoPrice?: string | null | undefined | boolean
  hideValue?: boolean
  usdCurrency?: ReactNode
  isHybrid?: boolean | null | string | number
  usdPrefix?: ReactNode
  usdPostfix?: ReactNode
  keepIntegerPart?: boolean
} & Omit<BoxProps, "prefix" | "postfix">

const CurrencyValue = ({
  value,
  osType,
  decimals,
  isLoading,
  accuracyUsd,
  usdPrice: _usdPrice,
  currency = "",
  isTruncated,
  prefix,
  postfix,
  accuracy,
  defaultIsTruncated,
  fallback = "-",
  fallbackUsd,
  stickyCurrency = true,
  usdProps,
  contentProps,
  usdHasParenthesis,
  hasParenthesis,
  autoPrice,
  hideValue,
  usdCurrency = "$",
  isHybrid,
  fixedAccuracy,
  usdPrefix,
  preCurrency,
  usdPostfix,
  keepIntegerPart,
  ...props
}: Props) => {
  const asset = useAsset(autoPrice === true ? "usei" : autoPrice || undefined)
  const usdPrice = _usdPrice || asset?.usd_price

  const {
    valueFull,
    valueFormated,
    usdFull,
    usdFormated,
    valueIsTruncated,
    usdIsTruncated,
    value: valueBn,
    isFallbackUsd,
    isFallbackValue,
  } = useMemo(() => {
    if (isLoading)
      return {
        valueFormated: "",
        usdFormated: "",
        valueFull: "",
        valueIsTruncated: false,
        usdIsTruncated: false,
        usdFull: "",
        value: undefined,
        usd: undefined,
        isFallbackValue: false,
        isFallbackUsd: false,
      }
    const pickedDecimals = _.chain(null)
      .thru(() => {
        if (isHybrid) return BigNumber(0)
        const decimalsBn = BigNumber(decimals ?? Number.NaN)
        if (!decimalsBn.isNaN()) return decimalsBn

        if (osType === "EVM") return BigNumber(18)
        if (osType === "Cosmos") return BigNumber(6)

        return BigNumber(0)
      })
      .value()

    return getCurrencyValue({
      value: value,
      accuracyUsd,
      usdPrice: usdPrice || _usdPrice,
      decimals: pickedDecimals,
      accuracy,
      fallback: fallback,
      fallbackUsd: fallbackUsd === true ? "-" : fallbackUsd,
      hideValue,
      usdCurrency,
      fixedAccuracy,
      enablePrice: Boolean(autoPrice || usdPrice),
      keepIntegerPart: keepIntegerPart,
    })
  }, [
    value,
    accuracyUsd,
    _usdPrice,
    decimals,
    osType,
    accuracy,
    accuracyUsd,
    fallback,
    fallbackUsd,
    isLoading,
    usdPrice,
    hideValue,
    usdCurrency,
    fixedAccuracy,
    Boolean(autoPrice || usdPrice),
    keepIntegerPart,
  ])

  if (isLoading) {
    return (
      <Skeleton {...props} display="inline-block">
        <span>0.000000</span>
      </Skeleton>
    )
  }

  if (!valueBn) {
    return (
      <Box as="span" {...props}>
        <span>{fallback}</span>
      </Box>
    )
  }

  return (
    <Flex
      display="inline-flex"
      gap={1}
      alignItems="center"
      overflow="hidden"
      maxWidth="full"
      borderColor="neutral.light.4"
      {...props}
    >
      {!hideValue && (
        <Flex alignItems="center" overflow="hidden" gap={1} {...contentProps}>
          {Boolean(prefix) && <span>{prefix}</span>}
          <TruncatedTextTooltip
            highPriorityIsTruncated={valueIsTruncated}
            defaultIsTruncated={defaultIsTruncated || valueIsTruncated}
            isTruncated
            label={
              <Flex alignItems="center">
                {preCurrency}
                {valueFull}
                {currency && (
                  <>
                    {stickyCurrency && " "}
                    {currency}
                  </>
                )}
              </Flex>
            }
          >
            <chakra.span
              alignItems="center"
              wordBreak="break-word"
              color="inherit"
              flexWrap="wrap"
              justifyContent="flex-end"
              display={isTruncated ? "inline-block" : "inline-flex"}
              isTruncated={isTruncated}
            >
              {hasParenthesis && "("}
              {preCurrency}
              {valueFormated}
              {!isFallbackValue && currency && (
                <>
                  {stickyCurrency && " "}
                  {currency}
                </>
              )}
              {hasParenthesis && ")"}
            </chakra.span>
          </TruncatedTextTooltip>
          {Boolean(postfix) && <span>{postfix}</span>}
        </Flex>
      )}

      {usdFormated && (
        <TruncatedTextTooltip
          highPriorityIsTruncated={
            accuracyUsd === "full" ? undefined : usdIsTruncated
          }
          defaultIsTruncated={defaultIsTruncated || usdIsTruncated}
          isDisabled={isFallbackUsd}
          label={usdFull}
        >
          <chakra.span
            textStyle="875"
            color="neutral.light.6"
            display={isTruncated ? "inline-block" : "inline-flex"}
            isTruncated={isTruncated}
            {...usdProps}
          >
            {usdPrefix}
            {usdHasParenthesis && "("}
            {usdFormated}
            {usdHasParenthesis && ")"}
            {usdPostfix}
          </chakra.span>
        </TruncatedTextTooltip>
      )}
    </Flex>
  )
}

export type CurrencyValueProps = Omit<
  Props,
  "value" | "currency" | "isLoading" | "osType" | "decimals"
>

export default memo(CurrencyValue)
