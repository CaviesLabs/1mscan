import type { BoxProps, FlexProps, TextProps } from "@chakra-ui/react"
import { Box, Flex, HStack, Skeleton } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import { memo, useMemo } from "react"
import CurrencyValue from "../CurrencyValue"

type Props = {
  value: any
  colorScheme?: "green" | "red" | "gray"
  isLoading?: boolean
  labelProps?: TextProps
  barProps?: BoxProps
} & FlexProps

const MAPPING_COLORS = {
  green: {
    labelColor: "secondary.02.text",
    barColor: "secondary.02",
    backgroundColor: "neutral.light.4",
  },
  red: {
    labelColor: "neutral.light.7",
    barColor: "primary.light.4",
    backgroundColor: "primary.light.1",
  },
  gray: {
    labelColor: "secondary.06.text",
    barColor: "secondary.06",
    backgroundColor: "secondary.06.bg",
  },
}

const Utilization = ({
  value,
  isLoading,
  colorScheme,
  labelProps,
  barProps,
  ...props
}: Props) => {
  const { percent, percent2, isAvailable } = useMemo(() => {
    const valueBN = BigNumber(value || 0).times(100)

    const isAvailable = valueBN.gte(0) && valueBN.lte(100)
    return {
      isAvailable,
      percent: valueBN,
      percent2: valueBN.toFixed(2),
    }
  }, [value])

  const { labelColor, barColor, backgroundColor } = useMemo(() => {
    return (
      MAPPING_COLORS[colorScheme as never] || {
        labelColor: "secondary.02.text",
        barColor: "secondary.02",
        backgroundColor: "neutral.light.4",
      }
    )
  }, [colorScheme])

  return (
    <Flex
      alignItems="center"
      float="right"
      width="max-content"
      columnGap={1}
      textStyle="8125500"
      {...props}
    >
      <Skeleton
        isLoaded={!isLoading}
        flex={1}
        height="0.25rem"
        overflow="hidden"
      >
        <HStack
          position="relative"
          borderRadius="0.125rem"
          backgroundColor={backgroundColor}
          minWidth="4.5625rem"
          width="full"
          height={1}
          padding={0}
          overflow="hidden"
          {...barProps}
        >
          <Box
            borderRadius="0.125rem"
            height="full"
            width={`${isAvailable ? percent2 : 0}%`}
            backgroundColor={barColor}
            transition="all 0.4s ease-in-out 0.1s"
          ></Box>
        </HStack>
      </Skeleton>

      <CurrencyValue
        isLoading={isLoading}
        // width="3.5rem"
        value={percent}
        color={labelColor}
        flexShrink={0}
        currency="%"
        stickyCurrency={false}
        justifyContent="flex-end"
        {...labelProps}
      />
    </Flex>
  )
}

export default memo(Utilization, (prev, next) => {
  return prev.value === next.value && prev.isLoading === next.isLoading
})
